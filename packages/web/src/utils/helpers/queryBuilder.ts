import { IQueries } from '@interfaces/index';

import queryString from 'query-string';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

export const queryBuilder = (queries: IQueries) => {
  let query = '';
  if (!isEmpty(queries)) {
    const queryWithOutEmptyFields = Object.keys(queries).reduce((acc, elem) => {
      if ((isString(queries[elem]) && !isEmpty(queries[elem])) || isNumber(queries[elem])) {
        acc[elem] = queries[elem]; // eslint-disable-line no-param-reassign
      }
      return acc;
    }, {} as IQueries);
    query = !isEmpty(queryWithOutEmptyFields) ? `?${queryString.stringify(queryWithOutEmptyFields)}` : '';
  }
  return query;
};
