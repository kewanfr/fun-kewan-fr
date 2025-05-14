import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import DateJarAdd from "./pages/DateJarAdd";
import DateJarRandom from "./pages/DateJarRandom";


interface Idea {
  text: string;
  done: boolean;
}
interface HistoryEntry {
  letter: string;
  idea: string;
  date: string;
  done: boolean;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function App() {
  const defaultIdeas = ALPHABET.reduce((acc, letter) => {
    acc[letter] = [];
    return acc;
  }, {} as Record<string, Idea[]>);

  const [ideas, setIdeas] = useState<Record<string, Idea[]>>(() => {
    try {
      const stored =
        JSON.parse(localStorage.getItem("dateJarIdeas") || "null") || {};
      return { ...defaultIdeas, ...stored };
    } catch {
      return defaultIdeas;
    }
  });

  const defaultHistory: HistoryEntry[] = [];
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("dateJarHistory") || "null") ||
        defaultHistory
      );
    } catch {
      return defaultHistory;
    }
  });

  useEffect(() => {
    localStorage.setItem("dateJarIdeas", JSON.stringify(ideas));
  }, [ideas]);
  useEffect(() => {
    localStorage.setItem("dateJarHistory", JSON.stringify(history));
  }, [history]);

  const handleAdd = (letter: string, text: string) => {
    setIdeas((prev) => ({
      ...prev,
      [letter]: [...prev[letter], { text, done: false }],
    }));
  };

  const handleToggleDone = (letter: string, idx: number) => {
    setIdeas((prev) => ({
      ...prev,
      [letter]: prev[letter].map((item, i) =>
        i === idx ? { ...item, done: !item.done } : item
      ),
    }));
  };

  const handleAddHistory = (entry: Omit<HistoryEntry, "done">) => {
    setHistory((prev) => [...prev, { ...entry, done: false }]);
  };

  const handleToggleHistory = (idx: number) => {
    setHistory((prev) => {
      const newHist = prev.map((e, i) =>
        i === idx ? { ...e, done: !e.done } : e
      );
      // Toggle corresponding idea in "ideas"
      const entry = prev[idx];
      setIdeas((prevIdeas) => {
        const list = prevIdeas[entry.letter] || [];
        const ideaIdx = list.findIndex((item) => item.text === entry.idea);
        if (ideaIdx === -1) return prevIdeas;
        return {
          ...prevIdeas,
          [entry.letter]: list.map((item, i) =>
            i === ideaIdx ? { ...item, done: !item.done } : item
          ),
        };
      });
      return newHist;
    });
  };

  const handleClearHistory = () => {
    if (window.confirm("Effacer tout l'historique ?")) {
      setHistory([]);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/date-jar/add"
        element={
          <DateJarAdd
            ideas={ideas}
            onAdd={handleAdd}
            onToggle={handleToggleDone}
          />
        }
      />
      <Route
        path="/date-jar/random"
        element={
          <DateJarRandom
            ideas={ideas}
            history={history}
            onPickHistory={handleAddHistory}
            onToggleHistory={handleToggleHistory}
            onClearHistory={handleClearHistory}
          />
        }
      />
    </Routes>
  );
}

export default App;