import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../../components/navbar";
import Axios from "axios";
import Footer from "../../../components/footer";
import UserContext from "../../../context/UserContext";
import Comment from "../components/comment";
import GreenButton from "../../../components/button";
import ErrorAlert from "../../../components/errorAlert";

const SinglePost = ({ match }) => {
  const usercontext = useContext(UserContext);
  const { userdetails } = usercontext;
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [postcomments, setPostComments] = useState([]);

  const {
    params: { postid },
  } = match;
  const [post, setPost] = useState({});

  //Get Post Data
  useEffect(() => {
    const getpost = async () => {
      const postdata = await Axios.get(
        `http://localhost:5000/creativecorner/${postid}`
      );
      if (postdata.data) {
        setPost(postdata.data);
      }
    };
    getpost();
  }, [postid]);

  //Get Comments
  useEffect(() => {
    const getcomments = async () => {
      const postcomments = await Axios.get(
        `http://localhost:5000/creativecorner/comments/${postid}`
      );
      if (postcomments.data) {
        setPostComments(postcomments.data);
      }
    };
    getcomments();
  }, [postid]);

  const hanldechange = (event) => {
    setComment(event.target.value);
  };

  const validate = (value) => {
    if (value.length === 0) {
      setError("Cannot Post an Empty Comment");
    }
  };

  const handlecomment = async (e) => {
    if (comment.length === 0) {
      e.preventDefault();
    }
    validate(comment);
    const formdata = new FormData();
    formdata.set("post_id", postid);
    formdata.set("comment", comment);
    formdata.set("user_id", userdetails.userid);
    if (error.length === 0) {
      const getData = await Axios.post(
        "http://localhost:5000/creativecorner/comments/comment",
        formdata
      );
      if (getData) {
        window.location.reload();
      }
    }
  };

  return (
    <>
      <Navbar />
      {/* outer container */}
      <div
        className='bg-scroll bg-no-repeat bg-right-bottom bg-gray-300 '
        style={{
          backgroundImage: `url(${require("../../../pictures/ccbg.png")})`,
        }}>
        {/* content container */}

        <div className='container py-8'>
          {/* header area */}
          <img
            class='w-45 h-full rounded-md shadow-md lg:ml-xxl md:ml-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
            src={`http://127.0.0.1:8887/posts/${post.post_img}`}
            alt=' '
          />
          <p className='text-center text-gray-600 ml-xxl mt-4 text-xl'>
            {post.username}
          </p>
          <p className='text-center text-green-800 ml-xxl mt-2 text-4xl'>
            {post.post_title}
          </p>
          <p className='text-hide ml-xxl mt-2 text-center text-3xl'>
            ______________________
          </p>
          {/* end header area */}

          {/* page content area */}
          <div className='ml-xxl mt-8 mb-12'>
            <img
              class='float-right rounded-md my-2 h-40 w-40 mr-16'
              src={`http://127.0.0.1:8887/posts/${post.post_img}`}
              alt=''
            />
            <p class='clear-none text-xl text-black z-50'>{post.post_desc}</p>
          </div>
          {/* end page content area */}

          {/* comments area */}
          <div
            className={
              post.post_desc
                ? post.post_desc.length < 60
                  ? "ml-xxl mt-40"
                  : "ml-xxl mb-4"
                : null
            }>
            <GreenButton text='Comment' action={handlecomment} />
          </div>

          <textarea
            className='bg-white rounded-md mt-4 shadow-md ml-xxl w-45 h-full'
            rows='4'
            onChange={hanldechange}></textarea>
          <div className='ml-xxl'>
            {error.length > 0 ? <ErrorAlert error={error} /> : null}
          </div>
          {/* end comments area */}

          {/* comments list */}
          {postcomments ? <Comment comments={postcomments} /> : null}
          {/* end comments list */}
        </div>
        {/* end content container */}
      </div>
      {/*end outer container  */}

      <Footer />
    </>
  );
};

export default SinglePost;
