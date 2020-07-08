import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/navbar";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import Axios from "axios";
import "./index.css";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

const Chat = () => {
  const {
    userdetails: { username, userid },
  } = useContext(UserContext);
  const [error, setError] = useState("");
  const [listeners, setlisteners] = useState([]);
  const [rating, setRating] = useState();

  useEffect(() => {
    const getlisteners = async () => {
      const alllisteners = await Axios.get("http://localhost:5000/chat");
      if (alllisteners) {
        setlisteners(alllisteners.data);
      } else {
        setError("Somthing Went wrong please try again");
      }
    };
    getlisteners();
  }, []);

  const ratelistener = async (listener_id, value) => {
    await Axios.post("http://localhost:5000/chat/rate", {
      user_id: userid,
      listener_id: listener_id,
      rating: value,
    });
  };
  const StyledRating = withStyles({
    iconFilled: {
      color: "#38a169",
    },
    iconHover: {
      color: "#38a169",
    },
  })(Rating);
  return (
    <>
      <Navbar />

      <div className='listeners_list_container bg-gray-300 h-screen'>
        {listeners.map((listener) => {
          return (
            <div className='card rounded-md shadow-xl' key={listener.user_id}>
              <img
                src={`http://127.0.0.1:8887/userimgs/${listener.pic}`}
                alt='Person'
                className='card__image overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105'
              />
              <p className='card__name'>{listener.fullname}</p>
              <div className='grid-container'>
                <div className='grid-child-posts'>{listener.count} Clients</div>
              </div>
              <div className='mt-2'>
                {listener.rater_id === userid || !userid ? (
                  <StyledRating
                    name='rating'
                    value={listener.avg}
                    precision={0.5}
                    size='large'
                    readOnly
                  />
                ) : (
                  <StyledRating
                    name='rating'
                    value={listener.avg}
                    precision={0.5}
                    size='large'
                    onChange={(event, newValue) => {
                      ratelistener(listener.user_id, newValue);
                    }}
                  />
                )}
              </div>
              {username ? (
                <Link
                  className='btn draw-border text-center'
                  to={`/listeners/chat/${listener.user_id}`}>
                  Chat
                </Link>
              ) : (
                <Link to='/register'>
                  <button className='btn draw-border'>
                    Please Login/SignUp
                  </button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Chat;
