import axios from 'axios';

const storeUserInputs = (userInputsEndpoint, apiKey, category, data) => {
  const {
    value,
    feedbackMessage,
    emailAddress,
    username,
    cityToAdd,
    isSubscribed,
  } = data;
  const today = new Date();

  axios
    .post(
      `${userInputsEndpoint}/createuserFeedback`,
      {
        rating: value,
        feedbackMessage,
        emailAddress,
        username,
        cityToAdd,
        isSubscribed,
        inputCategory: category,
        timestamp: today.getTime(),
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

export default storeUserInputs;
