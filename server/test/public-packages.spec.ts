import { describe, expect, it } from 'vitest';

import { decryptJson, encryptJson } from '@lingcoo-tech/crypto';
import { ApiError, apiErrorResponseFromException, isApiErrorResponse } from '@lingcoo-tech/http';
import {
  hashPassword,
  parseBearerToken,
  signAccessToken,
  verifyAccessToken,
  verifyPassword,
} from '@lingcoo-tech/security';

describe('public package consumption', () => {
  it('uses the security package from an installed tarball', async () => {
    const passwordHash = await hashPassword('edu-test-password');
    expect(await verifyPassword('edu-test-password', passwordHash)).toBe(true);

    const token = await signAccessToken(
      { sub: 'account-1', role: 'admin' },
      {
        secret: '01234567890123456789012345678901',
        issuer: 'edu-business-system',
        audience: 'edu-api',
      },
    );
    const claims = await verifyAccessToken(token, {
      secret: '01234567890123456789012345678901',
      issuer: 'edu-business-system',
      audience: 'edu-api',
    });

    expect(claims.sub).toBe('account-1');
    expect(parseBearerToken(`Bearer ${token}`)).toBe(token);
  });

  it('uses the crypto and HTTP contracts from installed tarballs', () => {
    const encrypted = encryptJson({ provider: 'test', enabled: true }, 'edu-settings-secret');
    expect(decryptJson(encrypted, 'edu-settings-secret')).toEqual({
      provider: 'test',
      enabled: true,
    });

    const response = apiErrorResponseFromException(
      new ApiError(422, 'VALIDATION_ERROR', 'Request validation failed'),
      'edu-request-1',
    );
    expect(isApiErrorResponse(response)).toBe(true);
    expect(response.error.requestId).toBe('edu-request-1');
  });
});
