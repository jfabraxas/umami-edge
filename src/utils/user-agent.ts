export function getDefaultUserAgent(): string {
  return typeof process !== 'undefined' && process.version
    ? `Mozilla/5.0 Umami/${process.version}`
    : 'Mozilla/5.0 Umami/Edge';
}