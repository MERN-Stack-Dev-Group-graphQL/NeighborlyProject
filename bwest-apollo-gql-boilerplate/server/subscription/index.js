import { PubSub } from 'apollo-server-express';

import * as MESSAGE_EVENTS from './message';
import * as TOOL_EVENTS from './tool';

export const EVENTS = {
  MESSAGE: MESSAGE_EVENTS,
  TOOL: TOOL_EVENTS,
};

export default new PubSub();
