import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Builder from './pages/builder/Builder';
import Preview from './pages/Preview';
import Proof from './pages/Proof';

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={
            <>
              <Navigation />
              <Builder />
            </>
          } />
          <Route path="/preview" element={
            <>
              <Navigation />
              <Preview />
            </>
          } />
          <Route path="/proof" element={
            <>
              <Navigation />
              <Proof />
            </>
          } />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
