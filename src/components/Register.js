import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Kayıt Ol</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Kullanıcı adı" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" required />
      <button type="submit">Kayıt Ol</button>
    </form>
  );
}
