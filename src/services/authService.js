import parseJwt from "./parseJwt";
import { config } from './constants';

const API_URL = config.url.API_URL

function login(email, password) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'user': {
        'email': email, 
        'password': password
      }
    })
  })
  .then(response => {
    // If Response includes Authorization token, add to localStorage
    if (response.headers.get('authorization')) {
      const jsonPayload = parseJwt(response.headers.get('authorization'));

      localStorage.setItem(
        'user',
        JSON.stringify({
          authorization: response.headers.get('authorization'),
          user_id: jsonPayload.id,
        })
      );
    }
    return response.json();
  })
  .then(data => {
    return data;
  });
}

function logout() {
  localStorage.removeItem('user');
}

function register(email, password, passwordConfirmation) {
  return fetch(`${API_URL}/signup`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'user': {
        'email': email,
        'password': password,
        'password_confirmation': passwordConfirmation
      }
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  });
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'));
}

export {
  login,
  logout,
  register,
  getCurrentUser,
};
