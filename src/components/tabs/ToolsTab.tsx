import React, { useState } from 'react';
import { Brain, Target, FileText, HelpCircle, Timer, BarChart3 } from 'lucide-react';
import LevelAssessment from '../tools/LevelAssessment';
import StudyPlan from '../tools/StudyPlan';
import EssayCorrection from '../tools/EssayCorrection';
import QuestionBank from '../tools/QuestionBank';
import ExamSimulator from '../tools/ExamSimulator';
import ContestPanel from '../tools/ContestPanel';

const ToolsTab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'assessment',
      title: 'Avaliador de Nivelamento',
      description: 'Descubra seu nível atual em cada disciplina',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      component: LevelAssessment
    },
    {
      id: 'study-plan',
      title: 'Plano de Estudos Personalizado',
      description: 'Cronograma adaptado ao seu perfil e disponibilidade',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      component: StudyPlan
    },
    {
      id: 'essay',
      title: 'Correção de Redação com IA',
      description: 'Receba feedback detalhado sobre sua redação',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      component: EssayCorrection
    },
    {
      id: 'questions',
      title: 'Questões Comentadas',
      description: 'Resolva questões com explicações da IA',
      icon: HelpCircle,
      color: 'from-orange-500 to-orange-600',
      component: QuestionBank
    },
    {
      id: 'simulator',
      title: 'Simulador de Provas',
      description: 'Simule provas reais com cronômetro',
      icon: Timer,
      color: 'from-red-500 to-red-600',
      component: ExamSimulator
    },
    {
      id: 'contests',
      title: 'Concursos Abertos',
      description: 'Veja os concursos disponíveis em tempo real',
      icon: Brain,
      color: 'from-indigo-500 to-indigo-600',
      component: ContestPanel
    },
  ];

  if (activeTool) {
    const tool = tools.find(t => t.id === activeTool);
    if (tool) {
      const ToolComponent = tool.component;
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{tool.title}</h2>
            <button
              onClick={() => setActiveTool(null)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Voltar às Ferramentas
            </button>
          </div>
          <ToolComponent />
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Central de Ferramentas IA</h2>
        <p className="text-gray-600">
          Utilize nossas ferramentas inteligentes para otimizar seus estudos e aumentar suas chances de aprovação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className="group relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-left"
            >
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${tool.color} rounded-t-xl`}></div>
              
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Estatísticas de Uso</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-blue-100 text-sm">Simulados Realizados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-blue-100 text-sm">Redações Corrigidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">245</div>
            <div className="text-blue-100 text-sm">Questões Resolvidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">73%</div>
            <div className="text-blue-100 text-sm">Taxa de Acerto</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsTab;