import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  async function getAllPosts() {
    try {
      const { data } = await axios({
        url: "http://localhost:5000/posts/",
        method: "GET",
        withCredentials: true,
      });
      setPosts(data.posts);
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.status === 400 ? "Please login first" : "");
      }
    }
  }

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div>
      {error ? (
        <Navigate to="/login" replace={true} />
      ) : (
        posts.map((post, index) => (
          <div key={index}>
            <h3>{post.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default Posts;
