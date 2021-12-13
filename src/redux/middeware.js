import { CREATE_POST } from './constants';

const forbidden = ['fuck', 'spam', 'php'];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function (next) {
    return function (action) {
      if (action.type === CREATE_POST) {
        const found = forbidden.filter(w => action.payload.titile.includes(w));

        // if(found.length) {
        //   return dispatch(S )
        // }
      }

      return next(action);
    };
  };
}
