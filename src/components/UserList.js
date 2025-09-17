import React, { useEffect, useState } from 'react';
import { getUsers } from '../services/userService';
import { Link } from 'react-router-dom'; // ✅ Link bileşeni
import './UserList.css';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message || 'Kullanıcılar alınırken bir hata oluştu.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list-container">
      <h2>Kullanıcı Listesi</h2>

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Kullanıcı Adı</th>
              <th>Rol</th>
              <th>Detay</th> {/* ✅ Yeni sütun */}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4">Kullanıcı bulunamadı.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/profile/${user.id}`} className="profile">Detay</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
