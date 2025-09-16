const API_URL = 'http://localhost:5127/api/auth'; // Backend endpoint'ine göre ayarla

export const login = async (username, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
     return res.text().then(text => {
            try {
                const json = JSON.parse(text);
                throw new Error(json.error || "Unknown error");
            } catch (e) {
                throw new Error("Sunucudan geçersiz cevap alındı: " + text);
            }
        });
    
  }

  const data = await res.json();
  localStorage.setItem('token', data.token);
  return data;
};

export const register = async (username, password) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Kayıt başarısız');
  }

  return await res.json();
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};
