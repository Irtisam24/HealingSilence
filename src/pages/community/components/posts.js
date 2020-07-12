import React, { useState } from "react";
import ImageModal from "../components/imageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Posts = ({ post }) => {
  console.log(post);
  const [showImage, setshowImage] = useState(false);
  const [currentimage, setCurrentImage] = useState("");

  const handleImageHide = () => {
    setshowImage(false);
  };

  const handleImageShow = (image) => {
    setCurrentImage(image);
    setshowImage(true);
  };
  return (
    <>
      <ImageModal
        show={showImage}
        handlehide={handleImageHide}
        image={currentimage}
      />
      <div className='plx-card gold'>
        <div
          className='pxc-bg'
          style={
            post.post_pic
              ? {
                  backgroundImage: `url("http://127.0.0.1:8887/forumposts/${post.post_pic}")`,
                }
              : {
                  backgroundImage: `url("http://127.0.0.1:8887/forumposts/default.png")`,
                }
          }
          onClick={() =>
            handleImageShow(
              post.post_pic
                ? `http://127.0.0.1:8887/forumposts/${post.post_pic}`
                : "http://127.0.0.1:8887/forumposts/default.png"
            )
          }></div>
        <div
          className='pxc-avatar cursor-pointer'
          onClick={() =>
            handleImageShow(
              post.pic
                ? `http://127.0.0.1:8887/userimgs/${post.pic}`
                : "http://127.0.0.1:8887/default/avatar.jpg"
            )
          }>
          <img
            src={
              post.pic
                ? `http://127.0.0.1:8887/userimgs/${post.pic}`
                : `http://127.0.0.1:8887/default/avatar.jpg`
            }
          />
        </div>
        <div className={post.post_pic ? "pxc-stopper" : null}> </div>
        <div className='pxc-subcard'>
          <div className='pxc-sub'>{post.post_desc}</div>
          <div className='bottom-row'>
            <div className='pxc-info'>
              <div className='flags'>
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <div className='region'>{post.username}</div>
            </div>
            <div className='links'>
              <button
                className='text-white  bg-green-800 rounded-md p-2 mt-2 mb-2 ml-2 mr-2 transition duration-500 ease-in-out hover:bg-green-900 
            transform hover:-translate-y-1 hover:scale-105 subpixel-antialiased'>
                Reply to this Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
