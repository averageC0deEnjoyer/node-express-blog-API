import { useState } from 'react';

const NewCommentBox = ({ setAddNewCommentBox, addNewCommentFunc }) => {
  const [commentState, setCommentState] = useState('');
  //after submit new comment, then we want to close the box so we pass the setAddNewCommentBox down
  //i think we dont need to validate if user have login/not here cause we already validate it before at BlogDetail line 44

  return (
    <>
      <form>
        <label htmlFor="commentText" />
        <input
          name="commentText"
          id="commentText"
          type="text"
          placeholder="your comment here"
          onChange={(e) => {
            setCommentState(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={(e) => {
            addNewCommentFunc(e, commentState);
            setCommentState('');
          }}
        >
          Add Comment
        </button>
      </form>
      <button onClick={() => setAddNewCommentBox(false)}>Cancel</button>
    </>
  );
};

export default NewCommentBox;
