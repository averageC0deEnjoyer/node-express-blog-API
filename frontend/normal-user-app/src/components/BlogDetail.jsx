import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import NewCommentBox from './NewCommentBox';
import UpdateComment from './UpdateComment';
import axios from 'axios';

import { Image, Container, Row, Col, Button, Card } from 'react-bootstrap';

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

  const { title, description, imageText } = blogDetail;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Container>
        <Row>
          <Col md={7} className="d-flex justify-content-center">
            <Image src={`http://localhost:3000/${imageText}`} fluid rounded />
          </Col>
          <Col
            md={5}
            className="d-flex flex-column justify-content-center align-items-center"
          >
            <div className="h1 text-center">{title}</div>
            <div className="text-center">{description}</div>
          </Col>
        </Row>
      </Container>
      <br />
      <div className="h4">All Comments:</div>

      {/* this button to toggle the new comment box. but if no token found, then we redirect/navigate to login so user have to login first */}
      {!addNewCommentBox ? (
        <Button
          style={{ width: '15rem' }}
          onClick={() => {
            if (!token) {
              navigate('/signup');
            } else {
              setAddNewCommentBox(true);
            }
          }}
          className="rounded-pill"
        >
          Add New Comment
        </Button>
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
        <div className="h3">No Comments Yet</div>
      ) : (
        <>
          {/* rather than using the array from RESPONSE, we set state so that after every req, the component rerenders.  */}
          {commentsState.map((comment) =>
            comment._id !== updateCommentId ? (
              <Card
                style={{ width: '15rem' }}
                className="m-3 text-center p-2"
                key={comment._id}
              >
                <Card.Text>Comment: {comment.commentText}</Card.Text>
                <Card.Text>
                  Created By: {comment.createdById.username}
                </Card.Text>
                <Card.Text>Updated At: {comment.updatedAt}</Card.Text>
                {userId === comment.createdById._id ? (
                  <>
                    <Button
                      onClick={() => {
                        setUpdateCommentId(comment._id);
                      }}
                      style={{ width: '7rem' }}
                      className="ms-auto me-auto mb-2"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={(e) => {
                        handleDeleteComment(e, comment._id);
                      }}
                      style={{ width: '7rem' }}
                      className="ms-auto me-auto"
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  ''
                )}
              </Card>
            ) : (
              <UpdateComment
                comment={comment}
                handleUpdateComment={handleUpdateComment}
                setUpdateCommentId={setUpdateCommentId}
                key={comment._id}
              />
            )
          )}
        </>
      )}
    </div>
  );
};

export default BlogDetail;
