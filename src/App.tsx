
import React, { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen";
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <div className="flex flex-col items-center justify-center h-screen bg-white animate-fade-in">
          <div className="flex items-center space-x-4">
            <img src="/universidade-digital-logo.png" alt="Logo" className="w-20 h-20" />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-yellow-500">Rota Direta da Aprovação</h1>
              <p className="text-gray-600 text-sm">em parceria com Universidade Digital</p>
            </div>
          </div>
        </div>
      ) : (
        <LoginScreen />
      )}
    </>
  );
}

export default App;
