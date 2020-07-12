import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Posts from "./components/posts";
import UserContext from "../../context/UserContext";
import Header from "../community/components/header";
import ImageModal from "./components/imageModal";
import "./thread.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const SingleThread = ({ match }) => {
  const {
    params: { topicid },
  } = match;
  const [thread, setThread] = useState([]);
  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState("");
  const [file, setfile] = useState("");
  const [showImage, setshowImage] = useState(false);
  const [currentimage, setCurrentImage] = useState("");
  const errors = [];
  const {
    userdetails: { userid },
  } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const pagedata = await Axios.get(
        `http://localhost:5000/community/thread/${topicid}`
      );
      if (pagedata) {
        setThread(pagedata.data[0]);

        setPosts(pagedata.data[1]);
      }
    };
    getData();
  }, []);

  const checkerrors = async (value) => {
    if (!value) {
      errors.reply = "Reply is Must";
    }
    if (!userid) {
      errors.login = "Must Login before you can post anything";
    }
    return errors;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const check = await checkerrors(reply);
    console.log(errors);
    if (Object.keys(check).length === 0) {
      const formData = new FormData();
      formData.set("topicid", topicid);
      formData.set("userid", userid);
      formData.set("reply", reply);
      formData.append("file", file);
      const newPost = await Axios.post(
        "http://localhost:5000/community/createthread",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (newPost) {
        window.location.reload();
      }
    }
  };

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
      <Navbar />
      <Header />
      <div
        className='bg-no-repeat bg-scroll bg-right-bottom bg-gray-300 h-screen -mt-16'
        style={{
          backgroundImage: `url(${require("../../pictures/ccbg.png")})`,
        }}>
        <div className='plx-card ogpost'>
          <div
            className='pxc-bg'
            style={
              thread.topic_pic
                ? {
                    backgroundImage: `url("http://127.0.0.1:8887/forumposts/${thread.topic_pic}")`,
                  }
                : {
                    backgroundImage: `url("http://127.0.0.1:8887/forumposts/default.png")`,
                  }
            }
            onClick={() =>
              handleImageShow(
                thread.topic_pic
                  ? `http://127.0.0.1:8887/forumposts/${thread.topic_pic}`
                  : "http://127.0.0.1:8887/forumposts/default.png"
              )
            }></div>
          <div
            className='pxc-avatar cursor-pointer'
            onClick={() =>
              handleImageShow(
                thread.pic
                  ? `http://127.0.0.1:8887/userimgs/${thread.pic}`
                  : "http://127.0.0.1:8887/default/avatar.jpg"
              )
            }>
            <img
              src={
                thread.pic
                  ? `http://127.0.0.1:8887/userimgs/${thread.pic}`
                  : `http://127.0.0.1:8887/default/avatar.jpg`
              }
            />
          </div>
          <div className='pxc-stopper'></div>
          <div className='pxc-subcard'>
            <div class='pxc-title'>{thread.topic_title}</div>
            <div className='pxc-sub'>{thread.topic_desc}</div>
            <div className='bottom-row'>
              <div className='pxc-info'>
                <div className='flags'>
                  <span>
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
                <div className='region'>{thread.username}</div>
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

        {/* map through all the posts in the current topic */}
        {posts.length > 0
          ? posts.map((post) => {
              return <Posts post={post} />;
            })
          : null}
      </div>
      <Footer />
    </>
  );
};

export default SingleThread;
