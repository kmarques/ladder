/**
 * Created by karl on 05/02/2017.
 */
'use strict';

export const connect = (payload) => {
  const API_ENDPOINT = '/connect';

  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: payload.username,
      password: payload.password,
    })
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    return json;
  });
};

export const refreshToken = (payload) => {
  const API_ENDPOINT = '/check-token';

  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    return response.json();
  })
  .then(json => {
    return json;
  });
};