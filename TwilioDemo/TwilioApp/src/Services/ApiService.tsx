import axios from 'axios';

export const getToken = async (username: string) => {
  console.log('identity :: ', username);
  try {
    if (username) {
      const twilioUser = await axios.get(
        `http://localhost:3001/token/${username}`,
      );
      if (twilioUser.data.jwt) {
        console.log('twilioUser.data.jwt :: ', twilioUser.data.jwt);
        return twilioUser.data.jwt;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
