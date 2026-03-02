import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="top-nav">
      <div className="nav-brand">AI Resume Builder</div>
      <div className="nav-links">
        <NavLink to="/builder" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Builder
        </NavLink>
        <NavLink to="/preview" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Preview
        </NavLink>
        <NavLink to="/proof" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Proof
        </NavLink>
      </div>
    </nav>
  );
}
