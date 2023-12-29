import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import NewCommentBox from './NewCommentBox';
import UpdateComment from './UpdateComment';
import axios from 'axios';

const BlogDetail = () => {
  //later set up UseParams for ID
  // i think i need to setup state here to save the comment data , cause when i DELETE , the res i get is not the updated comment, only empty array
  const { user } = useContext(UserContext);

  const { _id: userId } = user;

  const [addNewCommentBox, setAddNewCommentBox] = useState(false);
  const [commentsState, setCommentsState] = useState([]);
  const [blogDetail, setBlogDetail] = useState({});
  const [loading, setLoading] = useState(true);
  //to select which comment to update
  const [updateCommentId, setUpdateCommentId] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(commentsState);

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
  function handleUpdateComment(e, commentId, commentText) {
    axios
      .put(
        `http://localhost:3000/blogs/${id}`,
        { commentId, commentText },
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.status === 200) {
          //to update updatedAt
          const date = new Date();
          const selectedComment = commentsState.find(
            (comment) => comment._id === commentId
          );
          const updatedComment = {
            ...selectedComment,
            commentText: commentText,
            updatedAt: date.toISOString(),
          };
          const updatedCommentsArray = commentsState.map((comment) =>
            comment._id === commentId ? updatedComment : comment
          );
          setCommentsState(updatedCommentsArray);
        }
      })
      .catch((err) => console.log(err));
  }

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
          {commentsState.map((comment) =>
            comment._id !== updateCommentId ? (
              <li key={comment._id}>
                <div>{comment.commentText}</div>
                <div>{comment.createdById.username}</div>
                <div>{comment.updatedAt}</div>
                {userId === comment.createdById._id ? (
                  <>
                    <button
                      onClick={() => {
                        setUpdateCommentId(comment._id);
                      }}
                    >
                      Update
                    </button>
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
            ) : (
              <UpdateComment
                comment={comment}
                handleUpdateComment={handleUpdateComment}
                setUpdateCommentId={setUpdateCommentId}
                key={comment._id}
              />
            )
          )}
        </ul>
      )}
    </>
  );
};

export default BlogDetail;
