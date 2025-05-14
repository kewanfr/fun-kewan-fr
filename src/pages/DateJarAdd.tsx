import React, { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Idea, IdeasResponse } from "../api";

interface Props {
  ideas: IdeasResponse;
  onAdd: (l: string, t: string) => void;
  onDelete: (l: string, i: number) => void;
  onToggle: (l: string, i: number) => void;
}
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const DateJarAdd: FC<Props> = ({ ideas, onAdd, onDelete, onToggle }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !text.trim()) return;
    onAdd(selected, text.trim());
    setText("");
  };

  return (
    <div className="px-4 py-8 max-w-xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        Ajouter des idées par lettre
      </motion.h2>
      <div className="grid grid-cols-6 gap-4 mb-8">
        {ALPHABET.map((letter) => {
          const list = ideas[letter] || [];
          const done = list.filter((i) => i.done).length;
          const pct = list.length ? Math.round((done / list.length) * 100) : 0;
          const sel = selected === letter;
          return (
            <button
              key={letter}
              onClick={() => setSelected(letter)}
              className={`flex flex-col items-center p-1 transition-transform ${
                sel
                  ? "scale-110 ring-2 ring-primary bg-primary/20 rounded-lg"
                  : ""
              }`}
            >
              <div className="w-12 h-12">
                <CircularProgressbar
                  value={pct}
                  text={letter}
                  styles={buildStyles({
                    textSize: "28px",
                    pathColor: "#2C3E50",
                    trailColor: "#E5E7EB",
                    textColor: "#2C3E50",
                  })}
                />
              </div>
              <span
                className={`mt-1 text-sm font-semibold ${
                  sel ? "text-primary" : "text-text/60"
                }`}
              >
                {list.length} idée{list.length > 1 ? "s" : ""}
              </span>
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl shadow-soft p-6 ring-1 ring-white/20"
        >
          <h3 className="text-xl font-bold mb-4">Idées pour « {selected} »</h3>
          <form onSubmit={handleSubmit} className="flex space-x-2 mb-6">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nouvelle idée..."
              className="flex-1 p-3 border-2 border-primary rounded-xl focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="px-4 bg-secondary text-text font-bold rounded-xl shadow-md hover:bg-secondary/90"
            >
              Ajouter
            </button>
          </form>
          <ul className="space-y-3 max-h-60 overflow-auto">
            {(ideas[selected] || []).map((item, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-inner hover:bg-primary/10 transition"
              >
                <span
                  className={`${
                    item.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item.text}
                </span>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => onToggle(selected, idx)}
                    className="form-checkbox h-5 w-5 text-secondary"
                  />
                  <button
                    onClick={() => onDelete(selected, idx)}
                    className="text-red-500 hover:opacity-70"
                  >
                    Suppr.
                  </button>
                </div>
              </li>
            ))}
            {(ideas[selected] || []).length === 0 && (
              <li className="text-sm text-gray-500">
                Aucune idée pour « {selected} »
              </li>
            )}
          </ul>
          <button
            onClick={() => navigate("/date-jar/random")}
            className="mt-4 text-sm text-primary underline"
          >
            Tirer une idée →
          </button>
        </motion.div>
      )}
    </div>
  );
};
export default DateJarAdd;
