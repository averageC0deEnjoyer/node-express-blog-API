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
      <div className="form-group text-center">
        <label htmlFor="commentText" className="text-center">
          Update Comment Here:
        </label>
        <input
          type="text"
          name="commentText"
          id="commentText"
          value={latestCommentState}
          onChange={(e) => {
            setLatestCommentState(e.target.value);
          }}
        />
      </div>
      <button
        onClick={(e) => {
          handleUpdateComment(e, comment._id, latestCommentState);
          setLatestCommentState('');
          //to close the update comment box
          setUpdateCommentId('');
        }}
        className="btn bg-primary rounded-pill text-white mt-2"
      >
        Update Comment
      </button>
    </>
  );
};

export default UpdateComment;
