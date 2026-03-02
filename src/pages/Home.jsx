import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="hero-headline">Build a Resume That Gets Read.</h1>
        <p className="hero-subheadline">
          Create professional, ATS-friendly resumes in minutes with AI-powered suggestions.
        </p>
        <Link to="/builder" className="cta-button">
          Start Building
        </Link>
      </div>
    </div>
  );
}
