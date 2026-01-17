import { useState, useEffect, useContext } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { ToastContext } from "../../Context/ToastContext";
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
  const { showToast } = useContext(ToastContext);
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

  useEffect(() => {
    if (user) {
      const storedJobs = localStorage.getItem(`jobs_${user}`);
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      } else {
        setJobs([]);
      }
    } else {
      setJobs([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`jobs_${user}`, JSON.stringify(jobs));
    }
  }, [jobs, user]);

  const handleAddOrUpdateJob = () => {
    if (!company.trim() || !role.trim() || !dateApplied) {
      showToast("Please fill in all fields", "error");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      if (editingJobId !== null) {
        setJobs(prev =>
          prev.map(job =>
            job.id === editingJobId ? { ...job, company, role, status, dateApplied } : job
          )
        );
        setEditingJobId(null);
        showToast("Job updated successfully", "success");
      } else {
        const newJob: Job = {
          id: jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1,
          company,
          role,
          status,
          dateApplied,
        };
        setJobs([...jobs, newJob]);
        showToast("Job added successfully", "success");
      }

      setCompany("");
      setRole("");
      setStatus("Applied");
      setDateApplied("");
      setLoading(false);
    }, 500);
  };

  const deleteJob = (id: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter(job => job.id !== id));
      if (editingJobId === id) {
        setEditingJobId(null);
        setCompany("");
        setRole("");
        setStatus("Applied");
        setDateApplied("");
      }
      showToast("Job deleted", "info");
    }
  };

  const editJob = (job: Job) => {
    setCompany(job.company);
    setRole(job.role);
    setStatus(job.status);
    setDateApplied(job.dateApplied);
    setEditingJobId(job.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingJobId(null);
    setCompany("");
    setRole("");
    setStatus("Applied");
    setDateApplied("");
  };

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

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "info");
    navigate("/login");
  };

  return (
    <section id="home-container">
      <div id="home-page">
        <header>
          <h1>Your Jobs</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout ({user})
          </button>
        </header>

        <div id="add-job-form">
          <h2>{editingJobId !== null ? "Edit Job" : "Add New Job"}</h2>
          <div className="form-row">
            <input
              placeholder="Company name"
              value={company}
              onChange={e => setCompany(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddOrUpdateJob()}
            />
            <input
              placeholder="Job role"
              value={role}
              onChange={e => setRole(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddOrUpdateJob()}
            />
            <input
              type="date"
              value={dateApplied}
              onChange={e => setDateApplied(e.target.value)}
            />
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="form-actions">
            <button
              onClick={handleAddOrUpdateJob}
              disabled={loading}
              className="primary-btn"
            >
              {editingJobId !== null ? "Update Job" : "Add Job"}
              {loading && <Loader />}
            </button>
            {editingJobId !== null && (
              <button onClick={cancelEdit} className="secondary-btn">
                Cancel
              </button>
            )}
          </div>
        </div>

        <div id="search-filter-sort">
          <h3>Filter & Search</h3>
          <div className="filter-row">
            <input
              placeholder="Search by company or role"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select value={filterStatus} onChange={handleFilterChange}>
              <option value="">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewed">Interviewed</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="">No Sort</option>
              <option value="asc">Date: Oldest First</option>
              <option value="desc">Date: Newest First</option>
            </select>
          </div>
        </div>

        <div id="jobs-list">
          {displayedJobs.length === 0 ? (
            <div className="empty-state">
              <p>{jobs.length === 0 ? "No jobs yet. Add your first job application!" : "No jobs match your filters."}</p>
            </div>
          ) : (
            displayedJobs.map(job => (
              <div key={job.id} className="job-card">
                <Link to={`/jobs/${job.id}`} className="job-link">
                  <div className="job-header">
                    <h4>{job.company}</h4>
                    <span className={`status-badge status-${job.status.toLowerCase()}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="job-role">{job.role}</p>
                  <p className="job-date">Applied: {new Date(job.dateApplied).toLocaleDateString()}</p>
                </Link>
                <div className="job-actions">
                  <button onClick={() => editJob(job)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => deleteJob(job.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
