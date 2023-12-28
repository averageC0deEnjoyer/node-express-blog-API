import { useState } from 'react';

const UpdateComment = ({
  comment,
  handleUpdateComment,
  setUpdateCommentId,
}) => {
  const [latestCommentState, setLatestCommentState] = useState(
    comment.commentText
  );
  return (
    <>
      <label htmlFor="commentText" />
      <input
        type="text"
        name="commentText"
        id="commentText"
        value={latestCommentState}
        onChange={(e) => {
          setLatestCommentState(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          handleUpdateComment(e, comment._id, latestCommentState);
          setLatestCommentState('');
          //to close the update comment box
          setUpdateCommentId('');
        }}
      >
        Update Comment
      </button>
    </>
  );
};

export default UpdateComment;
