import React, { useState, FC } from "react";
import { motion } from "framer-motion";
import { FaDice, FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HistoryResponse, IdeasResponse } from "../api";

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
interface RandomIdea {
  letter: string;
  idea: string;
  date: string;
}

interface DateJarRandomProps {
  ideas: IdeasResponse;
  history: HistoryResponse;
  onPickHistory: (entry: {
    letter: string;
    idea: string;
    date: string;
  }) => void;
  onToggleHistory: (idx: number) => void;
  onClearHistory: () => void;
}

const DateJarRandom: FC<DateJarRandomProps> = ({
  ideas,
  history,
  onPickHistory,
  onToggleHistory,
  onClearHistory,
}) => {
  const [randomIdea, setRandomIdea] = useState<RandomIdea | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  const handlePick = () => {
    // Lettres avec au moins une idée non faite
    const validLetters = Object.keys(ideas).filter((letter) =>
      (ideas[letter] || []).some((item) => !item.done)
    );
    if (validLetters.length === 0)
      return alert(
        "Toutes les idées sont terminées ou aucune idée disponible."
      );

    const letter =
      validLetters[Math.floor(Math.random() * validLetters.length)];
    const items = ideas[letter].filter((item) => !item.done);
    const item = items[Math.floor(Math.random() * items.length)];

    const dateStr = new Date().toISOString();
    const entry = { letter, idea: item.text, date: dateStr };

    setRandomIdea(entry);
    onPickHistory(entry);
  };

  return (
    <div className="px-4 py-8 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-text mb-4">Tirage au sort</h2>

      <motion.button
        onClick={handlePick}
        whileTap={{ scale: 0.9 }}
        className="w-40 h-40 bg-secondary text-text rounded-full flex items-center justify-center shadow-lg mb-4"
      >
        <FaDice className="text-5xl" />
      </motion.button>

      <button
        onClick={() => navigate("/date-jar/add")}
        className="flex items-center space-x-2 text-primary mb-4"
      >
        <FaPlus /> <span>Ajouter une idée</span>
      </button>

      {randomIdea ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-soft ring-1 ring-white/20 w-full max-w-sm text-center mb-6"
        >
          <p className="text-xs text-secondary">Lettre</p>
          <p className="text-4xl font-extrabold text-text mb-2">
            {randomIdea.letter}
          </p>
          <p className="text-lg mb-2">{randomIdea.idea}</p>
          <p className="text-xs text-gray-500">
            {new Date(randomIdea.date).toLocaleString()}
          </p>
        </motion.div>
      ) : (
        <p className="text-gray-500 mb-6">
          Clique sur le dé pour tirer une idée
        </p>
      )}

      {/* Actions historique */}
      <div className="flex items-center space-x-4 mb-2">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center text-text"
        >
          {showHistory ? <FaChevronUp /> : <FaChevronDown />}{" "}
          <span className="ml-1">Historique</span>
        </button>
        <button
          onClick={onClearHistory}
          className="text-sm text-red-500 underline"
        >
          Effacer
        </button>
      </div>

      {showHistory && (
        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-2xl shadow-inner p-4 space-y-3 overflow-auto max-h-64">
          {history
            .slice()
            .reverse()
            .map((h, revIdx) => {
              const idx = history.length - 1 - revIdx;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-white rounded-lg"
                >
                  <div>
                    <p className="text-sm">
                      <strong>{h.letter}</strong>: {h.idea}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(h.date).toLocaleString()}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={h.done}
                    onChange={() => onToggleHistory(idx)}
                    className="form-checkbox h-5 w-5 text-secondary"
                  />
                </div>
              );
            })}
          {history.length === 0 && (
            <p className="text-sm text-gray-500">Aucun historique</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DateJarRandom;
