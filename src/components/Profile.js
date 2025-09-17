import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // Stil dosyasını ekliyoruz

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: ""
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Profil bilgilerini çek
  useEffect(() => {
    axios.get("http://localhost:5127/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setProfile(response.data);
      setLoading(false);
    })
    .catch(error => {
      console.error("Profil alınırken hata:", error);
      setLoading(false);
      setError("Profil bilgileri alınamadı.");
    });
  }, [token]);

  // Form input değişimi
  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  // Profili güncelle
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5127/api/users/profile", profile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setMessage("Profil başarıyla güncellendi!");
      setError("");
    })
    .catch(error => {
      console.error("Güncelleme hatası:", error);
      setError("Bir hata oluştu.");
      setMessage("");
    });
  };

  if (loading) return <p className="loading">Yükleniyor...</p>;

  return (
    <div className="profile-container">
      <h2>Profil Bilgileri</h2>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>E-posta:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Profili Güncelle</button>
      </form>
    </div>
  );
};

export default Profile;
