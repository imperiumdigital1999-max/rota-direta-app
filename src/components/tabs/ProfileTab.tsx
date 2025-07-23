import React, { useState } from 'react';
import { User, Target, Clock, TrendingUp, Edit, Save, X, Camera } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const ProfileTab: React.FC = () => {
  const { profile, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    targetContest: profile.targetContest,
    studyHoursPerDay: profile.studyHoursPerDay,
  });

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      targetContest: profile.targetContest,
      studyHoursPerDay: profile.studyHoursPerDay,
    });
    setIsEditing(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLevelText = (level: number) => {
    if (level === 0) return 'Não avaliado';
    if (level <= 3) return 'Iniciante';
    if (level <= 6) return 'Básico';
    if (level <= 8) return 'Intermediário';
    return 'Avançado';
  };

  const getLevelColor = (level: number) => {
    if (level === 0) return 'bg-gray-100 text-gray-600';
    if (level <= 3) return 'bg-red-100 text-red-600';
    if (level <= 6) return 'bg-yellow-100 text-yellow-600';
    if (level <= 8) return 'bg-blue-100 text-blue-600';
    return 'bg-green-100 text-green-600';
  };

  const accuracyPercentage = profile.progress.solvedQuestions > 0 
    ? Math.round((profile.progress.correctAnswers / profile.progress.solvedQuestions) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8" />
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera className="w-3 h-3 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-blue-100">{profile.email || 'Email não informado'}</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Editar</span>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{profile.targetContest || 'Concurso não definido'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>{profile.studyHoursPerDay}h de estudo/dia</span>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Editar Perfil</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Salvar</span>
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg flex items-center space-x-2 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Concurso Alvo</label>
              <input
                type="text"
                value={editForm.targetContest}
                onChange={(e) => setEditForm({ ...editForm, targetContest: e.target.value })}
                placeholder="Ex: Receita Federal, TRT, Polícia Civil..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horas de Estudo/Dia</label>
              <select
                value={editForm.studyHoursPerDay}
                onChange={(e) => setEditForm({ ...editForm, studyHoursPerDay: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={2}>2 horas</option>
                <option value={3}>3 horas</option>
                <option value={4}>4 horas</option>
                <option value={5}>5 horas</option>
                <option value={6}>6 horas</option>
                <option value={8}>8 horas</option>
                <option value={10}>10 horas</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{accuracyPercentage}%</div>
          <div className="text-gray-600 text-sm">Taxa de Acerto</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-2xl font-bold text-green-600">{profile.progress.completedLessons}</div>
          <div className="text-gray-600 text-sm">Aulas Concluídas</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{profile.progress.simulationsCompleted}</div>
          <div className="text-gray-600 text-sm">Simulados</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{profile.progress.essaysGraded}</div>
          <div className="text-gray-600 text-sm">Redações</div>
        </div>
      </div>

      {/* Level Assessment Results */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Nível por Disciplina</h3>
        <div className="space-y-4">
          {Object.entries(profile.level).map(([subject, level]) => {
            const subjectNames: { [key: string]: string } = {
              portuguese: 'Português',
              math: 'Matemática',
              logic: 'Raciocínio Lógico',
              law: 'Direito',
              generalKnowledge: 'Conhecimentos Gerais'
            };
            
            return (
              <div key={subject} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{subjectNames[subject]}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}>
                      {getLevelText(level)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(level / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 <strong>Dica:</strong> Foque nas disciplinas com menor nível para melhorar seu desempenho geral. 
            Use o Avaliador de Nivelamento para atualizar seus dados.
          </p>
        </div>
      </div>

      {/* Study Progress */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Progresso dos Estudos</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Aulas Assistidas</span>
              <span>{profile.progress.completedLessons} de {profile.progress.totalLessons}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(profile.progress.completedLessons / profile.progress.totalLessons) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Questões Respondidas</span>
              <span>{profile.progress.solvedQuestions} questões</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((profile.progress.solvedQuestions / 500) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;