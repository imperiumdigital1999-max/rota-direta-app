import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserProfile {
  name: string;
  email: string;
  targetContest: string;
  studyHoursPerDay: number;
  level: {
    portuguese: number;
    math: number;
    logic: number;
    law: number;
    generalKnowledge: number;
  };
  progress: {
    completedLessons: number;
    totalLessons: number;
    solvedQuestions: number;
    correctAnswers: number;
    simulationsCompleted: number;
    essaysGraded: number;
  };
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateProgress: (updates: Partial<UserProfile['progress']>) => void;
}

const defaultProfile: UserProfile = {
  name: 'Estudante',
  email: '',
  targetContest: '',
  studyHoursPerDay: 4,
  level: {
    portuguese: 0,
    math: 0,
    logic: 0,
    law: 0,
    generalKnowledge: 0,
  },
  progress: {
    completedLessons: 15,
    totalLessons: 120,
    solvedQuestions: 245,
    correctAnswers: 180,
    simulationsCompleted: 3,
    essaysGraded: 8,
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const updateProgress = (updates: Partial<UserProfile['progress']>) => {
    setProfile(prev => ({
      ...prev,
      progress: { ...prev.progress, ...updates }
    }));
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, updateProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};