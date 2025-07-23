import React, { useState } from 'react';
import { HelpCircle, Check, X, BookOpen, Brain, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  subject: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  examBoard: string;
}

const QuestionBank: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [needsSimpleExplanation, setNeedsSimpleExplanation] = useState(false);
  const [stats, setStats] = useState({
    answered: 0,
    correct: 0,
    streak: 0
  });

  const subjects = [
    { id: 'all', name: 'Todas as Disciplinas' },
    { id: 'portuguese', name: 'Português' },
    { id: 'math', name: 'Matemática' },
    { id: 'logic', name: 'Raciocínio Lógico' },
    { id: 'law', name: 'Direito' },
    { id: 'general', name: 'Conhecimentos Gerais' },
  ];

  const questions: Question[] = [
    {
      id: 1,
      subject: 'portuguese',
      topic: 'Concordância Verbal',
      question: 'Assinale a alternativa em que a concordância verbal está CORRETA:',
      options: [
        'Fazem dois anos que ele partiu.',
        'Houveram muitos problemas na reunião.',
        'Existem várias soluções para o problema.',
        'Podem haver alternativas melhores.'
      ],
      correctAnswer: 2,
      explanation: 'O verbo "existir" concorda com o sujeito "várias soluções" (plural), por isso deve ficar no plural: "existem". Os verbos "fazer" (temporal), "haver" (existir) e a expressão "pode haver" são impessoais e ficam no singular.',
      difficulty: 'Médio',
      examBoard: 'FCC'
    },
    {
      id: 2,
      subject: 'math',
      topic: 'Porcentagem',
      question: 'Uma mercadoria custava R$ 200,00 e teve um aumento de 15%. Depois, teve um desconto de 10%. Qual o preço final?',
      options: [
        'R$ 207,00',
        'R$ 210,00',
        'R$ 205,00',
        'R$ 190,00'
      ],
      correctAnswer: 0,
      explanation: 'Primeiro, calculamos o aumento: R$ 200,00 + 15% = R$ 200,00 + R$ 30,00 = R$ 230,00. Depois, aplicamos o desconto: R$ 230,00 - 10% = R$ 230,00 - R$ 23,00 = R$ 207,00.',
      difficulty: 'Fácil',
      examBoard: 'CESPE/CEBRASPE'
    },
    {
      id: 3,
      subject: 'logic',
      topic: 'Proposições Lógicas',
      question: 'Se "Todos os advogados são formados em Direito" e "João é advogado", então:',
      options: [
        'João pode não ser formado em Direito',
        'João é formado em Direito',
        'João não é formado em Direito',
        'Não é possível determinar'
      ],
      correctAnswer: 1,
      explanation: 'Pela regra do silogismo, se todos os advogados são formados em Direito (premissa maior) e João é advogado (premissa menor), então necessariamente João é formado em Direito (conclusão).',
      difficulty: 'Médio',
      examBoard: 'VUNESP'
    },
    {
      id: 4,
      subject: 'law',
      topic: 'Constituição Federal',
      question: 'Segundo a Constituição Federal de 1988, são objetivos fundamentais da República Federativa do Brasil:',
      options: [
        'Apenas construir uma sociedade livre, justa e solidária',
        'Garantir o desenvolvimento nacional, erradicar a pobreza e promover o bem de todos',
        'Construir uma sociedade livre, justa e solidária; garantir o desenvolvimento nacional; erradicar a pobreza; promover o bem de todos',
        'Apenas promover o bem de todos, sem preconceitos'
      ],
      correctAnswer: 2,
      explanation: 'O art. 3º da CF/88 estabelece quatro objetivos fundamentais: I - construir uma sociedade livre, justa e solidária; II - garantir o desenvolvimento nacional; III - erradicar a pobreza e a marginalização; IV - promover o bem de todos.',
      difficulty: 'Médio',
      examBoard: 'FGV'
    }
  ];

  const filteredQuestions = selectedSubject === 'all' 
    ? questions 
    : questions.filter(q => q.subject === selectedSubject);

  const currentQ = filteredQuestions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const handleShowAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowAnswer(true);
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    setStats(prev => ({
      answered: prev.answered + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
      streak: isCorrect ? prev.streak + 1 : 0
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
    }
    setSelectedAnswer(null);
    setShowAnswer(false);
    setNeedsSimpleExplanation(false);
  };

  const handleSimpleExplanation = () => {
    setNeedsSimpleExplanation(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-100 text-green-700';
      case 'Médio': return 'bg-yellow-100 text-yellow-700';
      case 'Difícil': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSimpleExplanation = () => {
    switch (currentQ.id) {
      case 1:
        return 'Pense assim: quando você diz "existe uma pessoa" ou "existem várias pessoas", o verbo muda conforme a quantidade. É a mesma regra aqui: "existem várias soluções" está certo porque são várias.';
      case 2:
        return 'Vamos por partes: R$ 200 + 15% = R$ 230 (aumentou). Depois R$ 230 - 10% = R$ 207 (diminuiu um pouco). É como comprar algo que ficou mais caro, mas depois teve um desconto menor.';
      case 3:
        return 'É como dizer: "todos os gatos são animais" e "Mimi é um gato". Então, com certeza, Mimi é um animal. Mesma lógica: se João é advogado e todos os advogados estudaram Direito, então João estudou Direito.';
      case 4:
        return 'A Constituição tem 4 objetivos principais para o Brasil: 1) Ser um país justo, 2) Crescer e se desenvolver, 3) Acabar com a pobreza, 4) Cuidar bem de todos os brasileiros. São todos esses juntos.';
      default:
        return 'Esta é uma explicação mais simples do conceito abordado na questão.';
    }
  };

  if (!currentQ) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-lg text-center">
        <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma questão encontrada</h3>
        <p className="text-gray-600">Selecione uma disciplina para começar a praticar.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Questões Comentadas</h3>
            <p className="text-orange-100">Pratique com questões reais de concursos</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats.streak}</div>
            <div className="text-orange-100">sequência</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-bold">{stats.answered}</div>
            <div className="text-orange-100 text-sm">Respondidas</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{stats.correct}</div>
            <div className="text-orange-100 text-sm">Corretas</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">
              {stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0}%
            </div>
            <div className="text-orange-100 text-sm">Acerto</div>
          </div>
        </div>
      </div>

      {/* Subject Filter */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowAnswer(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Questão {currentQuestion + 1} de {filteredQuestions.length}</span>
            <button
              onClick={() => {
                setCurrentQuestion(Math.floor(Math.random() * filteredQuestions.length));
                setSelectedAnswer(null);
                setShowAnswer(false);
                setNeedsSimpleExplanation(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600">{currentQ.topic}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQ.difficulty)}`}>
              {currentQ.difficulty}
            </span>
            <span className="text-sm text-gray-500">{currentQ.examBoard}</span>
          </div>
        </div>

        <h4 className="text-lg font-medium text-gray-900 mb-6">{currentQ.question}</h4>

        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, index) => {
            let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all';
            
            if (showAnswer) {
              if (index === currentQ.correctAnswer) {
                buttonClass += ' border-green-500 bg-green-50 text-green-700';
              } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                buttonClass += ' border-red-500 bg-red-50 text-red-700';
              } else {
                buttonClass += ' border-gray-200 bg-gray-50 text-gray-500';
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += ' border-orange-500 bg-orange-50 text-orange-700';
              } else {
                buttonClass += ' border-gray-200 hover:border-orange-300 hover:bg-orange-50';
              }
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showAnswer}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 mr-3 flex items-center justify-center">
                    {showAnswer && index === currentQ.correctAnswer && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                    {showAnswer && index === selectedAnswer && index !== currentQ.correctAnswer && (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                    {!showAnswer && (
                      <span className="text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex space-x-3">
          {!showAnswer ? (
            <button
              onClick={handleShowAnswer}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedAnswer !== null
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Ver Resposta
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Próxima Questão
            </button>
          )}
        </div>
      </div>

      {/* Explanation */}
      {showAnswer && (
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-blue-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900">Explicação</h4>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{currentQ.explanation}</p>
            
            {!needsSimpleExplanation && (
              <button
                onClick={handleSimpleExplanation}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
              >
                <HelpCircle className="w-4 h-4 mr-1" />
                Não entendi, explicar mais simples
              </button>
            )}
            
            {needsSimpleExplanation && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h5 className="font-medium text-blue-800 mb-2">Explicação Simplificada:</h5>
                <p className="text-blue-700">{getSimpleExplanation()}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;