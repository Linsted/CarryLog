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
  private cachedJwks = <Record<string, string>>{};

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    await this.loadJWKS();
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async loadJWKS(): Promise<void> {
    const aut0Domain = process?.env?.AUTH0_DOMAIN || '';
    const currentDate = new Date().toISOString();

    let data: IJWKS;

    try {
      const response = await axios.get(getJwksString(aut0Domain));
      data = response?.data;
    } catch (error: any) {
      console.error(
        `Failed to get JWKS from Auth0 service at ${currentDate}`,
        error
      );
      throw new InternalServerErrorException(
        `Failed to get JWKS from Auth0 service. Error: ${error.message}`
      );
    }

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

      this.cachedJwks = cachedJWKS;

      try {
        await this.cacheManager.set(CACHE_KEYS.TOKEN, cachedJWKS);
      } catch (error: any) {
        console.error(
          `Failed to set cache for key "${CACHE_KEYS.TOKEN}": ${error.message} in Redis`
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
    } catch {
      cachedJWKS = this.cachedJwks;
      console.error(
        `Failed to get cache for key "${CACHE_KEYS.TOKEN}" from Redis`
      );
    }

    if (!this.cachedJwks || Object.keys(this.cachedJwks).length === 0) {
      await this.loadJWKS();
    }

    if (!cachedJWKS || Object.keys(cachedJWKS).length === 0) {
      cachedJWKS = this.cachedJwks;
    }

    const pem = cachedJWKS[kid];

    if (!pem) {
      throw new BadRequestException('Key not found');
    }

    return pem;
  }
}
