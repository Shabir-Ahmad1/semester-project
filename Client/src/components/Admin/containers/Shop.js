import React, { useState, useEffect } from "react";
import Posts from "./Pagination/Posts";
import Pagination from "./Pagination/Pagination";
import axios from "axios";
import Header from "../components/Header";

const Shop = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/admin/getAll/posts"
      );
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
      <div className='profileContainer' >
      <Header pageTitle="All Ads" />
      

      <Posts posts={currentPosts} loading={loading} />

      <div className="container">
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      
      </div>
    </div>
  );
};

export default Shop;
