import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
} from "react";
import Navbar from "../../components/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./messages.css";
import Axios from "axios";
import io from "socket.io-client";
import { faChevronDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Footer from "../../components/footer";

const socket = io("http://localhost:5000/"); //initialize socket

const Messages = ({ match }) => {
  /* set required states */
  const [ismounted, setIsmounted] = useState(false);
  const [sender, setSender] = useState({});
  const [chats, setchats] = useState([]);
  const [specificchats, setSpecificChats] = useState([]);
  const [chatthread, setChatThread] = useState("");
  const [chatThreadPic, setchattheadpic] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const {
    params: { user_id },
  } = match;
  let token = localStorage.getItem("x-auth-token");
  const { userdetails, setuserdetails } = useContext(UserContext);
  const { userid } = userdetails;
  const history = useHistory();

  const el = useRef(null); //using ref to scroll without updating the whole component

  //get the sender
  useEffect(() => {
    const getsender = async () => {
      const senderdetails = await Axios.get(
        "http://localhost:5000/user/getuser",
        { headers: { "x-auth-token": token } }
      );
      if (senderdetails) {
        setSender(senderdetails.data.rows[0]);
        setIsmounted(true);
      } else {
        setError("Somthing Went wrong please try again");
      }
    };
    getsender();
  }, []);

  //get All chats of the sender

  useEffect(() => {
    const getallchats = async () => {
      if (ismounted) {
        const senderchats = await Axios.post(
          "http://localhost:5000/chat/allthreads",
          { username: sender.username }
        );
        if (senderchats) {
          setchats(senderchats.data);
        } else {
          setError("Somthing Went wrong please try again");
        }
      }
    };
    getallchats();
  }, [ismounted]);

  //get the listener
  useEffect(() => {
    const getlistener = async () => {
      if (ismounted) {
        const getlistener = await Axios.get(
          `http://localhost:5000/user/getlistener/${user_id}`
        );
        if (getlistener) {
          setChatThread(getlistener.data.username);
          setchattheadpic(getlistener.data.pic);

          const firstchat = await Axios.post(
            "http://localhost:5000/chat/getfirstchat",
            { sender: sender.username, reciever: getlistener.data.username }
          );

          if (firstchat) {
            setSpecificChats(firstchat.data);
            socket.emit("joining", [
              sender.username,
              getlistener.data.username,
            ]);
          }
        } else {
          setError("Somthing Went wrong please try again");
        }
      }
    };
    getlistener();
  }, [user_id, ismounted]);

  //Listen for New messages from server
  useLayoutEffect(() => {
    socket.on("new_message", (data) => {
      setSpecificChats(specificchats.concat(data));
      el.current.scrollIntoView({
        block: "nearest",
        behavior: "auto",
      });
    });
  }, [specificchats]);

  //scroll to bottom on new messages
  useEffect(() => {
    el.current.scrollIntoView({
      block: "nearest",
      behavior: "auto",
    });
  });

  //get the chats for the selected thread
  const getspecificchat = async (user, c_id, pic) => {
    setChatThread(user);
    setchattheadpic(pic);
    const getchats = await Axios.post("http://localhost:5000/chat/allchats", {
      c_id: c_id,
    });
    if (getchats) {
      setSpecificChats(getchats.data);
      socket.emit("joining", [sender.username, user]);
    } else {
      setError("Somthing Went wrong please try again");
    }
  };

  //send msg using socket
  const sendmessage = (e) => {
    e.preventDefault();

    if (message === "") {
      setError("Cannot send an empty message");
    } else {
      socket.emit("private_message", {
        user1: sender.username,
        user2: chatthread,
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
  //get all threads from chats
  const { threads } = chats;

  //css class for styling thumbnails
  const imgstyle =
    "text-center text-white text-lg subpixel-antialiased cursor-pointer realtive z-10 w-10 h-10 rounded-full overflow-hidden";
  return (
    <>
      <Navbar />
      <div
        className=' main bg-no-repeat bg-scroll bg-right-bottom bg-gray-300'
        style={{
          backgroundImage: `url(${require("../../pictures/ccbg.png")})`,
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
                  src={`http://127.0.0.1:8887/userimgs/${sender.pic}`}
                  className='online mt-3'
                  alt=''
                />
                <p className='text-lg'>{sender.fullname}</p>
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
                                  getspecificchat(
                                    thread.thread,
                                    thread.c_id,
                                    thread.pic
                                  )
                                }>
                                <span
                                  className={
                                    thread.online === 1
                                      ? "contact-status online"
                                      : "contact-status"
                                  }></span>
                                <img
                                  className={imgstyle}
                                  src={`http://127.0.0.1:8887/userimgs/${thread.pic}`}
                                  alt=''
                                />
                                <p className='name text-lg'>{thread.thread}</p>
                                <p className='preview'>{thread.message}</p>
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
                src={`http://127.0.0.1:8887/userimgs/${chatThreadPic}`}
                className={imgstyle}
                alt=''
              />
              <p className='text-lg'>{chatthread}</p>
            </div>

            <div className='messages'>
              <ul>
                {specificchats.map((userchat) => {
                  return (
                    <li
                      className={
                        userchat.from_user === sender.username
                          ? "sent"
                          : "replies"
                      }>
                      <img
                        src={
                          userchat.from_user === sender.username
                            ? `http://127.0.0.1:8887/userimgs/${sender.pic}`
                            : `http://127.0.0.1:8887/userimgs/${chatThreadPic}`
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

export default Messages;
