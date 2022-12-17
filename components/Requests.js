import axios from "axios";

export const requestLogin = (username, password) => {
  const url = "https://journeyal-webservice.onrender.com/auth/token/login/";

  const response = axios.post(url, {
    username: username,
    password: password,
  });
  return response;
};

export const requestCalendars = (token) => {
  const url = "https://journeyal-webservice.onrender.com/calendar/";

  const response = axios.get(url, {
    headers: { Authorization: `Token ${token}` },
  });
  return response;
};

export const requestNewUser = (username, password) => {
  const url = "https://journeyal-webservice.onrender.com/auth/users/";

  const response = axios.post(url, {
    username: username,
    password: password,
  });
  return response;
};
