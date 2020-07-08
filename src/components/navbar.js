import React, { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faTimes,
  faBriefcaseMedical,
} from "@fortawesome/free-solid-svg-icons";

import { NavLink, useHistory } from "react-router-dom";
import userContext from "../context/UserContext";
import Axios from "axios";

import Logo from "../pictures/navlogo.png";
import NavItem from "./navitem";
import { Link } from "react-scroll";

export default function Navbar() {
  const history = useHistory();

  //states for listner notifications and listener notifications count
  const [notifications, setNotifications] = useState([]);
  const [notificationscount, setNotificationsCount] = useState(0);

  //states for therapist notifications and therapist notificiations count
  const [therapistnotifications, settherapistnotifications] = useState([]);
  const [
    therapistnotificationscount,
    settherapistnotificationsCount,
  ] = useState(0);

  //states for hover menus
  const [hoverlistenernotification, sethoverlistenernotifications] = useState(
    false
  );
  const [hovertherapistnotification, sethovertherapistnotification] = useState(
    false
  );
  const [hoverable, sethoverable] = useState(false);
  const [hoveruser, setUserHover] = useState(false);
  const [hovervolunteer, setHoverVolunteer] = useState(false);
  const [hoveronlinetherapy, setHoverOnlineTherapy] = useState(false);
  //end states for hover menus

  //user details
  const { userdetails, setuserdetails } = useContext(userContext);
  const { userid, token, username, access_level, fullname, pic } = userdetails;
  //end user details

  //get all notifications for the logged in user
  useEffect(() => {
    const getnotifications = async () => {
      if (username) {
        const notificationsres = await Axios.post(
          "http://localhost:5000/notifications/",
          { username: username }
        );
        if (notificationsres) {
          setNotifications(notificationsres.data);
        }
      }
    };
    getnotifications();
  }, [username]);

  //get to or from therapist notifications
  useEffect(() => {
    const therapistnotifications = async () => {
      if (fullname) {
        const notifications = await Axios.post(
          "http://localhost:5000/notifications/therapist_notifications",
          { fullname: fullname }
        );
        if (notifications) {
          settherapistnotifications(notifications.data);
        }
      }
    };
    therapistnotifications();
  }, [fullname]);

  //Count notifications number
  useEffect(() => {
    const getcount = async () => {
      let count = 0;
      notifications.map((notification) => {
        count++;
      });

      setNotificationsCount(count);
    };
    getcount();
  }, [notifications]);

  //Count notifications number to or from therapist
  useEffect(() => {
    const gettherapistNotificationsCount = async () => {
      let count = 0;
      therapistnotifications.map((index) => {
        count++;
      });

      settherapistnotificationsCount(count);
    };
    gettherapistNotificationsCount();
  }, [therapistnotifications]);

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

  //read selected notification
  const notificationread = async (n_id) => {
    await Axios.get(
      `http://localhost:5000/notifications/readnotifications/${n_id}`
    );
    const updatednotifications = await Axios.post(
      "http://localhost:5000/notifications/",
      { username: username }
    );
    if (updatednotifications) {
      setNotifications(updatednotifications.data);
    }
  };

  const readTherapistNotifications = async (tn_id) => {
    await Axios.get(
      `http://localhost:5000/notifications/read_therapist__notifications/${tn_id}`
    );
    const updatedTherapistNotifications = await Axios.post(
      "http://localhost:5000/notifications/therapist_notifications",
      { fullname: fullname }
    );
    if (updatedTherapistNotifications) {
      settherapistnotifications(updatedTherapistNotifications.data);
    }
  };

  //fucntions for handling hovers
  const toggleHover = () => {
    sethoverable(!hoverable);
  };

  const falseHover = () => {
    sethoverable(false);
  };

  const toggleUserHover = () => {
    setUserHover(!hoverable);
  };

  const userfalseHover = () => {
    setUserHover(false);
  };

  const togglelistenernotificationshover = () => {
    sethovertherapistnotification(false);
    sethoverlistenernotifications(!hoverlistenernotification);
  };

  const toggleTherapistNotificationsHover = () => {
    sethoverlistenernotifications(false);
    sethovertherapistnotification(!hovertherapistnotification);
  };

  const toggleVolunteerHover = () => {
    setHoverVolunteer(false);
  };

  const toggleOnlineTherapyHover = () => {
    setHoverOnlineTherapy(false);
  };
  //end functions for handling hover

  //animation variable for holding proper classes for hover effect on items
  const animation =
    "transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 subpixel-antialiased";

  return (
    <>
      <div className='bg-green-900 bg-opacity-75'>
        <div className='flex flex-wrap justify-around items-center ml-12 h-16'>
          <ul className='flex flex-1 items-center justify-around space-x-4 ml-64'>
            <li className={animation}>
              <img
                src={Logo}
                className='text-center text-white text-lg subpixel-antialiased cursor-pointer 
                    realtive z-10 w-10 h-10 rounded-full overflow-hidden'
                toggleHover={falseHover}></img>
            </li>
            <li className={animation}>
              <NavItem to='/' title='Home' toggleHover={falseHover} />
            </li>
            <li className={animation}>
              <NavItem
                to='/community'
                title='Community'
                toggleHover={falseHover}
              />
            </li>
            <li className={animation}>
              <NavItem
                to='/creativecorner'
                title='Creative Corner'
                toggleHover={falseHover}
              />
            </li>
            {/* volunteer listeners hover menu */}
            <li className={animation}>
              {!token ? (
                <NavItem
                  to='/listeners'
                  title='Volunteer'
                  toggleHover={falseHover}
                />
              ) : (
                <div className='inline-block relative'>
                  <Link
                    className='text-center text-white text-lg subpixel-antialiased hover:font-black cursor-pointer'
                    onMouseEnter={() => setHoverVolunteer(true)}>
                    Volunteer
                  </Link>
                  <div
                    className={
                      hovervolunteer
                        ? "absolute block z-50 bg-green-900 rounded-md  bg-opacity-50 w-24"
                        : "hidden absolute z-50"
                    }
                    onMouseLeave={toggleVolunteerHover}>
                    <ul>
                      <li className={animation}>
                        <NavLink
                          to={`/listeners/chat/${userid}`}
                          className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                          Chat
                        </NavLink>
                      </li>

                      {access_level === 2 ? (
                        <li className={animation}>
                          <NavLink
                            to='/listeners'
                            className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                            Volunteers
                          </NavLink>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
                /* end volunteer listeners hover menu */
              )}
            </li>

            {/* advice side */}
            <li className={animation}>
              <div className='inline-block relative'>
                <Link
                  className='text-center text-white text-lg subpixel-antialiased hover:font-black cursor-pointer'
                  onMouseEnter={toggleHover}>
                  Advice
                </Link>
                <div
                  className={
                    hoverable
                      ? "absolute block z-50 bg-green-900 rounded-md  bg-opacity-50 w-24"
                      : "hidden absolute z-50"
                  }
                  onMouseLeave={falseHover}>
                  <ul>
                    <li className={animation}>
                      <NavLink
                        to='/advice'
                        className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                        Qoutes
                      </NavLink>
                    </li>

                    <li className={animation}>
                      <NavLink
                        to='/advice'
                        className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                        FAQ
                      </NavLink>
                    </li>

                    <li className={animation}>
                      <NavLink
                        to='/advice'
                        className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                        About
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* end advice side */}
            {/* start therapist side */}
            <li className={animation}>
              {!token ? (
                <NavItem
                  to='/therapists'
                  title='Online Therapy'
                  toggleHover={falseHover}
                />
              ) : (
                <div className='inline-block relative'>
                  <Link
                    className='text-center text-white text-lg subpixel-antialiased hover:font-black cursor-pointer'
                    onMouseEnter={() => setHoverOnlineTherapy(true)}>
                    Online Therapy
                  </Link>
                  <div
                    className={
                      hoveronlinetherapy
                        ? "absolute block z-50 bg-green-900 rounded-md  bg-opacity-50 w-24"
                        : "hidden absolute z-50"
                    }
                    onMouseLeave={toggleOnlineTherapyHover}>
                    <ul>
                      <li className={animation}>
                        <NavLink
                          to={`/therapists/chat/${userid}`}
                          className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                          Chat
                        </NavLink>
                      </li>

                      {access_level === 2 ? (
                        <li className={animation}>
                          <NavLink
                            to='/therapists'
                            className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                            Volunteers
                          </NavLink>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
                /* end volunteer listeners hover menu */
              )}
            </li>

            {/* end therapist side */}
          </ul>
          {/* end left part of navbar */}
          {/* right part list of navbar */}
          <ul
            className={
              !token
                ? `flex flex-1 justify-center items-start mt-1`
                : `flex flex-1 justify-center items-start mt-2`
            }
            onMouseLeave={userfalseHover}>
            {/* space for therapist Notifications */}
            {token ? (
              <li className='text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 subpixel-antialiased mr-8 mt-3'>
                {/* check therapist notifications count if greater than O then show notification count */}
                {therapistnotificationscount > 0 ? (
                  <span className='badge text-center rounded-full bg-red-500 px-1 object-right-top mb-4 text-sm mr-1'>
                    {therapistnotificationscount}
                  </span>
                ) : null}
                <FontAwesomeIcon
                  icon={faBriefcaseMedical}
                  className=' text-xl'
                  onClick={toggleTherapistNotificationsHover}></FontAwesomeIcon>

                {/* notifications List for therapist */}
                <div
                  onMouseLeave={toggleTherapistNotificationsHover}
                  className={
                    hovertherapistnotification
                      ? "absolute block z-50 bg-green-900 mt-4 rounded-md bg-opacity-50 overflow-auto w-48 h-40 p-4"
                      : "hidden absolute z-50"
                  }>
                  {/* check for notifications if greater than 0 than shows notifications otherwise show no new notifications */}
                  {therapistnotifications.length > 0 ? (
                    <ul>
                      {therapistnotifications.map((notification) => {
                        return (
                          <li
                            key={notification.tn_id}
                            className='flex justify-around divide-black divider-x-2'>
                            <p className='text-md text-justify text-center'>
                              {" "}
                              New Message From {notification.from_user}
                            </p>
                            <span>
                              <FontAwesomeIcon
                                className='ml-4 cursor-pointer'
                                icon={faTimes}
                                onClick={() =>
                                  readTherapistNotifications(notification.tn_id)
                                }
                              />
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className='text-md text-white'>No New Messages</p>
                  )}
                  {/* end check for notifications if greater than 0 than shows notifications otherwise show no new notifications */}
                </div>
              </li>
            ) : null}
            {/* end space for therapist Notifications */}

            {/* space for listener notifications */}
            {token ? (
              <li className='text-white transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-100 subpixel-antialiased mr-8 mt-3'>
                {/* check notifications count if greater the O then show notification count */}
                {notificationscount > 0 ? (
                  <span className='badge text-center rounded-full bg-red-500 px-1 object-right-top mb-4 text-sm mr-1'>
                    {notificationscount}
                  </span>
                ) : null}
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className=' text-xl'
                  onClick={togglelistenernotificationshover}></FontAwesomeIcon>
                {/* notifications List */}
                <div
                  onMouseLeave={togglelistenernotificationshover}
                  className={
                    hoverlistenernotification
                      ? "absolute block z-50 bg-green-900 mt-4 rounded-md bg-opacity-50 overflow-auto w-48 h-40 p-4"
                      : "hidden absolute z-50"
                  }>
                  {/* check for notifications if greater than 0 than shows notifications otherwise show no new notifications */}
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notification) => {
                        return (
                          <li
                            key={notification.n_id}
                            className='flex justify-around divide-black divider-x-2'>
                            <p className='text-md text-justify text-center'>
                              {" "}
                              New Message From {notification.from_user}
                            </p>
                            <span>
                              <FontAwesomeIcon
                                className='ml-4 cursor-pointer'
                                icon={faTimes}
                                onClick={() =>
                                  notificationread(notification.n_id)
                                }
                              />
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className='text-md text-white'>No New Messages</p>
                  )}
                  {/* end check for notifications if greater than 0 than shows notifications otherwise show no new notifications */}
                </div>
              </li>
            ) : null}
            {/*end  space for listener notifications */}

            {/* user icon */}
            <li className={animation}>
              <div className='inline-block relative'>
                {!token ? (
                  <FontAwesomeIcon
                    icon={faUser}
                    onMouseEnter={toggleUserHover}
                    className='text-center text-white mt-3 text-lg subpixel-antialiased cursor-pointer'
                  />
                ) : (
                  <img
                    onMouseEnter={toggleUserHover}
                    className='text-center text-white text-lg subpixel-antialiased cursor-pointer 
                    realtive z-10 w-10 h-10 rounded-full overflow-hidden'
                    src={`http://127.0.0.1:8887/userimgs/${pic}`}
                  />
                )}

                <div
                  className={
                    hoveruser
                      ? "absolute block z-50 bg-green-900 rounded-md bg-opacity-50 w-24"
                      : "hidden absolute z-50"
                  }
                  onMouseLeave={userfalseHover}>
                  {!token ? (
                    <ul>
                      <li className={animation}>
                        <NavLink
                          to='/register'
                          className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                          Sign-up
                        </NavLink>
                      </li>
                      <li className={animation}>
                        <NavLink
                          to='/login'
                          className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                          Login
                        </NavLink>
                      </li>
                    </ul>
                  ) : (
                    <ul className='mt-1'>
                      <li className={animation}>
                        <NavLink
                          to='/myprofile'
                          className='block text-center text-white text-md subpixel-antialiased hover:font-black'>
                          My profile
                        </NavLink>
                      </li>
                      <li className={animation}>
                        <a
                          onClick={logout}
                          className='block text-center text-white text-md cursor-pointer subpixel-antialiased hover:font-black'>
                          Logout
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </li>
            {/*end  user icon */}
          </ul>
          {/* end right part list of navbar */}
        </div>
      </div>
    </>
  );
}
