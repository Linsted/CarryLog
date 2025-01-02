import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import jwkToPem from 'jwk-to-pem';

import { IJWKS } from '@carry/interfaces';

import { getJwksString } from '../helpers/getAuthString.helper';

@Injectable()
export class JwksService implements OnModuleInit {
  private cachedJWKS: Record<string, string> = {};

  async onModuleInit() {
    await this.loadJWKS();
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async loadJWKS(): Promise<void> {
    const aut0Domain = process?.env?.AUTH0_DOMAIN || '';

    const { data } = await axios.get<IJWKS>(getJwksString(aut0Domain));

    if (Array.isArray(data?.keys)) {
      this.cachedJWKS = data?.keys.reduce<Record<string, string>>(
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
    }
  }

  getPemByKid(kid: string): string {
    const pem = this.cachedJWKS[kid];
    if (!pem) {
      throw new BadRequestException('Key not found');
    }

    return pem;
  }
}
