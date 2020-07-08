import React from 'react'

const Posts = ({post}) => {
  return (
    <>
        <div class="card mt-2 shadow-lg p-3" >
          <div class="row">
                <div className="col-md-4">
                <img src={`http://127.0.0.1:8887/userimgs/${post.pic}`} className="card-img h-75" alt="..."/>
                <p className='text-center bold'>{post.username}</p>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <p className="card-text">{post.post_desc}</p>
                  {console.log(post.post_pic)}
                  {post.post_pic ?<img src={`http://127.0.0.1:8887/forumposts/${post.post_pic}`} className="card-img h-75" alt="..."/> :null}
                  <p className="card-text mt-5">Created At: {post.created_at}</p>
                </div>
              </div>
              </div>
              </div>
    </>
  )
}

export default Posts
