import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
const NewCommentBox = ({ setAddNewCommentBox, handleAddNewComment }) => {
  const [commentState, setCommentState] = useState('');
  //after submit new comment, then we want to close the box so we pass the setAddNewCommentBox down
  //i think we dont need to validate if user have login/not here cause we already validate it before at BlogDetail line 44

  return (
    <>
      <Form className="d-flex flex-column justify-content-center align-items-center gap-3">
        <Form.Label htmlFor="commentText">Add your comment: </Form.Label>
        <Form.Control
          name="commentText"
          id="commentText"
          type="text"
          placeholder="your comment here"
          onChange={(e) => {
            setCommentState(e.target.value);
          }}
        />
        <Button
          type="submit"
          onClick={(e) => {
            handleAddNewComment(e, commentState);
            setCommentState('');
          }}
        >
          Add Comment
        </Button>
        <Button onClick={() => setAddNewCommentBox(false)}>Cancel</Button>
      </Form>
    </>
  );
};

export default NewCommentBox;
