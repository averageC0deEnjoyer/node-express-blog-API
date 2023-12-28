import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import NewCommentBox from './NewCommentBox';
import axios from 'axios';

const BlogDetail = () => {
  //later set up UseParams for ID
  // i think i need to setup state here to save the comment data , cause when i DELETE , the res i get is not the updated comment, only empty array
  const [addNewCommentBox, setAddNewCommentBox] = useState(false);

  const [commentsState, setCommentsState] = useState([]);
  console.log(commentsState);
  const { user } = useContext(UserContext);

  const { _id: userId } = user;

  const [blogDetail, setBlogDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/blogs/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setBlogDetail(res.data.data.blogData.blogDetail);
        setLoading(false);
        setCommentsState(res.data.data.blogData.blogDetail.commentsId);
      });
    //to satisfy linter
  }, [id, token]);

  function handleAddNewComment(e, commentText) {
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
          setCommentsState([
            ...commentsState,
            res.data.data.blogData.blogDetail.commentsId[
              res.data.data.blogData.blogDetail.commentsId.length - 1
            ],
          ]);
          setAddNewCommentBox(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteComment(e, commentId) {
    axios
      .delete(`http://localhost:3000/blogs/${id}`, {
        headers: { Authorization: token },
        data: { commentId },
      })
      .then((res) => {
        if (res.status === 200) {
          const newCommentsArray = commentsState.filter(
            (comment) => comment._id !== commentId
          );
          setCommentsState(newCommentsArray);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateComment(e) {}

  if (loading) {
    return <div>Loading</div>;
  }

  const { title, description } = blogDetail;

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
          handleAddNewComment={handleAddNewComment}
        />
      ) : (
        ''
      )}
      {commentsState.length === 0 ? (
        <div>No Comments Yet</div>
      ) : (
        <ul>
          {/* rather than using the array from RESPONSE, we set state so that after every req, the component rerenders.  */}
          {commentsState.map((comment) => (
            <li key={comment._id}>
              <div>{comment.commentText}</div>
              <div>{comment.createdById.username}</div>
              <div>{comment.createdAt}</div>
              {userId === comment.createdById._id ? (
                <>
                  <button>Update</button>
                  <button
                    onClick={(e) => {
                      handleDeleteComment(e, comment._id);
                    }}
                  >
                    Delete
                  </button>
                </>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default BlogDetail;
