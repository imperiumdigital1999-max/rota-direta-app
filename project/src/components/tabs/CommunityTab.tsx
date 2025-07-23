import React from 'react';
import { MessageCircle, Users, ExternalLink, Zap } from 'lucide-react';

const CommunityTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Main Community Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center">
        <div className="mb-6">
          <MessageCircle className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Comunidade Rota Direta</h2>
          <p className="text-green-100 text-lg">
            Conecte-se com milhares de concurseiros em busca da aprovação
          </p>
        </div>
        
        <div className="bg-white/10 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">2.847</div>
              <div className="text-green-100">Membros Ativos</div>
            </div>
            <div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-green-100">Aprovados em 2024</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-green-100">Suporte Ativo</div>
            </div>
          </div>
        </div>

        <a
          href="https://chat.whatsapp.com/exemplo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Entrar no Grupo Oficial
          <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </div>

      {/* Community Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Grupos de Estudo</h3>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Grupos por área de concurso
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Discussões sobre editais
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Troca de materiais de estudo
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Motivação e apoio mútuo
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center mb-4">
            <Zap className="w-8 h-8 text-yellow-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Benefícios Exclusivos</h3>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              Avisos sobre novos concursos
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              Dicas de professores especialistas
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              Sessões de perguntas e respostas
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
              Histórias de sucesso
            </li>
          </ul>
        </div>
      </div>

      {/* Rules and Guidelines */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Diretrizes da Comunidade</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2 text-green-600">✅ Permitido</h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>• Discussões sobre estudos e concursos</li>
              <li>• Compartilhamento de materiais gratuitos</li>
              <li>• Dúvidas sobre disciplinas</li>
              <li>• Motivação e apoio aos colegas</li>
              <li>• Divulgação de concursos oficiais</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2 text-red-600">❌ Não Permitido</h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>• Spam ou mensagens promocionais</li>
              <li>• Conteúdo ofensivo ou inadequado</li>
              <li>• Venda de materiais pirateados</li>
              <li>• Discussões políticas ou religiosas</li>
              <li>• Flood de mensagens</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Success Stories Preview */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Histórias de Sucesso Recentes</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <p className="text-gray-700 italic mb-2">
              "Graças ao apoio da comunidade e às ferramentas do app, consegui minha aprovação no TRT! 
              Obrigada a todos que me ajudaram durante essa jornada."
            </p>
            <p className="text-sm text-green-600 font-medium">— Maria S., aprovada no TRT-SP</p>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <p className="text-gray-700 italic mb-2">
              "O grupo foi fundamental na minha preparação. As dicas dos colegas e o cronograma 
              personalizado fizeram toda a diferença!"
            </p>
            <p className="text-sm text-blue-600 font-medium">— João P., aprovado na Receita Federal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityTab;