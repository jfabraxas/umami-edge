import type { UmamiOptions, UmamiPayload, UmamiEventData } from '../types';
import { sendRequest } from '../utils/fetch';
import { getDefaultUserAgent } from '../utils/user-agent';

export class UmamiClient {
  private options: UmamiOptions;
  private properties: Record<string, any>;

  constructor(options: UmamiOptions = {}) {
    this.options = options;
    this.properties = {};
  }

  init(options: UmamiOptions): void {
    this.options = { ...this.options, ...options };
  }

  async send(payload: UmamiPayload, type: 'event' | 'identify' = 'event'): Promise<Response> {
    const { hostUrl = '', userAgent = getDefaultUserAgent() } = this.options;
    return sendRequest(hostUrl, userAgent, payload, type);
  }

  async track(event: object | string, eventData?: UmamiEventData): Promise<Response> {
    const { websiteId } = this.options;

    if (!websiteId) {
      return Promise.reject('Website ID is required');
    }

    if (typeof event === 'string') {
      return this.send({
        website: websiteId,
        name: event,
        data: eventData
      });
    }

    if (typeof event === 'object') {
      const eventPayload = event as Partial<UmamiPayload>;
      return this.send({
        ...eventPayload,
        website: websiteId
      });
    }

    return Promise.reject('Invalid payload');
  }

  async identify(properties: object = {}): Promise<Response> {
    const { websiteId, sessionId } = this.options;

    if (!websiteId) {
      return Promise.reject('Website ID is required');
    }

    this.properties = { ...this.properties, ...properties };

    return this.send(
      {
        website: websiteId,
        session: sessionId,
        data: { ...this.properties }
      },
      'identify'
    );
  }

  reset(): void {
    this.properties = {};
  }
}