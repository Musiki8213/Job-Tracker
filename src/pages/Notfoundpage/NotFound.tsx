import { Link } from "react-router-dom";
import './NotFound.css';

export default function NotFound() {
  return (
    <section id="notfound-container">
      <div id="notfound-page">
        <h1 id="notfound-title">404</h1>
        <p id="notfound-message">Oops! This page doesn't exist.</p>
        <Link to="/" id="notfound-home-link">
          Go to Landing Page
        </Link>
      </div>
    </section>
  );
}
