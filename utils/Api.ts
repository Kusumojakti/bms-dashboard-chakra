import axios from "axios";

export const apiUrl = "http://localhost:5000";

export const ApiGet = async (url: string, accesstoken: string) => {
  const response = await axios.get(apiUrl + url, {
    headers: {
      Authorization: `Barear ${accesstoken}`,
    },
  });

  if (response.data.code == 401) {
    return window.location.replace("/login");
  }

  return response.data;
};

export const ApiPost = async (url: string, accesstoken: string, data: any) => {
  const response = await axios.post(apiUrl + url, data, {
    headers: {
      Authorization: `Barear ${accesstoken}`,
    },
  });

  if (response.data.code == 401) {
    return window.location.replace("/login");
  }

  return response.data;
};

export const ApiPut = async (url: string, accesstoken: string, data: any) => {
  const response = await axios.put(apiUrl + url, data, {
    headers: {
      Authorization: `Barear ${accesstoken}`,
    },
  });

  if (response.data.code == 401) {
    return window.location.replace("/login");
  }

  return response.data;
};
