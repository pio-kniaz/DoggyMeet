import { errorCodeName } from '@const/index';
import { errorNoMatch } from '@/middlewares/error-no-match/error-no-match';

describe('errorNoMatch test', () => {
  it('should return error', () => {
    try {
      errorNoMatch();
    } catch (e) {
      expect(e.message).toBe(errorCodeName.NotFound);
      expect(e.status).toBe(404);
      expect(e.metaData).toBe('No match found');
    }
  });
});
