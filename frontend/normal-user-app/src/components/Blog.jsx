import React from 'react';

const Blog = ({ blog }) => {
  const { title } = blog;
  return (
    <>
      <span>Blog: </span>
      <div>{title}</div>
    </>
  );
};

export default Blog;
