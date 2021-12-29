import { errorCodeName } from '@const/index';
import { ErrorException } from '@utils/error-handler/error-exception';

describe('error-exception', () => {
  describe('error-exception name property', () => {
    it(`should set ${errorCodeName.UnknownError} for empty name`, () => {
      try {
        throw new ErrorException();
      } catch (e) {
        expect(e.message).toBe(errorCodeName.UnknownError);
      }
    });
    test.each(Object.values(errorCodeName))(
      'should set correct name for %s',
      (elem) => {
        try {
          throw new ErrorException(elem);
        } catch (e) {
          expect(e.message).toBe(elem);
        }
      }
    );
  });
  describe('error-exception status property', () => {
    it(`should set status 500 when no status provided`, () => {
      try {
        throw new ErrorException();
      } catch (e) {
        expect(e.status).toBe(500);
      }
    });
    it(`should set status 400 when ${errorCodeName.ClientError} is provided`, () => {
      try {
        throw new ErrorException(errorCodeName.ClientError);
      } catch (e) {
        expect(e.status).toBe(400);
      }
    });
    it(`should set status 401 when ${errorCodeName.Unauthenticated} is provided`, () => {
      try {
        throw new ErrorException(errorCodeName.Unauthenticated);
      } catch (e) {
        expect(e.status).toBe(401);
      }
    });
    it(`should set status 403 when ${errorCodeName.Forbidden} is provided`, () => {
      try {
        throw new ErrorException(errorCodeName.Forbidden);
      } catch (e) {
        expect(e.status).toBe(403);
      }
    });
    it(`should set status 404 when ${errorCodeName.NotFound} is provided`, () => {
      try {
        throw new ErrorException(errorCodeName.NotFound);
      } catch (e) {
        expect(e.status).toBe(404);
      }
    });
    it(`should set status 405 when ${errorCodeName.MethodNotAllowed} is provided`, () => {
      try {
        throw new ErrorException(errorCodeName.MethodNotAllowed);
      } catch (e) {
        expect(e.status).toBe(405);
      }
    });
  });
  describe('error-exception metaData property', () => {
    it(`should metadata be null when no metadata is provided`, () => {
      try {
        throw new ErrorException();
      } catch (e) {
        expect(e.metaData).toBe(null);
      }
    });
    it(`should metadata has correct payload`, () => {
      try {
        throw new ErrorException(errorCodeName.UnknownError, {
          error: 'test error',
          fields: {
            test: 'test error',
          },
        });
      } catch (e) {
        expect(e.metaData).toEqual({
          error: 'test error',
          fields: {
            test: 'test error',
          },
        });
      }
    });
  });
  describe('error-exception all property', () => {
    it(`Should return ${errorCodeName.ClientError} for name, 400 for status code and correct response data for metaData`, () => {
      try {
        throw new ErrorException(errorCodeName.ClientError, {
          message: 'test error exception',
        });
      } catch (e) {
        expect(e.name).toBe(errorCodeName.ClientError);
        expect(e.status).toBe(400);
        expect(e.metaData).toEqual({
          message: 'test error exception',
        });
      }
    });
  });
});
