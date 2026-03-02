import TopBar from './TopBar';
import ContextHeader from './ContextHeader';
import BuildPanel from './BuildPanel';
import ProofFooter from './ProofFooter';

export default function PremiumLayout({ children }) {
  return (
    <div className="premium-layout">
      <TopBar />
      <ContextHeader />
      <div className="main-container">
        <div className="main-workspace">
          {children}
        </div>
        <div className="secondary-build-panel">
          <BuildPanel />
        </div>
      </div>
      <ProofFooter />
    </div>
  );
}
