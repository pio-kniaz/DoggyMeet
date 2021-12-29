import { errorCodeName } from '@const/index';
import { ErrorException } from '@utils/error-handler/error-exception';

export const errorNoMatch = () => {
  throw new ErrorException(errorCodeName.NotFound, 'No match found');
};
