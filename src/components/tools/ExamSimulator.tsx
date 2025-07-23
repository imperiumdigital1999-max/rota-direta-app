import React, { useState } from 'react';
import { Timer, Play, Pause, RotateCcw, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface SimulationQuestion {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface SimulationResult {
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  subjectScores: { [key: string]: { correct: number; total: number } };
}

const ExamSimulator: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [simulationType, setSimulationType] = useState<'full' | 'custom'>('full');

  // Mock simulation questions
  const simulationQuestions: SimulationQuestion[] = [
    {
      id: 1,
      subject: 'Português',
      question: 'Assinale a alternativa que apresenta concordância verbal correta:',
      options: [
        'Houveram muitas reclamações sobre o serviço.',
        'Faz dois anos que não o vejo.',
        'Devem haver soluções para o problema.',
        'Aconteceram vários acidentes na rodovia.'
      ],
      correctAnswer: 3
    },
    {
      id: 2,
      subject: 'Matemática',
      question: 'Se 25% de um número corresponde a 80, qual é esse número?',
      options: ['200', '240', '300', '320'],
      correctAnswer: 3
    },
    {
      id: 3,
      subject: 'Raciocínio Lógico',
      question: 'Na sequência 3, 7, 15, 31, ..., qual é o próximo número?',
      options: ['47', '55', '63', '71'],
      correctAnswer: 2
    },
    {
      id: 4,
      subject: 'Direito',
      question: 'Segundo a Constituição Federal, são direitos sociais:',
      options: [
        'Apenas educação e saúde',
        'Educação, saúde, alimentação, trabalho, moradia',
        'Apenas trabalho e previdência social',
        'Somente os direitos trabalhistas'
      ],
      correctAnswer: 1
    },
    // More questions would be added here...
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishSimulation();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isSimulating, isPaused, timeLeft]);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentQuestion(0);
    setTimeLeft(simulationType === 'full' ? 3600 : 1800); // 60 or 30 minutes
    setAnswers({});
    setShowResults(false);
    setSelectedAnswer(null);
  };

  const finishSimulation = () => {
    setIsSimulating(false);
    calculateResults();
    setShowResults(true);
  };

  const calculateResults = () => {
    // Results calculation would be implemented here
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < simulationQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] || null);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft < 300) return 'text-red-600'; // Last 5 minutes
    if (timeLeft < 900) return 'text-orange-600'; // Last 15 minutes
    return 'text-green-600';
  };

  if (showResults) {
    const mockResults: SimulationResult = {
      totalQuestions: simulationQuestions.length,
      correctAnswers: 15,
      timeSpent: 3600 - timeLeft,
      subjectScores: {
        'Português': { correct: 4, total: 5 },
        'Matemática': { correct: 3, total: 5 },
        'Raciocínio Lógico': { correct: 4, total: 5 },
        'Direito': { correct: 4, total: 5 },
      }
    };

    const accuracy = Math.round((mockResults.correctAnswers / mockResults.totalQuestions) * 100);

    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <CheckCircle className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Simulado Concluído!</h3>
              </div>
              <p className="text-green-100">Confira seu desempenho detalhado abaixo</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{accuracy}%</div>
              <div className="text-green-100">Taxa de Acerto</div>
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{mockResults.correctAnswers}</div>
            <div className="text-gray-600 text-sm">Acertos</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {mockResults.totalQuestions - mockResults.correctAnswers}
            </div>
            <div className="text-gray-600 text-sm">Erros</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <Timer className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{formatTime(mockResults.timeSpent)}</div>
            <div className="text-gray-600 text-sm">Tempo Gasto</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{accuracy}%</div>
            <div className="text-gray-600 text-sm">Desempenho</div>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Desempenho por Disciplina</h4>
          <div className="space-y-4">
            {Object.entries(mockResults.subjectScores).map(([subject, score]) => {
              const percentage = Math.round((score.correct / score.total) * 100);
              return (
                <div key={subject}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{subject}</span>
                    <span className="text-gray-600">{score.correct}/{score.total} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              setShowResults(false);
              setIsSimulating(false);
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Novo Simulado
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
            Revisar Questões
          </button>
          <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
            Plano de Revisão
          </button>
        </div>
      </div>
    );
  }

  if (isSimulating) {
    const currentQ = simulationQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / simulationQuestions.length) * 100;

    return (
      <div className="space-y-6">
        {/* Timer and Progress */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`text-2xl font-bold ${getTimeColor()}`}>
                {formatTime(timeLeft)}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">Questão {currentQuestion + 1} de {simulationQuestions.length}</div>
              <div className="text-lg font-semibold text-gray-900">{Math.round(progress)}% concluído</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Current Question */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-blue-600">{currentQ.subject}</span>
            <span className="text-sm text-gray-500">Questão {currentQuestion + 1}</span>
          </div>

          <h4 className="text-lg font-medium text-gray-900 mb-6">{currentQ.question}</h4>

          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{String.fromCharCode(65 + index)}) {option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Anterior
            </button>

            <div className="flex space-x-2">
              {currentQuestion === simulationQuestions.length - 1 ? (
                <button
                  onClick={finishSimulation}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Finalizar Simulado
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Próxima
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="bg-white rounded-xl p-4 shadow-lg">
          <h5 className="font-medium text-gray-900 mb-3">Navegação das Questões</h5>
          <div className="grid grid-cols-10 gap-2">
            {simulationQuestions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setSelectedAnswer(answers[index] || null);
                }}
                className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Timer className="w-8 h-8 text-red-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Simulador de Provas</h3>
        </div>
        <p className="text-gray-600">
          Simule uma prova real com cronômetro e condições similares aos concursos. 
          Teste seus conhecimentos e receba uma análise detalhada do seu desempenho.
        </p>
      </div>

      {/* Simulation Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer border-2 transition-all hover:shadow-xl ${
            simulationType === 'full' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          onClick={() => setSimulationType('full')}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Simulado Completo</h4>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              simulationType === 'full' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            }`}>
              {simulationType === 'full' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• 60 questões</li>
            <li>• 4 horas de duração</li>
            <li>• Todas as disciplinas</li>
            <li>• Simulação completa do concurso</li>
          </ul>
        </div>

        <div
          className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer border-2 transition-all hover:shadow-xl ${
            simulationType === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
          }`}
          onClick={() => setSimulationType('custom')}
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Simulado Rápido</h4>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              simulationType === 'custom' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
            }`}>
              {simulationType === 'custom' && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li>• 20 questões</li>
            <li>• 30 minutos de duração</li>
            <li>• Disciplinas principais</li>
            <li>• Ideal para prática diária</li>
          </ul>
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={startSimulation}
        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-6 rounded-lg font-semibold transition-all transform hover:scale-105"
      >
        <Play className="w-5 h-5 inline mr-2" />
        Iniciar {simulationType === 'full' ? 'Simulado Completo' : 'Simulado Rápido'}
      </button>

      {/* Previous Results */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="text-xl font-semibold text-gray-900 mb-4">Histórico de Simulados</h4>
        <div className="space-y-3">
          {[
            { date: '15/12/2024', score: 73, time: '3h 45min', questions: 60 },
            { date: '10/12/2024', score: 68, time: '3h 20min', questions: 60 },
            { date: '05/12/2024', score: 75, time: '2h 15min', questions: 30 },
          ].map((result, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{result.date}</div>
                <div className="text-sm text-gray-600">{result.questions} questões • {result.time}</div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.score >= 70 ? 'bg-green-100 text-green-700' : 
                  result.score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {result.score}%
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamSimulator;