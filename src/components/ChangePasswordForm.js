import { useState } from "react";

function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    setMessage({ type: "success", text: data.message });
    setForm({ currentPassword: "", newPassword: "" });

  } catch (err) {
    setMessage({ type: "error", text: err.message });
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <h3>Parola Değiştir</h3>

      {message && (
        <p style={{ color: message.type === "error" ? "red" : "green" }}>
          {message.text}
        </p>
      )}

      <div>
        <label>Eski Parola:</label>
        <input
          type="password"
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
      </div>

      <div>
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
  );
}

export default ChangePasswordForm;
