import './Landing.css';
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section id="landingSec">
      <div id="landing-page">
        <header id="landing-header">
          <h1 id="landing-title">Job Application Tracker</h1>
        </header>

        <section id="landing-intro">
          <p id="landing-description">
            Keep track of all your job applications in one place. Manage applications, track their status, and never lose sight of your opportunities.
          </p>
        </section>

        <section id="landing-features">
          <h2 id="landing-features-title">What You Can Do</h2>
          <ul id="landing-features-list">
            <li>Add and manage your job applications</li>
            <li>Track status of each application</li>
            <li>Search, filter, and sort your jobs</li>
            <li>View detailed information for each job</li>
          </ul>
        </section>

        <section id="landing-actions">
          <Link to="/login" id="landing-login-link">Login</Link>
          <Link to="/register" id="landing-register-link">Get Started</Link>
        </section>
      </div>
    </section>
  );
}
