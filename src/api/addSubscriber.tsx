import axios from 'axios';

const addSubscriber = (
  userInputsEndpoint: string,
  apiKey: string,
  userEmailAddress: string,
  userName?: string
) => {
  axios
    .post(
      `${userInputsEndpoint}/addSubscriber`,
      {
        email: userEmailAddress,
        fname: userName ? userName.split(' ')[0] : '',
        lname:
          userName && userName.includes(' ')
            ? userName.substr(userName.indexOf(' ') + 1)
            : '',
        inputCategory: 'subscription',
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',

          'x-api-key': apiKey,
        },
      }
    )
    .then(response => {});
};

export default addSubscriber;
