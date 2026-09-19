import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    const newJob = {
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
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      });

      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to add job", error);
    }
  };

  return (
    <div>
      <h2>Add a New Job</h2>
      <form
        onSubmit={submitForm}
        style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
      >
        <input
          type="text"
          placeholder="Job Title"
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
          placeholder="Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="number"
          placeholder="Salary"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <h4>Company Info</h4>
        <input
          type="text"
          placeholder="Company Name"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Contact Email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Contact Phone"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <button type="submit" style={{ marginTop: "10px" }}>
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJobPage;
