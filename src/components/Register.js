import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(username, password);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Kayıt Ol</h2>

        {error && <div className="error-box">{error}</div>}

        <div className="form-group">
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı adı"
            required
          />
        </div>

        <div className="form-group">
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Şifre"
            required
          />
        </div>

        <button type="submit">Kayıt Ol</button>
      </form>
    </div>
  );
}
