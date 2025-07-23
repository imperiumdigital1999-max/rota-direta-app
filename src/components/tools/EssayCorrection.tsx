import React, { useState } from 'react';
import { FileText, Upload, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface Correction {
  score: number;
  generalFeedback: string;
  improvements: string[];
  strengths: string[];
  detailedAnalysis: {
    coherence: number;
    cohesion: number;
    grammar: number;
    content: number;
  };
}

const EssayCorrection: React.FC = () => {
  const [essay, setEssay] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [correction, setCorrection] = useState<Correction | null>(null);
  const [essayTitle, setEssayTitle] = useState('');

  const handleSubmitEssay = async () => {
    if (!essay.trim()) return;

    setIsAnalyzing(true);
    
    // Simular análise da IA (em produção, seria uma chamada para API)
    setTimeout(() => {
      const mockCorrection: Correction = {
        score: 7.5,
        generalFeedback: "Sua redação apresenta uma estrutura adequada e boa argumentação. O tema foi bem desenvolvido, com exemplos relevantes. Há alguns pontos de melhoria na coesão textual e uso de conectivos.",
        improvements: [
          "Utilize mais conectivos para melhorar a fluidez entre parágrafos",
          "Atenção à concordância verbal em algumas passagens",
          "Desenvolva melhor a conclusão com proposta de intervenção mais específica",
          "Evite repetições desnecessárias de palavras"
        ],
        strengths: [
          "Boa estrutura dissertativa com introdução, desenvolvimento e conclusão",
          "Argumentação consistente e bem fundamentada",
          "Uso adequado da norma padrão da língua",
          "Domínio do tema proposto"
        ],
        detailedAnalysis: {
          coherence: 8,
          cohesion: 6,
          grammar: 7,
          content: 8
        }
      };
      
      setCorrection(mockCorrection);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleNewEssay = () => {
    setEssay('');
    setEssayTitle('');
    setCorrection(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  if (correction) {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <CheckCircle className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Correção Concluída!</h3>
              </div>
              <p className="text-green-100">Sua redação foi analisada pela nossa IA especializada</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{correction.score}/10</div>
              <div className="text-green-100">Nota Final</div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(correction.detailedAnalysis).map(([criteria, score]) => {
            const criteriaNames: { [key: string]: string } = {
              coherence: 'Coerência',
              cohesion: 'Coesão',
              grammar: 'Gramática',
              content: 'Conteúdo'
            };
            
            return (
              <div key={criteria} className="bg-white rounded-xl p-4 shadow-lg text-center">
                <h4 className="font-semibold text-gray-900 mb-2">{criteriaNames[criteria]}</h4>
                <div className={`text-3xl font-bold mb-2 ${getScoreColor(score)}`}>
                  {score}/10
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${(score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* General Feedback */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Feedback Geral</h4>
          <p className="text-gray-700 leading-relaxed">{correction.generalFeedback}</p>
        </div>

        {/* Strengths and Improvements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Pontos Fortes</h4>
            </div>
            <ul className="space-y-2">
              {correction.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-orange-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Pontos de Melhoria</h4>
            </div>
            <ul className="space-y-2">
              {correction.improvements.map((improvement, index) => (
                <li key={index} className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleNewEssay}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Nova Redação
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
            Salvar Correção
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <FileText className="w-8 h-8 text-purple-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Correção de Redação com IA</h3>
        </div>
        <p className="text-gray-600">
          Envie sua redação e receba uma análise detalhada com feedback personalizado, 
          nota e sugestões de melhoria baseadas nos critérios de correção dos principais concursos.
        </p>
      </div>

      {/* Essay Input */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título da Redação (opcional)
          </label>
          <input
            type="text"
            value={essayTitle}
            onChange={(e) => setEssayTitle(e.target.value)}
            placeholder="Ex: A importância da educação no desenvolvimento social"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Texto da Redação *
          </label>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            placeholder="Digite ou cole sua redação aqui. Recomendamos textos entre 20 e 30 linhas para uma análise mais precisa..."
            rows={15}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {essay.length} caracteres • {essay.split(' ').filter(word => word.length > 0).length} palavras
            </span>
            <button className="text-sm text-purple-600 hover:text-purple-700 flex items-center">
              <Upload className="w-4 h-4 mr-1" />
              Enviar arquivo
            </button>
          </div>
        </div>

        <button
          onClick={handleSubmitEssay}
          disabled={!essay.trim() || isAnalyzing}
          className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
            !essay.trim() || isAnalyzing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white transform hover:scale-105'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analisando sua redação...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <FileText className="w-5 h-5 mr-2" />
              Enviar para Correção
            </div>
          )}
        </button>
      </div>

      {/* Tips */}
      <div className="bg-purple-50 rounded-xl p-6">
        <h4 className="font-semibold text-purple-800 mb-3">💡 Dicas para uma boa redação:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="space-y-2 text-purple-700 text-sm">
            <li>• Mantenha a estrutura: introdução, desenvolvimento e conclusão</li>
            <li>• Use conectivos para ligar suas ideias</li>
            <li>• Apresente argumentos consistentes e exemplos</li>
            <li>• Revise gramática, ortografia e concordância</li>
          </ul>
          <ul className="space-y-2 text-purple-700 text-sm">
            <li>• Foque no tema proposto sem fugir do assunto</li>
            <li>• Proponha soluções viáveis na conclusão</li>
            <li>• Mantenha impessoalidade e formalidade</li>
            <li>• Respeite o limite de linhas quando especificado</li>
          </ul>
        </div>
      </div>

      {/* Previous Essays */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Redações Anteriores</h4>
        <div className="space-y-3">
          {[
            { title: 'A educação como ferramenta de transformação social', score: 8.5, date: '15/12/2024' },
            { title: 'Desafios da sustentabilidade urbana no Brasil', score: 7.2, date: '10/12/2024' },
            { title: 'O papel da tecnologia na democracia moderna', score: 6.8, date: '05/12/2024' },
          ].map((essay, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">{essay.title}</h5>
                <p className="text-sm text-gray-600">{essay.date}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreBackground(essay.score)} ${getScoreColor(essay.score)}`}>
                  {essay.score}/10
                </span>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
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

export default EssayCorrection;