export function getJwksString(domain: string): string {
  return `https://${domain}/.well-known/jwks.json`;
}
