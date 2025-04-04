import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./UI/Button";
import { Container, Title } from "./UI/UI";
import Card from "./UI/Card";
import Alert from "./UI/Alert";
import Footer from "./UI/Footer";
import { getVocabulary } from "../api";
import useAppStore from "../store/useAppStore";
import Badge from "./UI/Badge";

export default function Vocabulary() {
  const [vocab, setVocab] = useState([]);
  const username = useAppStore((state) => state.username);
  const setUsername = useAppStore((state) => state.setUsername);
  const darkMode = useAppStore((state) => state.darkMode);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername && !username) {
      setUsername(storedUsername);
    }
  }, [username, setUsername]);

  useEffect(() => {
    getVocabulary(username || "anonymous").then(setVocab);
  }, [username]);
  const isAdmin = username === "admin";
  return (
    <div className={`relative min-h-screen pb-20 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <Container>
        <Title>
          📖 Your Vocabulary — <span className="text-blue-600">{username || "anonymous"}</span>
          <Badge type={isAdmin ? "success" : "default"}>
              {isAdmin ? "Admin" : "Student"}
          </Badge>
        </Title>

        <p className={`mb-6 text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          All words saved from your translations
        </p>

        {vocab.length === 0 ? (
          <Alert type="info">
            🤓 No vocabulary saved yet. Try completing a few translations or levels!
          </Alert>
        ) : (
          <Card className="overflow-x-auto">
            <table className={`min-w-full border rounded-lg overflow-hidden ${darkMode ? "border-gray-600" : "border-gray-200"}`}>
              <thead className={darkMode ? "bg-gray-700 text-gray-200" : "bg-blue-50 text-blue-700"}>
                <tr>
                  <th className="px-4 py-2 text-left">German Word</th>
                  <th className="px-4 py-2 text-left">English Translation</th>
                </tr>
              </thead>
              <tbody className={darkMode ? "bg-gray-900 divide-gray-700" : "bg-white divide-gray-200"}>
                {vocab.map((v, i) => (
                  <tr key={i} className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}>
                    <td className="px-4 py-2 font-medium">{v.vocab}</td>
                    <td className={`px-4 py-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{v.translation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        <div className="mt-6 text-center">
          <Button onClick={() => navigate("/menu")} type="link">
            ⬅️ Back to Menu
          </Button>
        </div>
      </Container>

      <Footer />
    </div>
  );
}
