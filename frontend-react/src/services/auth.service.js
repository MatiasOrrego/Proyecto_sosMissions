import { API_URL } from '../config/env.config.js';

const URL = API_URL + `auth`

const fetchData = async (endpoint, options) => {
  try {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export const registerUser = async({
  username, email, password
}) => {
  return fetchData(URL + `sign-up`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include"
  })
};

export const loginUser = async ({ username, password }) => {
  return fetchData(URL + `sign-in`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include"
  })
};

export const sessionUser = async () => {
  return fetchData(URL + `me`, {
    method: "GET",
    credentials: "include"
  })
};

export const logoutUser = async () => {
  return fetchData(URL + `logout`), {
    method: "POST",
    credentials: "include"
  };
};