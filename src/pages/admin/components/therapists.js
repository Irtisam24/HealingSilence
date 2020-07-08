import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";

import EditTherapistModal from "./modals/editTherapistModal";

const Therapists = ({ therapists }) => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});

  //function for passing the selected user data to the modal in case of edit
  const handleShow = (user) => {
    setShow(true);
    setUser({
      t_id: user.t_id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      phone: user.phone,
      age: user.age,
      education: user.education,
    });
  };

  //handle closing of edit Modal
  const handlehide = () => {
    setShow(false);
  };

  //configure animations
  const config = { mass: 5, tension: 2000, friction: 200 };

  const props = useSpring({
    from: {
      opacity: 0,
      marginLeft: -500,
    },
    to: { opacity: 1, marginLeft: 0 },
  });

  if (therapists.length === 0) {
    return (
      <>
        <p>No therapist found</p>
      </>
    );
  } else {
    return (
      <>
        <EditTherapistModal
          show={show}
          handlehide={handlehide}
          user={user}
          setUser={setUser}
        />

        <animated.div style={props}>
          <div class='w-full mt-12 h-sm overflow-y-auto overflow-x-hidden'>
            <p class='text-xl pb-3 flex items-center'>
              <FontAwesomeIcon icon={faList} className='mr-4 text-indigo-400' />{" "}
              All Therapists
            </p>

            <div class='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div class='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table class='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Therapist Name
                      </th>
                      <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Education
                      </th>
                      <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Email
                      </th>
                      <th class='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {therapists.map((user) => {
                      return (
                        <tr>
                          <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div class='flex items-center'>
                              <div class='flex-shrink-0 w-10 h-10'>
                                <img
                                  class='w-full h-full rounded-full'
                                  src={
                                    user.pic
                                      ? `http://127.0.0.1:8887/therapists/${user.pic}`
                                      : `http://127.0.0.1:8887/default/avatar.jpg`
                                  }
                                  alt=''
                                />
                              </div>
                              <div class='ml-3'>
                                <p class='text-gray-900 whitespace-no-wrap'>
                                  {user.fullname}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p class='text-gray-900 whitespace-no-wrap'>
                              {user.education}
                            </p>
                          </td>
                          <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p class='text-gray-900 whitespace-no-wrap'>
                              {user.email}
                            </p>
                          </td>
                          <td class='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <button
                              className='text-white font-bold bg-teal-600 rounded-md p-2 mt-2 mb-2 transition duration-500 ease-in-out hover:bg-teal-800 
                              transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased'
                              onClick={() => handleShow(user)}>
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </animated.div>
      </>
    );
  }
};

export default Therapists;
