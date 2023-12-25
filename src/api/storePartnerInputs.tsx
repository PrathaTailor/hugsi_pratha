import axios from 'axios';

const storePartnerInputs = (userInputsEndpoint, apiKey, data) => {
  const {
    partnerMessage,
    emailAddress,
    username,
    partnerCompany,
    isSubscribed,
  } = data;
  const today = new Date();

  axios
    .post(
      `${userInputsEndpoint}/createuserFeedback`,
      {
        partnerMessage,
        emailAddress,
        username,
        partnerCompany,
        isSubscribed,
        inputCategory: 'partner',
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

export default storePartnerInputs;
