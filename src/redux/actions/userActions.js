import { GET_USER, GET_USER_FROM_LS } from '../constants';

export const getUser = () => dispatch => {
  try {
    if (JSON.parse(localStorage.getItem('user'))) {
      const user = JSON.parse(localStorage.getItem('user'));

      dispatch({
        type: GET_USER,
        user,
      });
    } else {
      try {
        (async function () {
          const url = process.env.REACT_APP_API_URL + '/user';
          const res = await fetch(url);
          const user = await res.json();

          dispatch({
            type: GET_USER,
            user,
          });
        })();
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
