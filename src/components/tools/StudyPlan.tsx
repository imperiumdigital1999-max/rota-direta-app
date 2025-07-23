import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Target, CheckCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface StudyDay {
  day: number;
  topics: {
    subject: string;
    topic: string;
    duration: number;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
  }[];
  totalTime: number;
}

const StudyPlan: React.FC = () => {
  const { profile } = useUser();
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [planGenerated, setPlanGenerated] = useState(false);

  const generateStudyPlan = (): StudyDay[] => {
    const subjects = [
      { name: 'Português', level: profile.level.portuguese },
      { name: 'Matemática', level: profile.level.math },
      { name: 'Raciocínio Lógico', level: profile.level.logic },
      { name: 'Direito', level: profile.level.law },
      { name: 'Conhecimentos Gerais', level: profile.level.generalKnowledge },
    ];

    const topics = [
      // Português
      { subject: 'Português', topic: 'Concordância Verbal', duration: 45, priority: 'high' as const },
      { subject: 'Português', topic: 'Concordância Nominal', duration: 40, priority: 'high' as const },
      { subject: 'Português', topic: 'Crase', duration: 35, priority: 'medium' as const },
      { subject: 'Português', topic: 'Regência Verbal', duration: 45, priority: 'medium' as const },
      { subject: 'Português', topic: 'Interpretação de Textos', duration: 50, priority: 'high' as const },
      
      // Matemática
      { subject: 'Matemática', topic: 'Regra de Três', duration: 40, priority: 'high' as const },
      { subject: 'Matemática', topic: 'Porcentagem', duration: 35, priority: 'high' as const },
      { subject: 'Matemática', topic: 'Juros Simples e Compostos', duration: 50, priority: 'medium' as const },
      { subject: 'Matemática', topic: 'Equações do 1º Grau', duration: 30, priority: 'medium' as const },
      { subject: 'Matemática', topic: 'Geometria Básica', duration: 45, priority: 'low' as const },
      
      // Raciocínio Lógico
      { subject: 'Raciocínio Lógico', topic: 'Proposições Lógicas', duration: 45, priority: 'high' as const },
      { subject: 'Raciocínio Lógico', topic: 'Silogismos', duration: 40, priority: 'high' as const },
      { subject: 'Raciocínio Lógico', topic: 'Sequências Lógicas', duration: 35, priority: 'medium' as const },
      { subject: 'Raciocínio Lógico', topic: 'Diagramas de Venn', duration: 30, priority: 'medium' as const },
      
      // Direito
      { subject: 'Direito', topic: 'Constituição Federal - Princípios', duration: 60, priority: 'high' as const },
      { subject: 'Direito', topic: 'Direitos Fundamentais', duration: 55, priority: 'high' as const },
      { subject: 'Direito', topic: 'Organização do Estado', duration: 50, priority: 'medium' as const },
      { subject: 'Direito', topic: 'Direito Administrativo Básico', duration: 45, priority: 'medium' as const },
      
      // Conhecimentos Gerais
      { subject: 'Conhecimentos Gerais', topic: 'História do Brasil', duration: 40, priority: 'medium' as const },
      { subject: 'Conhecimentos Gerais', topic: 'Geografia do Brasil', duration: 35, priority: 'medium' as const },
      { subject: 'Conhecimentos Gerais', topic: 'Atualidades', duration: 30, priority: 'high' as const },
    ];

    // Priorizar tópicos com base no nível do usuário (menor nível = maior prioridade)
    const prioritizedTopics = topics.sort((a, b) => {
      const subjectA = subjects.find(s => s.name === a.subject);
      const subjectB = subjects.find(s => s.name === b.subject);
      
      if (!subjectA || !subjectB) return 0;
      
      // Menor nível tem maior prioridade
      if (subjectA.level !== subjectB.level) {
        return subjectA.level - subjectB.level;
      }
      
      // Se mesmo nível, priorizar por importância
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    const dailyHours = profile.studyHoursPerDay;
    const dailyMinutes = dailyHours * 60;
    const plan: StudyDay[] = [];

    let topicIndex = 0;
    for (let day = 1; day <= 7; day++) {
      const dayTopics = [];
      let remainingTime = dailyMinutes;

      while (remainingTime > 0 && topicIndex < prioritizedTopics.length) {
        const topic = prioritizedTopics[topicIndex];
        if (topic.duration <= remainingTime) {
          dayTopics.push({
            ...topic,
            completed: Math.random() > 0.7 // Simular alguns tópicos já concluídos
          });
          remainingTime -= topic.duration;
        }
        topicIndex++;
      }

      plan.push({
        day,
        topics: dayTopics,
        totalTime: dailyMinutes - remainingTime
      });
    }

    return plan;
  };

  const handleGeneratePlan = () => {
    setPlanGenerated(true);
  };

  const studyPlan = planGenerated ? generateStudyPlan() : [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  if (!planGenerated) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Plano de Estudos Personalizado</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Com base no seu nivelamento e disponibilidade, vamos criar um cronograma de estudos 
            otimizado para sua aprovação.
          </p>

          {/* Current Profile Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">Seu Perfil Atual:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
              <div className="flex items-center">
                <Target className="w-4 h-4 mr-2" />
                <span>Concurso: {profile.targetContest || 'Não definido'}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Disponibilidade: {profile.studyHoursPerDay}h/dia</span>
              </div>
            </div>
          </div>

          {/* Level Overview */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Níveis por Disciplina:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(profile.level).map(([subject, level]) => {
                const subjectNames: { [key: string]: string } = {
                  portuguese: 'Português',
                  math: 'Matemática',
                  logic: 'Raciocínio Lógico',
                  law: 'Direito',
                  generalKnowledge: 'Conhecimentos Gerais'
                };
                
                const getLevelColor = (level: number) => {
                  if (level <= 3) return 'text-red-600';
                  if (level <= 6) return 'text-yellow-600';
                  if (level <= 8) return 'text-blue-600';
                  return 'text-green-600';
                };
                
                return (
                  <div key={subject} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">{subjectNames[subject]}</span>
                    <span className={`text-sm font-medium ${getLevelColor(level)}`}>
                      {level}/10
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleGeneratePlan}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 font-semibold"
          >
            <Calendar className="w-5 h-5 inline mr-2" />
            Gerar Meu Plano de Estudos Personalizado
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Seu Plano de Estudos</h3>
            <p className="text-green-100">
              Cronograma personalizado para {profile.studyHoursPerDay}h de estudo diário
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{profile.studyHoursPerDay}h</div>
            <div className="text-green-100">por dia</div>
          </div>
        </div>
      </div>

      {/* Week Selector */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900">Selecionar Semana:</h4>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map(week => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedWeek === week
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                }`}
              >
                Semana {week}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Study Plan Days */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {studyPlan.map((day) => (
          <div key={day.day} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Dia {day.day} - {new Date(2024, 0, day.day).toLocaleDateString('pt-BR', { weekday: 'long' })}
              </h4>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{Math.round(day.totalTime / 60)}h {day.totalTime % 60}min</span>
              </div>
            </div>

            <div className="space-y-3">
              {day.topics.map((topic, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    topic.completed
                      ? 'bg-green-50 border-green-500'
                      : 'bg-gray-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h5 className={`font-medium ${
                          topic.completed ? 'text-green-800 line-through' : 'text-gray-900'
                        }`}>
                          {topic.topic}
                        </h5>
                        {topic.completed && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{topic.subject}</p>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="text-xs">{topic.duration} min</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(topic.priority)}`}>
                          {getPriorityText(topic.priority)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {day.topics.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-8 h-8 mx-auto mb-2" />
                <p>Dia de descanso ou revisão</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Study Tips */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h4 className="font-semibold text-blue-800 mb-3">💡 Dicas para seguir seu plano:</h4>
        <ul className="space-y-2 text-blue-700 text-sm">
          <li>• Priorize as matérias com menor nível de conhecimento</li>
          <li>• Faça pausas de 10 minutos a cada hora de estudo</li>
          <li>• Marque os tópicos como concluídos para acompanhar seu progresso</li>
          <li>• Ajuste o plano conforme sua evolução nas avaliações</li>
          <li>• Use simulados para testar o conhecimento adquirido</li>
        </ul>
      </div>
    </div>
  );
};

export default StudyPlan;