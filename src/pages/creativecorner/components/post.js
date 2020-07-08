import React from "react";
import { Link } from "react-router-dom";

const Post = ({ posts }) => {
  /* count for reversing order of image and content */
  let count = 1;

  return (
    <>
      {posts.map((post, index) => {
        return (
          <>
            {
              /* render original order if index is even otherwise render reverse order */
              index % 2 === 0 ? (
                <div class='container flex ml-xl items-center my-4 h-64 w-45 bg-white rounded-lg shadow-md overflow-hidden'>
                  <div className='flex-1'>
                    <img
                      class=' w-full h-64 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                      src={`http://127.0.0.1:8887/posts/${post.post_img}`}
                      alt=' '
                    />
                  </div>

                  <div class='flex-1 mx-8'>
                    <div class='flex items-center mr-4 w-full'>
                      <h2 class='text-3xl text-green-800 mr-auto'>
                        {post.post_title}
                      </h2>
                      <p class='text-gray-800 font-semibold tracking-tighter'>
                        {post.username}
                      </p>
                    </div>

                    <p class='text-sm text-gray-700 mt-4'>
                      {post.post_desc.substring(0, 80)}.....Read More
                    </p>

                    <div class='flex items-center justify-end mt-16 top-auto'>
                      <Link
                        to={`/creativecorner/${post.post_id}`}
                        class='text-white font-bold bg-green-800 rounded-md p-2 mt-2 mb-2 ml-2 mr-2 
              transition duration-500 ease-in-out hover:bg-green-900 
              transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased'>
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                /* reverse order because current index is odd */
                <div class='container flex ml-xl  items-center my-4 h-64 w-45 bg-white rounded-lg shadow-md overflow-hidden'>
                  <div class='flex-1 mx-8'>
                    <div class='flex items-center mr-4 w-full'>
                      <h2 class='text-3xl text-green-800 mr-auto'>
                        {post.post_title}
                      </h2>
                      <p class='text-gray-800 font-semibold tracking-tighter'>
                        {post.username}
                      </p>
                    </div>

                    <p class='text-sm text-gray-700 mt-4'>
                      {post.post_desc.substring(0, 80)}.....Read More
                    </p>

                    <div class='flex items-center justify-start mt-16 top-auto'>
                      <Link
                        to={`/creativecorner/${post.post_id}`}
                        class='text-white font-bold bg-green-800 rounded-md p-2 mt-2 mb-2 ml-2 mr-2 
              transition duration-500 ease-in-out hover:bg-green-900 
              transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased'>
                        Read More
                      </Link>
                    </div>
                  </div>

                  <div className='flex-1'>
                    <img
                      class=' w-full h-64 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                      src={`http://127.0.0.1:8887/posts/${post.post_img}`}
                      alt=' '
                    />
                  </div>
                </div>
              )
            }
          </>
        );
      })}
    </>
  );
};

export default Post;
