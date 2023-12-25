import axios from 'axios';
  
const checkDomain = async (userInputsEndpoint,apiKey,userDomain,extractedTownName) => {
    return  axios.post(`${userInputsEndpoint}/validateDomain`, {
        domain: userDomain,
        townName: extractedTownName
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          'x-api-key': apiKey
        },
      }).then((res) => {
        if (res.status === 200 && res.data.isAllowed) {
          return true;
        } else {
          return false;
        }
      }).catch((error) => {
        return false;
      });
};

export default checkDomain;
