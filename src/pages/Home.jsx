import { useState, useEffect } from "react";
import BlogList from "./BlogList"; // Assuming you have this component

const Home = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    };

    fetchData();
  }, []); // <-- Empty array means this only runs once!

  return (
    <div className="home">
      {/* Conditional rendering prevents crashes before data loads */}
      {blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;
