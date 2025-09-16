// src/services/userService.js
import { getToken } from './authService';

const API_URL = 'http://localhost:5127/api/users';

export const getUsers = async () => {
  const res = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!res.ok) {
    throw new Error('Kullanıcılar getirilemedi.');
  }

  return await res.json();
};
