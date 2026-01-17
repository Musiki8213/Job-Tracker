import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import './JobDetails.css';

type Job = {
  id: number;
  company: string;
  role: string;
  status: string;
  dateApplied: string;
};

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && id) {
      const storedJobs = localStorage.getItem(`jobs_${user}`);
      if (storedJobs) {
        const jobsArray: Job[] = JSON.parse(storedJobs);
        const foundJob = jobsArray.find(job => job.id === parseInt(id));
        setJob(foundJob || null);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id, user]);

  if (loading) {
    return (
      <section id="job-details-container">
        <div id="job-details-page">
          <div className="loading-state">Loading...</div>
        </div>
      </section>
    );
  }

  if (!job) {
    return (
      <section id="job-details-container">
        <div id="job-notfound">
          <h1 id="job-notfound-title">Job Not Found</h1>
          <p>The job you're looking for doesn't exist or has been deleted.</p>
          <Link to="/home" id="job-notfound-home-link">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section id="job-details-container">
      <div id="job-details-page">
        <div className="job-details-header">
          <h1 id="job-details-title">
            {job.role}
          </h1>
          <span className={`status-badge status-${job.status.toLowerCase()}`}>
            {job.status}
          </span>
        </div>
        
        <div id="job-details-info">
          <div className="detail-item">
            <span className="detail-label">Company</span>
            <span className="detail-value">{job.company}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Role</span>
            <span className="detail-value">{job.role}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className="detail-value">{job.status}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Date Applied</span>
            <span className="detail-value">
              {new Date(job.dateApplied).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        <Link to="/home" id="job-back-home">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
