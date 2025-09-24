
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div id="notfound-page" style={{ textAlign: "center", padding: "50px" }}>
      <h1 id="notfound-title" style={{ fontSize: "4em", color: "#E64A19", marginBottom: "20px" }}>404</h1>
      <p id="notfound-message" style={{ fontSize: "1.5em", marginBottom: "30px" }}>Oops! Page not found.</p>
      <Link to="/" id="notfound-home-link" style={{ padding: "10px 20px", backgroundColor: "#FF8F00", color: "#000", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" }}>
        Go to Landing Page
      </Link>
    </div>
  );
}
