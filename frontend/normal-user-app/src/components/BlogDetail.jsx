import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogDetail = () => {
  //later set up UseParams for ID
  const [blogDetail, setBlogDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/blogs/6589a73052fe87a487375137')
      .then((res) => {
        setBlogDetail(res.data.data.blogData.blogDetail);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  const { title, description, commentsId } = blogDetail;
  console.log(commentsId);
  return (
    <>
      <div>{title}</div>
      <div>{description}</div>
      <br />
      <div>Comment:</div>
      <ul>
        {commentsId?.map((comment) => (
          <li key={comment._id}>{comment.commentText}</li>
        ))}
      </ul>
    </>
  );
};

export default BlogDetail;
