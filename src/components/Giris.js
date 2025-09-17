import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import './Giris.css'; // Stil dosyasını unutma

export default function Giris() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Giriş başarısız!');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Giriş Yap</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Kullanıcı adı"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
          required
        />

        <button type="submit">Giriş</button>

        <div className="login-links">
          <p>
            Hesabınız yok mu?{' '}
            <Link to="/register">Kayıt Ol</Link>
          </p>
          <p>
            Şifrenizi mi değiştirmek istiyorsunuz?{' '}
            <Link to="/change">Şifre Değiştir</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
