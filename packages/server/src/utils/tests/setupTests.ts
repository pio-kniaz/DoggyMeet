/* eslint-disable no-param-reassign */
import { logger } from '@/utils/logger/logger';

if (process.env.NODE_ENV === 'production') {
  logger.silent = true;
}
