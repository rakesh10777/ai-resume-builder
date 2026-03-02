import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider, useProject } from './context/ProjectContext';
import Problem from './pages/rb/Problem';
import Market from './pages/rb/Market';
import Architecture from './pages/rb/Architecture';
import HLD from './pages/rb/HLD';
import LLD from './pages/rb/LLD';
import Build from './pages/rb/Build';
import Test from './pages/rb/Test';
import Ship from './pages/rb/Ship';
import Proof from './pages/rb/Proof';

function RouteGuard({ children }) {
  const { canNavigateToStep, currentStep, setCurrentStep, steps } = useProject();
  
  return children;
}

function AppRoutes() {
  const { setCurrentStep, steps } = useProject();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/rb/01-problem" replace />} />
      <Route 
        path="/rb/01-problem" 
        element={<ProblemWrapper stepNum={1} />} 
      />
      <Route 
        path="/rb/02-market" 
        element={<MarketWrapper stepNum={2} />} 
      />
      <Route 
        path="/rb/03-architecture" 
        element={<ArchitectureWrapper stepNum={3} />} 
      />
      <Route 
        path="/rb/04-hld" 
        element={<HLDWrapper stepNum={4} />} 
      />
      <Route 
        path="/rb/05-lld" 
        element={<LLDWrapper stepNum={5} />} 
      />
      <Route 
        path="/rb/06-build" 
        element={<BuildWrapper stepNum={6} />} 
      />
      <Route 
        path="/rb/07-test" 
        element={<TestWrapper stepNum={7} />} 
      />
      <Route 
        path="/rb/08-ship" 
        element={<ShipWrapper stepNum={8} />} 
      />
      <Route path="/rb/proof" element={<Proof />} />
    </Routes>
  );
}

function ProblemWrapper({ stepNum }) {
  const { setCurrentStep } = useProject();
  setCurrentStep(stepNum);
  return <Problem />;
}

function MarketWrapper({ stepNum }) {
  const { setCurrentStep } = useProject();
  setCurrentStep(stepNum);
  return <Market />;
}

function ArchitectureWrapper({ stepNum }) {
  const { setCurrentStep } = useProject();
  setCurrentStep(stepNum);
  return <Architecture />;
}

function HLDWrapper({ stepNum }) {
  const { setCurrentStep } = useProject();
  setCurrentStep(stepNum);
  return <HLD />;
}

function LLDWrapper({ stepNum }) {
  const { setCurrentStep } = useProject();
  setCurrentStep(stepNum);
  return <LLD />;
}

function BuildWrapper({ stepNum }) {
  const { setCurrentStep } = useProject();
  setCurrentStep(stepNum);
  return <Build />;
}

function TestWrapper({ stepNum }) {
  const { setCurrentStep } = useProject();
  setCurrentStep(stepNum);
  return <Test />;
}

function ShipWrapper({ stepNum }) {
  const { setCurrentStep } = useProject();
  setCurrentStep(stepNum);
  return <Ship />;
}

function App() {
  return (
    <BrowserRouter>
      <ProjectProvider>
        <AppRoutes />
      </ProjectProvider>
    </BrowserRouter>
  );
}

export default App;
