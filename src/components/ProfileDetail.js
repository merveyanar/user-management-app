import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfileDetail.css';

export default function ProfileDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', role: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5127/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setForm({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role
        });
      } catch (err) {
        console.error(err);
        setError('Kullanıcı detayı alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setError('Yetkisiz erişim.');
      setLoading(false);
    }
  }, [id, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5127/api/users/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Kullanıcı güncellendi.');
      setEditMode(false);
      setUser({ ...user, ...form });
    } catch (err) {
      console.error(err);
      setError('Güncelleme sırasında hata oluştu.');
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5127/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Kullanıcı silindi.');
      setTimeout(() => navigate('/users'), 1500);
    } catch (err) {
      console.error(err);
      setError('Silme sırasında hata oluştu.');
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="profile-detail-container">
      <h2>Kullanıcı Detayı</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {editMode ? (
        <form onSubmit={handleUpdate} className="update-form">
          <div>
            <label>Kullanıcı Adı:</label>
            <input name="username" value={form.username} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Rol:</label>
            <input name="role" value={form.role} onChange={handleChange} required />
          </div>
          <button type="submit">Güncelle</button>
          <button type="button" onClick={() => setEditMode(false)}>İptal</button>
        </form>
      ) : (
        <div className="profile-info">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
        </div>
      )}

      {!editMode && (
        <>
          <button onClick={() => setEditMode(true)} className="update-btn">Güncelle</button>
          <button onClick={handleDelete} className="delete-btn">Sil</button>
        </>
      )}
    </div>
  );
}
