import React, { useContext, useState, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Navbar from "../../components/navbar";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faVoicemail,
  faPhone,
  faBabyCarriage,
} from "@fortawesome/free-solid-svg-icons";

import Axios from "axios";
import Footer from "../../components/footer";

const MyProfile = () => {
  const {
    userdetails: {
      username,
      userid,
      pic,
      access_level,
      age,
      phone,
      fullname,
      email,
    },
  } = useContext(UserContext);

  const [rating, setRating] = useState();

  useEffect(() => {
    const getcount = async () => {
      try {
        const count = await Axios.post(
          "http://localhost:5000/profile/countposts",
          { userid: userid }
        );

        if (count.data) {
          const { ratings } = count.data;
          setRating(ratings);
        }
      } catch (error) {}
    };
    if (access_level === 1) {
      getcount();
    }
  }, [userid]);

  const StyledRating = withStyles({
    iconFilled: {
      color: "#38a169",
    },
  })(Rating);

  return (
    <>
      <Navbar />
      <div
        className='font-sans leading-tight min-h-screen bg-no-repeat bg-scroll bg-right-bottom bg-gray-300 '
        style={{
          backgroundImage: `url(${require("../../pictures/ccbg.png")})`,
        }}>
        <div className='max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-16 lg:my-0'>
          {/*Main Col*/}
          <div
            id='profile'
            className='w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0'>
            <div className='p-4 md:p-12 text-center lg:text-left'>
              {/* Image for mobile view*/}
              <div
                className='block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center'
                style={{
                  backgroundImage:
                    'url("https://source.unsplash.com/MP0IUfwrn0A")',
                }}
              />
              <h1 className='text-3xl font-bold pt-8 lg:pt-0'>{fullname}</h1>
              <div className='mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-teal-500 opacity-25' />
              <p className='pt-4 text-base font-bold flex items-center justify-center lg:justify-start'>
                <div className='h-4 fill-current text-teal-700 pr-4'>
                  <FontAwesomeIcon icon={faVoicemail}></FontAwesomeIcon>
                </div>
                {email}
              </p>
              <p className='pt-4 text-base font-bold flex items-center justify-center lg:justify-start'>
                <div className='h-4 fill-current text-teal-700 pr-4'>
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                </div>
                {username}
              </p>
              <p className='pt-4 text-base font-bold flex items-center justify-center lg:justify-start'>
                <div className='h-4 fill-current text-teal-700 pr-4'>
                  <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                </div>
                {phone}
              </p>

              <p className='pt-4 text-base font-bold flex items-center justify-center lg:justify-start'>
                <div className='h-4 fill-current text-teal-700 pr-4'>
                  <FontAwesomeIcon icon={faBabyCarriage}></FontAwesomeIcon>
                </div>
                {age}
              </p>
              {access_level === 1 ? (
                rating ? (
                  <div className='mt-4'>
                    <Typography component='legend'>Rating</Typography>
                    <StyledRating value={rating} precision={0.5} readOnly />
                  </div>
                ) : null
              ) : null}
              <div className='pt-4 pb-2'>
                <button className='bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded-full'>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          {/*Img Col*/}
          <div className='w-full lg:w-2/5'>
            {/* Big profile image for side bar (desktop) */}
            <img
              src={`http://127.0.0.1:8887/userimgs/${pic}`}
              className='rounded-none lg:rounded-lg shadow-2xl h-smm lg:block overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
            />
            {/* Image from: http://unsplash.com/photos/MP0IUfwrn0A */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProfile;
