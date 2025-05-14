import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import DateJarAdd from "./pages/DateJarAdd";
import DateJarRandom from "./pages/DateJarRandom";
import LoginPage from "./pages/LoginPage";

import * as api from "./api";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function App() {
  const [ideas, setIdeas] = useState<api.IdeasResponse>(
    {} as api.IdeasResponse
  );
  const [history, setHistory] = useState<api.HistoryResponse>([]);

  const pw = localStorage.getItem("sitePassword");

  if (!pw) {
    return <LoginPage />;
  }

  useEffect(() => {
    api.fetchIdeas().then(setIdeas);
  }, []);
  useEffect(() => {
    api.fetchHistory().then(setHistory);
  }, []);

  const handleAdd = (letter: string, text: string) => {
    api
      .addIdea(letter, text)
      .then((updated) => setIdeas((prev) => ({ ...prev, [letter]: updated })));
  };

  const handleDelete = (letter: string, idx: number) => {
    api
      .deleteIdea(letter, idx)
      .then((updated) => setIdeas((prev) => ({ ...prev, [letter]: updated })));
  };

  const handleToggle = (letter: string, idx: number) => {
    api.toggleIdea(letter, idx).then((item) =>
      setIdeas((prev) => ({
        ...prev,
        [letter]: prev[letter].map((i, j) => (j === idx ? item : i)),
      }))
    );
  };

  const handlePickHistory = (entry: Omit<api.HistoryEntry, "done">) => {
    api
      .addHistory(entry)
      .then(() => Promise.all([api.fetchHistory(), api.fetchIdeas()]))
      .then(([newHistory, newIdeas]) => {
        setHistory(newHistory);
        setIdeas(newIdeas);
      });
  };

  const handleToggleHistory = (idx: number) => {
    api
      .toggleHistory(idx)
      .then(() => Promise.all([api.fetchHistory(), api.fetchIdeas()]))
      .then(([newHistory, newIdeas]) => {
        setHistory(newHistory);
        setIdeas(newIdeas);
      });
  };

  const handleClearHistory = () => {
    if (window.confirm("Effacer tout l'historique ?")) {
      api
        .clearHistory()
        .then(() => Promise.all([api.fetchHistory(), api.fetchIdeas()]))
        .then(([newHistory, newIdeas]) => {
          setHistory(newHistory);
          setIdeas(newIdeas);
        });
    }
  };
  () => {
    api.clearHistory().then(() => setHistory([]));
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={pw ? <HomePage /> : <Navigate to="/login" />} />
      <Route
        path="/date/"
        element={
          <DateJarAdd
            ideas={ideas}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        }
      />
      <Route
        path="/date-jar/add"
        element={
          <DateJarAdd
            ideas={ideas}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        }
      />
      <Route
        path="/date-jar/random"
        element={
          <DateJarRandom
            ideas={ideas}
            history={history}
            onPickHistory={handlePickHistory}
            onToggleHistory={handleToggleHistory}
            onClearHistory={handleClearHistory}
          />
        }
      />
    </Routes>
  );
}

export default App;