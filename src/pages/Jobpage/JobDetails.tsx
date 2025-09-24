
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
      <div id="job-notfound" style={{ textAlign: "center", padding: "50px" }}>
        <h1 id="job-notfound-title" style={{ fontSize: "3em", color: "#E64A19", marginBottom: "20px" }}>Job Not Found</h1>
        <Link to="/home" id="job-notfound-home-link" style={{ padding: "10px 20px", backgroundColor: "#FF8F00", color: "#000", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div id="job-details-page" style={{ padding: "20px", textAlign: "center" }}>
      <h1 id="job-details-title" style={{ fontSize: "3em", color: "#E64A19", marginBottom: "20px" }}>{job.role} at {job.company}</h1>
      
      <div id="job-details-info" style={{ maxWidth: "500px", margin: "0 auto", textAlign: "left", padding: "20px", border: "1px solid #FF8F00", borderRadius: "10px" }}>
        <p id="job-details-company"><strong>Company:</strong> {job.company}</p>
        <p id="job-details-role"><strong>Role:</strong> {job.role}</p>
        <p id="job-details-status"><strong>Status:</strong> {job.status}</p>
        <p id="job-details-date"><strong>Date Applied:</strong> {job.dateApplied}</p>
      </div>

      <Link to="/home" id="job-back-home" style={{ display: "inline-block", marginTop: "30px", padding: "10px 20px", backgroundColor: "#FF8F00", color: "#000", borderRadius: "5px", textDecoration: "none", fontWeight: "bold" }}>
        Back to Home
      </Link>
    </div>
  );
}
