import axios from "axios";

export const requestLogin = (username, password) => {
  const url = "https://journeyal-webservice.onrender.com/auth/token/login/";

  const response = axios.post(url, {
    username: username,
    password: password })
  return response
};

export const requestLogout = (token) => {
  const url = "https://journeyal-webservice.onrender.com/auth/token/logout/"

  const response = axios.post(url, {
    headers: { Authorization: `Token ${token}` }})
  return response
};

export const requestNewUser = (username, password) => {
  const url = "https://journeyal-webservice.onrender.com/auth/users/";

  const response = axios.post(url, {
    username: username,
    password: password })
  return response
};

export const requestCalendars = (token) => {
  const url = "https://journeyal-webservice.onrender.com/calendar/";

  const response = axios.get(url, {
    headers: { Authorization: `Token ${token}` }})
  return response
};

export const requestNewCalendar = (token, formData) => {
  const url = "https://journeyal-webservice.onrender.com/calendar/";

  const response = axios.post(url, formData,
    {headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Token ${token}`}})
  return response
};

export const requestEditCalendar = (token, formData, calId) => {
  const url = `https://journeyal-webservice.onrender.com/calendar/${calId}/`

  const response = axios.patch(url, formData, 
    {headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Token ${token}` }})
  return response
};

export const requestDeleteCalendar = (token, id) => {
  const url = `https://journeyal-webservice.onrender.com/calendar/${id}/`

  const response = axios.delete(url, {
    headers: { Authorization: `Token ${token}` }})
  return response
};

export const requestAllEntries = (token) => {
  const url = "https://journeyal-webservice.onrender.com/journal/"

  const response = axios.get(url, {
    headers: { Authorization: `Token ${token}` }})
  return response
};

export const requestCalendarsEntries = (token, calendarId) => {
  const url = `https://journeyal-webservice.onrender.com/calendar/${calendarId}/`

  const response = axios.get(url, {
    headers: { Authorization: `Token ${token}` }})
  return response
}

export const requestAddEntry = (token, newJson) => {
  const url = "https://journeyal-webservice.onrender.com/journal/"

  const response = axios.post(url, newJson,
    {headers: { Authorization: `Token ${token}` }})
  return response
};

export const requestTagSearch = (token, tag) => {
  const url = `https://journeyal-webservice.onrender.com/journal/?search=${tag}`

  const response = axios.get(url, {
    headers: { Authorization: `Token ${token}` }})
  return response
}