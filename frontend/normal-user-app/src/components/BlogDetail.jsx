import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewCommentBox from './NewCommentBox';
import axios from 'axios';

const BlogDetail = () => {
  //later set up UseParams for ID
  // i think i need to setup state here to save the comment data , cause when i DELETE , the res i get is not the updated comment, only empty array
  const [addNewCommentBox, setAddNewCommentBox] = useState(false);

  const [commentsState, setCommentsState] = useState([]);

  const [blogDetail, setBlogDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3000/blogs/${id}`).then((res) => {
      console.log(res);
      setBlogDetail(res.data.data.blogData.blogDetail);
      setLoading(false);
    });
  }, [id]);

  function addNewCommentFunc(e, commentText) {
    e.preventDefault();
    console.log(commentText);
    axios
      .post(
        `http://localhost:3000/blogs/${id}`,
        { commentText: commentText },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status === 201) {
          console.log(res);
          setAddNewCommentBox(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

      {/* this button to toggle the new comment box. but if no token found, then we redirect/navigate to login so user have to login first */}
      {!addNewCommentBox ? (
        <button
          onClick={() => {
            if (!token) {
              navigate('/login');
            } else {
              setAddNewCommentBox(true);
            }
          }}
        >
          Add New Comment
        </button>
      ) : (
        ''
      )}
      {addNewCommentBox ? (
        <NewCommentBox
          setAddNewCommentBox={setAddNewCommentBox}
          addNewCommentFunc={addNewCommentFunc}
        />
      ) : (
        ''
      )}
      <ul>
        {commentsId?.map((comment) => (
          <li key={comment._id}>
            <div>{comment.commentText}</div>
            <div>{comment.createdById.username}</div>
            <div>{comment.createdAt}</div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogDetail;
