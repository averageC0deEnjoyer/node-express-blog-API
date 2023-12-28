import { Link } from 'react-router-dom';

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
