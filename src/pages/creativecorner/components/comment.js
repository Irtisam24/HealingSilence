import React from "react";

const Comment = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <div
            className='flex ml-xxl w-45 mt-4 bg-gray-300 bg-opacity-75 rounded-lg shadow-md'
            key={comment.comment_id}>
            <img
              className='flex-2 img-thumbnail mr-3 rounded-circle'
              src={`http://127.0.0.1:8887/userimgs/${comment.pic}`}
              style={{ maxHeight: 80, maxWidth: 80 }}
              alt=''
            />
            <div className='flex-1'>
              <p className='text-lg'>{comment.username}</p>
              <p className='text-xl'>{comment.comment}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Comment;
