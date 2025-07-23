import React, { useState } from 'react';
import { Search, MapPin, Users, DollarSign, Calendar, ExternalLink, Filter } from 'lucide-react';

interface Contest {
  id: number;
  title: string;
  organization: string;
  board: string;
  salary: string;
  positions: number;
  location: string;
  registrationDeadline: string;
  examDate: string;
  status: 'open' | 'closing-soon' | 'closed';
  subjects: string[];
  link: string;
}

const ContestPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedBoard, setSelectedBoard] = useState('all');

  const contests: Contest[] = [
    {
      id: 1,
      title: 'Auditor Fiscal da Receita Federal',
      organization: 'Receita Federal do Brasil',
      board: 'ESAF',
      salary: 'R$ 21.029,00',
      positions: 230,
      location: 'Nacional',
      registrationDeadline: '15/01/2025',
      examDate: '15/03/2025',
      status: 'open',
      subjects: ['Português', 'Matemática', 'Direito', 'Contabilidade'],
      link: 'https://www.gov.br/receitafederal'
    },
    {
      id: 2,
      title: 'Técnico Judiciário - TRT 3ª Região',
      organization: 'Tribunal Regional do Trabalho',
      board: 'FCC',
      salary: 'R$ 8.529,00',
      positions: 45,
      location: 'Minas Gerais',
      registrationDeadline: '20/12/2024',
      examDate: '25/02/2025',
      status: 'closing-soon',
      subjects: ['Português', 'Matemática', 'Direito', 'Informática'],
      link: 'https://www.trt3.jus.br'
    },
    {
      id: 3,
      title: 'Analista do Seguro Social - INSS',
      organization: 'Instituto Nacional do Seguro Social',
      board: 'CEBRASPE',
      salary: 'R$ 12.522,00',
      positions: 1000,
      location: 'Nacional',
      registrationDeadline: '10/01/2025',
      examDate: '10/03/2025',
      status: 'open',
      subjects: ['Português', 'Raciocínio Lógico', 'Direito Previdenciário'],
      link: 'https://www.gov.br/inss'
    },
    {
      id: 4,
      title: 'Escrivão de Polícia Civil - SP',
      organization: 'Polícia Civil de São Paulo',
      board: 'VUNESP',
      salary: 'R$ 9.681,00',
      positions: 150,
      location: 'São Paulo',
      registrationDeadline: '05/01/2025',
      examDate: '20/02/2025',
      status: 'open',
      subjects: ['Português', 'Matemática', 'Direito', 'Conhecimentos Gerais'],
      link: 'https://www.policiacivil.sp.gov.br'
    },
    {
      id: 5,
      title: 'Analista Judiciário - TJ-RJ',
      organization: 'Tribunal de Justiça do Rio de Janeiro',
      board: 'FGV',
      salary: 'R$ 13.471,00',
      positions: 80,
      location: 'Rio de Janeiro',
      registrationDeadline: '30/12/2024',
      examDate: '05/03/2025',
      status: 'closing-soon',
      subjects: ['Português', 'Direito', 'Conhecimentos Gerais'],
      link: 'https://www.tjrj.jus.br'
    }
  ];

  const boards = [
    { id: 'all', name: 'Todas as Bancas' },
    { id: 'ESAF', name: 'ESAF' },
    { id: 'FCC', name: 'FCC' },
    { id: 'CEBRASPE', name: 'CESPE/CEBRASPE' },
    { id: 'VUNESP', name: 'VUNESP' },
    { id: 'FGV', name: 'FGV' },
  ];

  const filteredContests = contests.filter(contest => {
    const matchesSearch = contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contest.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || contest.status === selectedFilter;
    const matchesBoard = selectedBoard === 'all' || contest.board === selectedBoard;
    
    return matchesSearch && matchesFilter && matchesBoard;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-700 border-green-200';
      case 'closing-soon': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'closed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Inscrições Abertas';
      case 'closing-soon': return 'Encerrando em Breve';
      case 'closed': return 'Inscrições Encerradas';
      default: return 'Status Indefinido';
    }
  };

  const formatSalary = (salary: string) => {
    return salary.replace('R$', 'R$ ');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Concursos Abertos</h3>
            <p className="text-indigo-100">
              Acompanhe as oportunidades mais recentes em tempo real
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{contests.filter(c => c.status === 'open').length}</div>
            <div className="text-indigo-100">Abertos</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar concursos, órgãos ou locais..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">Todos os Status</option>
                <option value="open">Inscrições Abertas</option>
                <option value="closing-soon">Encerrando em Breve</option>
                <option value="closed">Encerradas</option>
              </select>
            </div>
            
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {boards.map((board) => (
                <option key={board.id} value={board.id}>
                  {board.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Contest Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {contests.filter(c => c.status === 'open').length}
          </div>
          <div className="text-gray-600 text-sm">Inscrições Abertas</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-orange-600">
            {contests.filter(c => c.status === 'closing-soon').length}
          </div>
          <div className="text-gray-600 text-sm">Encerrando em Breve</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-blue-600">
            {contests.reduce((sum, c) => sum + c.positions, 0)}
          </div>
          <div className="text-gray-600 text-sm">Total de Vagas</div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {contests.length}
          </div>
          <div className="text-gray-600 text-sm">Concursos Listados</div>
        </div>
      </div>

      {/* Contest List */}
      <div className="space-y-6">
        {filteredContests.map((contest) => (
          <div key={contest.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-xl font-semibold text-gray-900">{contest.title}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(contest.status)}`}>
                    {getStatusText(contest.status)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{contest.organization}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="font-medium">Banca:</span>
                  <span>{contest.board}</span>
                </div>
              </div>
              
              <a
                href={contest.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Ver Edital
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">Salário</div>
                  <div className="font-semibold text-gray-900">{formatSalary(contest.salary)}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">Vagas</div>
                  <div className="font-semibold text-gray-900">{contest.positions}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-sm text-gray-600">Local</div>
                  <div className="font-semibold text-gray-900">{contest.location}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-600">Inscrições até</div>
                  <div className="font-semibold text-gray-900">{contest.registrationDeadline}</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h5 className="font-medium text-gray-900 mb-2">Principais Disciplinas:</h5>
              <div className="flex flex-wrap gap-2">
                {contest.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-700">
                  📅 <strong>Data da Prova:</strong> {contest.examDate}
                </span>
                <button
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() => {
                    // This would navigate to the study plan tool with this contest selected
                    console.log(`Ver o que cai no concurso: ${contest.title}`);
                  }}
                >
                  Ver o que cai →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContests.length === 0 && (
        <div className="bg-white rounded-xl p-12 shadow-lg text-center">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum concurso encontrado</h3>
          <p className="text-gray-600">Tente ajustar os filtros ou termo de busca.</p>
        </div>
      )}

      {/* Update Notice */}
      <div className="bg-blue-50 rounded-xl p-4">
        <p className="text-blue-800 text-sm">
          💡 <strong>Atualização automática:</strong> Esta lista é atualizada diariamente com as informações mais recentes dos principais órgãos e organizadoras de concursos.
        </p>
      </div>
    </div>
  );
};

export default ContestPanel;