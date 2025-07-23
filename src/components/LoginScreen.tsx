import React, { useState, useEffect } from 'react';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show animation for 3 seconds, then show login
    const timer = setTimeout(() => {
      setShowLogin(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'rotadiretadaprovacao@gmail.com' && password === '1234') {
        onLogin();
      } else {
        setError('Email ou senha incorretos');
      }
      setIsLoading(false);
    }, 1000);
  };

  if (!showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-bounce mb-8">
            <GraduationCap className="w-24 h-24 text-white mx-auto" />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white animate-fade-in-up">
              Rota Direta da Aprovação
            </h1>
            
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;