import React from 'react';

const Blog = ({ blog }) => {
  const { title } = blog;
  return (
    <>
      <div>{title}</div>
    </>
  );
};

export default Blog;
