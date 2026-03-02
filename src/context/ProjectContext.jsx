import { createContext, useContext, useState, useCallback } from 'react';

const ProjectContext = createContext(null);

const STEPS = [
  { path: '/rb/01-problem', title: 'Problem', num: 1 },
  { path: '/rb/02-market', title: 'Market', num: 2 },
  { path: '/rb/03-architecture', title: 'Architecture', num: 3 },
  { path: '/rb/04-hld', title: 'HLD', num: 4 },
  { path: '/rb/05-lld', title: 'LLD', num: 5 },
  { path: '/rb/06-build', title: 'Build', num: 6 },
  { path: '/rb/07-test', title: 'Test', num: 7 },
  { path: '/rb/08-ship', title: 'Ship', num: 8 },
];

export function ProjectProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [artifacts, setArtifacts] = useState({});
  const [buildStatus, setBuildStatus] = useState({});
  const [proofData, setProofData] = useState({
    lovablesUrl: '',
    githubUrl: '',
    deployUrl: '',
  });

  const setArtifact = useCallback((step, artifact) => {
    setArtifacts(prev => ({ ...prev, [`rb_step_${step}_artifact`]: artifact }));
  }, []);

  const getArtifact = useCallback((step) => {
    return artifacts[`rb_step_${step}_artifact`] || null;
  }, [artifacts]);

  const setStepBuildStatus = useCallback((step, status) => {
    setBuildStatus(prev => ({ ...prev, [step]: status }));
  }, []);

  const getStepBuildStatus = useCallback((step) => {
    return buildStatus[step] || null;
  }, [buildStatus]);

  const canProceed = useCallback((step) => {
    return getArtifact(step) !== null;
  }, [getArtifact]);

  const canNavigateToStep = useCallback((targetStep) => {
    if (targetStep === 1) return true;
    for (let i = 1; i < targetStep; i++) {
      if (getArtifact(i) === null) return false;
    }
    return true;
  }, [getArtifact]);

  const value = {
    currentStep,
    setCurrentStep,
    steps: STEPS,
    setArtifact,
    getArtifact,
    setStepBuildStatus,
    getStepBuildStatus,
    canProceed,
    canNavigateToStep,
    proofData,
    setProofData,
    isProofPage: false,
    setIsProofPage: () => {},
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
