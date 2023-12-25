import axios from 'axios';

const validateUserWithToken = (
  userInputsEndpoint: string,
  apiKey: string,
  token: string
) => {
  axios
    .get(`${userInputsEndpoint}/validateUser`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        'x-api-key': apiKey,
        accessToken: token,
      },
    })
    .then(response => {
      return response.data;
    });
};

export default validateUserWithToken;
