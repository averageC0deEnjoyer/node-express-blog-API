import { useNavigate } from 'react-router-dom';

const Blog = ({ blog }) => {
  const { title, _id: id } = blog;
  const navigate = useNavigate();
  return (
    <>
      <span>Blog: </span>
      <div>{title}</div>
      <button
        onClick={() => {
          navigate(`/blog/${id}`);
        }}
        className="btn btn-primary"
      >
        Detail
      </button>
      <br />
      <br />
    </>
  );
};

export default Blog;
