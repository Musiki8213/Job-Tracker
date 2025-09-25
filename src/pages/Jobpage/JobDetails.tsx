import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs && id) {
      const jobsArray: Job[] = JSON.parse(storedJobs);
      const foundJob = jobsArray.find(job => job.id === parseInt(id));
      setJob(foundJob || null);
    }
  }, [id]);

  if (!job) {
    return (
      <div id="job-notfound">
        <h1 id="job-notfound-title">Job Not Found</h1>
        <Link to="/home" id="job-notfound-home-link">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <section id="job-details-container">
    <div id="job-details-page">
      <h1 id="job-details-title">
        {job.role} at {job.company}
      </h1>
      
      <div id="job-details-info">
        <p id="job-details-company"><strong>Company:</strong> {job.company}</p>
        <p id="job-details-role"><strong>Role:</strong> {job.role}</p>
        <p id="job-details-status"><strong>Status:</strong> {job.status}</p>
        <p id="job-details-date"><strong>Date Applied:</strong> {job.dateApplied}</p>
      </div>

      <Link to="/home" id="job-back-home">
        Back to Home
      </Link>
    </div>
    </section>
  );
}
