import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './src/contexts/AuthContext';
import { Router } from './router';
import { ReviewScreen } from './src/screens/ReviewScreen';
import { SolicitationsScreen } from './src/screens/Solicitations';
import { TaskerEvaluationScreen } from './src/screens/TaskerEvaluation';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
