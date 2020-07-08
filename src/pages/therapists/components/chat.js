import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import Navbar from "../../../components/navbar";
import UserContext from "../../../context/UserContext";
import Axios from "axios";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import Footer from "../../../components/footer";

import { Redirect } from "react-router-dom";

const socket = io("http://localhost:5000/"); //initialize socket

const TherapistChat = ({ match }) => {
  const {
    params: { therapistid },
  } = match;
  const {
    userdetails: { userid, pic, username },
    setuserdetails,
  } = useContext(UserContext);
  const [therapist, setTherapist] = useState({});
  const [message, setMessage] = useState("");
  const [threads, setThreads] = useState([]);
  const [errors, setError] = useState("");
  const [threadmsgs, setThreadMsgs] = useState([]);
  const [chatthread, setChatThread] = useState("");
  const [chatThreadPic, setchattheadpic] = useState("");
  const el = useRef(null);
  const history = useHistory();
  // getTherapist Details and selected therapists thread
  useEffect(() => {
    const getTherapistDetailsandThread = async () => {
      const therapistDetails = await Axios.get(
        `http://localhost:5000/therapist/gettherapistdetails/${therapistid}`
      );

      if (therapistDetails.data) {
        setTherapist(therapistDetails.data);
        setChatThread(therapistDetails.data.fullname);
        const getselectedTherapistChat = await Axios.post(
          `http://localhost:5000/therapist/getmsgs`,
          {
            username: username,
            therapistname: therapist.fullname,
          }
        );
        if (getselectedTherapistChat) {
          setThreadMsgs(getselectedTherapistChat.data);
          socket.emit("joining", [username, therapistDetails.data.fullname]);
        }
      }
    };
    getTherapistDetailsandThread();
  }, [therapistid, userid]);

  //get all the chat threads for the logged in user

  useEffect(() => {
    const getthreads = async () => {
      try {
        const allthreads = await Axios.post(
          "http://localhost:5000/therapist/getallthreads",
          { username: username }
        );
        if (allthreads.data) {
          setThreads(allthreads.data.threads);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getthreads();
  }, [username]);

  //get messages for the selected thread
  const getspecificchat = async (user, pic) => {
    setchattheadpic(pic);
    const selectedtherapist = await Axios.post(
      "http://localhost:5000/therapist/gettherapistbyfullname",
      { fullname: user }
    );

    if (selectedtherapist.data) {
      setTherapist(selectedtherapist.data);
      setChatThread(selectedtherapist.data.fullname);
    }
    const getselectedTherapistChat = await Axios.post(
      `http://localhost:5000/therapist/getmsgs`,
      {
        username: username,
        therapistname: user,
      }
    );
    if (getselectedTherapistChat) {
      setThreadMsgs(getselectedTherapistChat.data);
      socket.emit("joining", [username, user]);
    }
  };

  //listen for a new message event
  useEffect(() => {
    socket.on("new_therapist_message", (data) => {
      setThreadMsgs(threadmsgs.concat(data));
      el.current.scrollIntoView({
        block: "nearest",
        behavior: "auto",
      });
    });
  }, [threadmsgs]);

  //send message function
  const sendmessage = async (e) => {
    e.preventDefault();

    if (message === "") {
      setError("Cannot send an empty message");
    } else {
      socket.emit("therapist_private_message", {
        user1: username,
        user2: therapist.fullname,
        message: message,
      });
      setMessage("");
    }
  };

  //logout function
  const logout = async () => {
    setuserdetails({
      token: undefined,
      userid: undefined,
      fullname: undefined,
      username: undefined,
      pic: undefined,
      email: undefined,
      phone: undefined,
      age: undefined,
      access_level: undefined,
    });
    localStorage.removeItem("x-auth-token");
    await Axios.post("http://localhost:5000/user/logout", {
      user_id: userid,
    });
    history.push("/");
  };

  //state for user options such as profile and logout
  const [toggleuseroptions, setToggleUserOptions] = useState(false);

  const imgstyle =
    "text-center text-white text-lg subpixel-antialiased cursor-pointer realtive z-10 w-10 h-10 rounded-full overflow-hidden";

  return (
    <>
      {!userid ? <Redirect to='/register' /> : null}
      <Navbar />
      <div
        className=' main bg-no-repeat bg-scroll bg-right-bottom bg-gray-300'
        style={{
          backgroundImage: `url(${require("../../../pictures/ccbg.png")})`,
        }}>
        <div id='frame' className='mt-12 rounded-lg shadow-lg'>
          {/*side panel where contacts are shown*/}
          <div id='sidepanel'>
            <div
              id='profile'
              className={toggleuseroptions ? "expanded " : null}>
              <div className='wrap mx-8 border-b-2 border-black'>
                <img
                  id='profile-img'
                  src={`http://127.0.0.1:8887/userimgs/${pic}`}
                  className='online mt-3'
                  alt=''
                />
                <p className='text-lg'>{username}</p>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className='expand-button float-right mt-5 cursor-pointer'
                  aria-hidden='true'
                  onClick={() =>
                    setToggleUserOptions(!toggleuseroptions)
                  }></FontAwesomeIcon>

                <div
                  id='status-options'
                  className={toggleuseroptions ? "active" : null}>
                  <ul className='flex flex-col'>
                    <li className='flex-1'>
                      <Link>My Profile</Link>
                    </li>
                    <li className='flex-1'>
                      <Link onClick={logout}>Log Out</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div id='contacts'>
              <ul>
                {threads
                  ? threads.map((thread) => {
                      return (
                        <li
                          className={
                            thread.thread === chatthread
                              ? "contact active"
                              : "contact"
                          }>
                          <div className='wrap'>
                            <div className='meta'>
                              {/* threads container */}
                              <div
                                className='ml-4'
                                onClick={() =>
                                  getspecificchat(thread.thread, thread.pic)
                                }>
                                <span
                                  className={
                                    thread.online === 1
                                      ? "contact-status online"
                                      : "contact-status"
                                  }></span>
                                <img
                                  className={imgstyle}
                                  src={
                                    thread.pic
                                      ? `http://127.0.0.1:8887/therapists/${thread.pic}`
                                      : `http://127.0.0.1:8887/default/avatar.jpg`
                                  }
                                  alt=''
                                />
                                <p className='name text-lg'>{thread.thread}</p>
                                <p className='preview'>{thread.message}</p>
                                {/* <p className='text-center text-lg mt-2'>
                                  {thread.thread}
                                </p> */}
                              </div>
                              {/*end threads container */}
                            </div>
                          </div>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
          </div>

          {/*all messages for spececific thread are shown here*/}
          <div className='content'>
            <div className='contact-profile'>
              <img
                src={
                  therapist.pic
                    ? `http://127.0.0.1:8887/therapists/${therapist.pic}`
                    : `http://127.0.0.1:8887/default/avatar.jpg`
                }
                className={imgstyle}
                alt=''
              />
              <p>{chatthread}</p>
            </div>

            <div className='messages'>
              <ul>
                {threadmsgs.map((userchat) => {
                  return (
                    <li
                      className={
                        userchat.from_user === username ? "sent" : "replies"
                      }>
                      <img
                        src={
                          userchat.from_user === username
                            ? `http://127.0.0.1:8887/userimgs/${pic}`
                            : `http://127.0.0.1:8887/therapists/${chatThreadPic}`
                        }
                        className='subpixel-antialiased cursor-pointer realtive w-6 h-6 rounded-full overflow-hidden'
                        alt=''
                      />
                      <p>{userchat.message}</p>
                    </li>
                  );
                })}
              </ul>
              <div ref={el}></div>
            </div>

            <div className='message-input'>
              <div className='wrap'>
                <form onSubmit={sendmessage}>
                  <input
                    type='text'
                    placeholder='Write your message...'
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                  <button className='submit'>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      aria-hidden='true'></FontAwesomeIcon>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div>
        <Footer />
      </div>
    </>
  );
};

export default TherapistChat;
