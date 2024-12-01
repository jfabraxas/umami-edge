import { UmamiClient } from './core/UmamiClient';
import type { UmamiOptions, UmamiPayload, UmamiEventData, EventType } from './types';

export { UmamiClient };
export type { UmamiOptions, UmamiPayload, UmamiEventData, EventType };

const umami = new UmamiClient();

export default umami;