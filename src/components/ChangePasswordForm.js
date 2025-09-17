import { useState } from "react";
import "./ChangePasswordForm.css";

function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("http://localhost:5127/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const html = await response.text();
        console.error("Beklenmeyen içerik:", html);
        throw new Error("Sunucu JSON yerine HTML döndürdü");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Bir hata oluştu");
      }

      setMessage({ type: "success", text: data.message || "Parola başarıyla değiştirildi." });
      setForm({ currentPassword: "", newPassword: "" });

    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <form onSubmit={handleSubmit} className="change-password-form">
        <h3>Parola Değiştir</h3>

        {message && (
          <p className={`message ${message.type}`}>
            {message.text}
          </p>
        )}

        <div className="form-group">
          <label>Eski Parola:</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Yeni Parola:</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Değiştiriliyor..." : "Parolayı Değiştir"}
        </button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;
