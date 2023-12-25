import axios from 'axios';

const signInUser = (
  userInputsEndpoint: string,
  apiKey: string,
  code: string
) => {
  const today = new Date();
  try {
    axios
      .get(`${userInputsEndpoint}/login`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          'x-api-key': apiKey,
          auth_code: code,
        },
      })
      .then(response => {
        if (response?.data?.userDetails) {
          return response?.data.userDetails;
        }
      });
  } catch (err) {
    return {};
  }
};

export default signInUser;
