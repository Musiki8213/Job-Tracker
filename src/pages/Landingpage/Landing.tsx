
import './Landing.css'
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div id="landing-page" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "20px", textAlign: "center" }}>
      
      <header id="landing-header" style={{ marginBottom: "30px" }}>
        <h1 id="landing-title" style={{ fontSize: "3em", color: "#E64A19", letterSpacing: "2px", marginBottom: "10px" }}>
          Job Application Tracker
        </h1>
      </header>

      <section id="landing-intro" style={{ marginBottom: "40px", maxWidth: "800px" }}>
        <p id="landing-description" style={{ fontSize: "1.2em", lineHeight: "1.6", color: "#000000" }}>
          Welcome! This app helps you track the jobs you’ve applied for, so you can see which ones are successful, pending, or rejected.
        </p>
      </section>

      <section id="landing-features" style={{ marginBottom: "40px", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 id="landing-features-title" style={{ fontSize: "2em", color: "#E64A19", marginBottom: "20px" }}>Features:</h2>
        <ul id="landing-features-list" style={{ listStyle: "none", padding: 0 }}>
          <li id="feature-1" style={{ fontSize: "1.1em", marginBottom: "10px", paddingLeft: "25px", position: "relative" }}>Add and manage your job applications</li>
          <li id="feature-2" style={{ fontSize: "1.1em", marginBottom: "10px", paddingLeft: "25px", position: "relative" }}>Track status of applications (Applied, Interviewed, Rejected)</li>
          <li id="feature-3" style={{ fontSize: "1.1em", marginBottom: "10px", paddingLeft: "25px", position: "relative" }}>Search, filter, and sort jobs</li>
          <li id="feature-4" style={{ fontSize: "1.1em", marginBottom: "10px", paddingLeft: "25px", position: "relative" }}>View detailed information for each job</li>
        </ul>
      </section>

      {/* Navigation buttons */}
      <section id="landing-actions" style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
        <Link to="/login" id="landing-login-link" style={{ padding: "10px 20px", backgroundColor: "#FF8F00", color: "#000", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" }}>
          Login
        </Link>
        <Link to="/register" id="landing-register-link" style={{ padding: "10px 20px", backgroundColor: "#FF8F00", color: "#000", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" }}>
          Register
        </Link>
      </section>

      <footer id="landing-footer" style={{ marginTop: "30px" }}>
        <p id="landing-footer-text" style={{ fontSize: "1.1em", color: "#FF8F00", fontWeight: "bold" }}>
          Get started by logging in or registering above!
        </p>
      </footer>
    </div>
  );
}
