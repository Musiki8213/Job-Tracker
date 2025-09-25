import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext"; 
import Loader from "../../Components/Loader";   
import './Home.css';

type Job = {
  id: number;
  company: string;
  role: string;
  status: string;
  dateApplied: string;
};

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [dateApplied, setDateApplied] = useState("");
  const [editingJobId, setEditingJobId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const filterStatus = searchParams.get("status") || "";
  const sortOrder = searchParams.get("sort") || "";

  // Load jobs for the current user whenever the component mounts or user changes
  useEffect(() => {
    if (user) {
      const storedJobs = localStorage.getItem(`jobs_${user}`);
      if (storedJobs) setJobs(JSON.parse(storedJobs));
      else setJobs([]); 
    } else {
      setJobs([]); 
    }
  }, [user]);

  // Save jobs to LocalStorage whenever jobs change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`jobs_${user}`, JSON.stringify(jobs));
    }
  }, [jobs, user]);

  // Add or Update job
  const handleAddOrUpdateJob = () => {
    if (!company || !role || !dateApplied) return;
    setLoading(true);

    setTimeout(() => {
      if (editingJobId !== null) {
        // Update job
        setJobs(prev =>
          prev.map(job =>
            job.id === editingJobId ? { ...job, company, role, status, dateApplied } : job
          )
        );
        setEditingJobId(null);
      } else {
        // Add new job
        const newJob: Job = {
          id: jobs.length > 0 ? jobs[jobs.length - 1].id + 1 : 1,
          company,
          role,
          status,
          dateApplied,
        };
        setJobs([...jobs, newJob]);
      }

      setCompany("");
      setRole("");
      setStatus("Applied");
      setDateApplied("");
      setLoading(false);
    }, 500);
  };

  const deleteJob = (id: number) => {
    setJobs(jobs.filter(job => job.id !== id));
    if (editingJobId === id) setEditingJobId(null);
  };

  const editJob = (job: Job) => {
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setDateApplied(job.dateApplied);
    setEditingJobId(job.id);
  };

  // Search / Filter / Sort
  let displayedJobs = jobs.filter(job => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus ? job.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  if (sortOrder) {
    displayedJobs = displayedJobs.sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams(prev => {
      if (value) prev.set("search", value);
      else prev.delete("search");
      return prev;
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams(prev => {
      if (value) prev.set("status", value);
      else prev.delete("status");
      return prev;
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSearchParams(prev => {
      if (value) prev.set("sort", value);
      else prev.delete("sort");
      return prev;
    });
  };

  return (
    <section id="home-container">
    <div id="home-page" style={{ padding: "20px", textAlign: "center" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Your Jobs</h1>
        <button onClick={() => { logout(); navigate("/login"); }} style={{ cursor: "pointer" }}>
          Logout ({user})
        </button>
      </header>

      {/* Add / Edit Job Form */}
      <div id="add-job-form" style={{ marginBottom: "20px" }}>
        <input placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} />
        <input placeholder="Role" value={role} onChange={e => setRole(e.target.value)} />
        <input type="date" value={dateApplied} onChange={e => setDateApplied(e.target.value)} />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={handleAddOrUpdateJob} disabled={loading} style={{ cursor: "pointer" }}>
          {editingJobId !== null ? "Update Job" : "Add Job"}
          {loading && <Loader />}
        </button>
      </div>

      {/* Search / Filter / Sort */}
      <div id="search-filter-sort" style={{ marginBottom: "20px" }}>
        <input placeholder="Search by company or role" value={searchQuery} onChange={handleSearchChange} />
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="">No Sort</option>
          <option value="asc">Date Ascending</option>
          <option value="desc">Date Descending</option>
        </select>
      </div>

      {/* Jobs List */}
  <div id="jobs-list">
  {displayedJobs.map(job => (
    <div key={job.id} id={`job-${job.id}`}>
      <Link to={`/jobs/${job.id}`} id={`job-link-${job.id}`}>
        <p id={`job-company-${job.id}`}><strong>Company:</strong> {job.company}</p>
        <p id={`job-role-${job.id}`}><strong>Role:</strong> {job.role}</p>
        <p id={`job-status-${job.id}`}><strong>Status:</strong> {job.status}</p>
        <p id={`job-date-${job.id}`}><strong>Date Applied:</strong> {job.dateApplied}</p>
      </Link>
      <div>
        <button id={`edit-job-${job.id}`} onClick={() => editJob(job)}>
          Edit
        </button>
        <button id={`delete-job-${job.id}`} onClick={() => deleteJob(job.id)}>
          Delete
        </button>
      </div>
    </div>
  ))}
</div>

      
    </div>
     </section>
   
  );
}
