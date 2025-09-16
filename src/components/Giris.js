import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Giris() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Giriş Yap</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Kullanıcı adı" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Şifre" required />
      <button type="submit">Giriş</button>
    </form>
  );
}
