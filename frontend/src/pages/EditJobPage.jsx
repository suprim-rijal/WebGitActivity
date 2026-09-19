import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();

        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setLocation(data.location);
        setSalary(data.salary);
        setCompanyName(data.company.name);
        setContactEmail(data.company.contactEmail);
        setContactPhone(data.company.contactPhone);
      } catch (error) {
        console.error("Failed to load job", error);
      }
    };
    fetchJob();
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();

    const updatedJob = {
      title,
      type,
      description,
      location,
      salary: Number(salary),
      company: {
        name: companyName,
        contactEmail,
        contactPhone,
      },
    };

    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedJob),
      });

      if (res.ok) {
        navigate(`/jobs/${id}`);
      }
    } catch (error) {
      console.error("Failed to update job", error);
    }
  };

  return (
    <div>
      <h2>Edit Job</h2>
      <form
        onSubmit={submitForm}
        style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
      >
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <h4>Company Info</h4>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <input
          type="tel"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <button type="submit" style={{ marginRight: "10px" }}>
            Update Job
          </button>
          <button type="button" onClick={() => navigate(`/jobs/${id}`)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobPage;
