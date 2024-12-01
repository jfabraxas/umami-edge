import type { UmamiPayload } from '../types';

export async function sendRequest(
  hostUrl: string,
  userAgent: string,
  payload: UmamiPayload,
  type: 'event' | 'identify' = 'event',
) {
  return fetch(`${hostUrl}/api/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': userAgent,
    },
    body: JSON.stringify({ type, payload }),
  });
}