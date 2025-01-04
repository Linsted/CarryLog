import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import jwkToPem from 'jwk-to-pem';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { IJWKS } from '@carry/interfaces';

import { getJwksString } from '../helpers/getAuthString.helper';
import { CACHE_KEYS } from '@carry/constants';

@Injectable()
export class JwksService implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    await this.loadJWKS();
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async loadJWKS(): Promise<void> {
    const aut0Domain = process?.env?.AUTH0_DOMAIN || '';

    const { data } = await axios.get<IJWKS>(getJwksString(aut0Domain));

    if (Array.isArray(data?.keys)) {
      const cachedJWKS = data?.keys.reduce<Record<string, string>>(
        (acc, key) => {
          if (!key.kid) {
            throw new BadRequestException(
              "Invalid JWKS format: 'kid' is missing in a key."
            );
          }
          acc[key.kid] = jwkToPem(key);
          return acc;
        },
        {}
      );

      try {
        await this.cacheManager.set(CACHE_KEYS.TOKEN, cachedJWKS);
      } catch (error: any) {
        console.error(
          `Failed to set cache for key "${CACHE_KEYS.TOKEN}": ${error.message}`
        );
        throw new InternalServerErrorException(
          `Failed to set cache for key "${CACHE_KEYS.TOKEN}"`
        );
      }
    }
  }

  async getPemByKid(kid: string): Promise<string> {
    let cachedJWKS;

    try {
      cachedJWKS = (await this.cacheManager.get(CACHE_KEYS.TOKEN)) as Record<
        string,
        string
      >;
    } catch (error: any) {
      console.error(
        `Failed to get cache for key "${CACHE_KEYS.TOKEN}": ${error.message}`
      );
      throw new InternalServerErrorException(
        `Failed to get cache for key "${CACHE_KEYS.TOKEN}"`
      );
    }

    const pem = cachedJWKS[kid];

    if (!pem) {
      throw new BadRequestException('Key not found');
    }

    return pem;
  }
}
