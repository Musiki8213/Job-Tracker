import './Landing.css'
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <section id="landingSec">
      <div id="landing-page">
        
        <header id="landing-header">
          <h1 id="landing-title">
            Job Application Tracker
          </h1>
        </header>

        <section id="landing-intro">
          <p id="landing-description">
            Welcome! This app helps you track the jobs you’ve applied for, so you can see which ones are successful, pending, or rejected.
          </p>
        </section>

        <section id="landing-features">
          <h2 id="landing-features-title">Features:</h2>
          <ul id="landing-features-list">
            <li id="feature-1">Add and manage your job applications</li>
            <li id="feature-2">Track status of applications</li>
            <li id="feature-3">Search, filter, and sort jobs</li>
            <li id="feature-4">View detailed information for each job</li>
          </ul>
        </section>

        {/* Navigation buttons */}
        <section id="landing-actions">
          <Link to="/login" id="landing-login-link">
            Login
          </Link>
          <Link to="/register" id="landing-register-link">
            Register
          </Link>
        </section>

      </div>
    </section>
  );
}
