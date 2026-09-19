import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(`/api/blogs/${id}`);
      const json = await response.json();

      if (response.ok) {
        setBlog(json);
      }
    };

    fetchBlog();
  }, [id]); // <-- Re-runs if the URL 'id' parameter changes

  const handleClick = async () => {
    await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  return (
    <div className="blog-details">
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
