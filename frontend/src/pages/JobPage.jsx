import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const onDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!job) return <h2>Job not found</h2>;

  return (
    <div>
      <Link to="/">Back to Jobs</Link>
      <h2>{job.title}</h2>
      <p>
        <strong>Type:</strong> {job.type}
      </p>
      <p>
        <strong>Description:</strong> {job.description}
      </p>
      <p>
        <strong>Location:</strong> {job.location}
      </p>
      <p>
        <strong>Salary:</strong> ${job.salary}
      </p>

      <div
        style={{ border: "1px solid #eee", padding: "10px", marginTop: "10px" }}
      >
        <h3>Company Information</h3>
        <p>
          <strong>Name:</strong> {job.company.name}
        </p>
        <p>
          <strong>Email:</strong> {job.company.contactEmail}
        </p>
        <p>
          <strong>Phone:</strong> {job.company.contactPhone}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/edit-job/${job.id}`}>
          <button style={{ marginRight: "10px" }}>Edit Job</button>
        </Link>
        <button
          onClick={onDeleteClick}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete Job
        </button>
      </div>
    </div>
  );
};

export default JobPage;
