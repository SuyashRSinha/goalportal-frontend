import axios from "axios";

export const fetchMicrosoftProfile =
  async (accessToken) => {

    const response =
      await axios.get(

        "https://graph.microsoft.com/v1.0/me",

        {
          headers: {

            Authorization:
              `Bearer ${accessToken}`

          }
        }
      );

    return response.data;
  };