import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog._id} blog={blog} />
      ))}
    </>
  );
};

export default BlogList;
