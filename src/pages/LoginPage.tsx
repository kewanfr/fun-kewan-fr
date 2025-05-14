import React, { useState, useEffect } from "react";
import { login } from "../api";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();
  const loc = useLocation();

  // Si ?pw=... dans l’URL, essayer d’auto-login
  useEffect(() => {
    const params = new URLSearchParams(loc.search);
    const candidate = params.get("pw");
    if (candidate) {
      login(candidate as string).then((ok: boolean) => {
        if (ok) {
          localStorage.setItem("sitePassword", candidate as string);
          nav(loc.pathname, { replace: true });
        } else {
          setError("Mot de passe invalide");
        }
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(pw);
    if (ok) {
      localStorage.setItem("sitePassword", pw);
      nav("/", { replace: true });
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold mb-4">Se connecter</h2>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Mot de passe"
          className="w-full p-2 border rounded mb-4"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded"
        >
          Valider
        </button>
      </form>
    </div>
  );
}
