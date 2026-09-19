import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        // Iteration 7: Use specialized endpoint if filtering, otherwise fetch all
        const url =
          filterType === "All" ? "/api/jobs" : `/api/jobs/type/${filterType}`;

        const res = await fetch(url);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filterType]);

  if (loading) return <h2>Loading jobs...</h2>;

  return (
    <div>
      <h1>Job Listings</h1>

      {/* Iteration 7: Filter Jobs */}
      <div style={{ marginBottom: "20px" }}>
        <label>Filter by Type: </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="job-card"
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <h3>{job.title}</h3>
              <p>
                <strong>Type:</strong> {job.type}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Salary:</strong> ${job.salary}
              </p>
              <Link to={`/jobs/${job.id}`}>View Job Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
