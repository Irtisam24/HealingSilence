import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhotoVideo,
  faUser,
  faComments,
  faStickyNote,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Axios from "axios";

import Users from "./components/users";
import CreativePosts from "./components/creativecornerposts";
import Therapists from "./components/therapists";
import Categories from "./components/categories";
import Threads from "./components/threads";
import ForumPosts from "./components/forumposts";
import CreateTherapistModal from "./components/modals/createTherapistModal";
import CreateCategoriesModal from "./components/modals/createCategoriesModal";
import PendingPosts from "./components/pendingposts";

const AdminPanel = () => {
  //states for storing admin data
  const [users, setusers] = useState([]);
  const [therapists, settherapists] = useState([]);
  const [categories, setcategories] = useState([]);
  const [forumposts, setforumposts] = useState([]);
  const [creative_corner_posts, setcreative_corner_posts] = useState([]);
  const [forumtopics, setForumTopics] = useState([]);
  const [pendingposts, setpendingposts] = useState([]);

  //states for controlling modals and dropdowns
  const [dropdownshow, setdropdownshow] = useState(false);
  const [stage, setStage] = useState(1);
  const [showTherapistModal, setTherapistShow] = useState(false);
  const [categoriesModal, setCategoriesModal] = useState(false);

  //Get admin data
  useEffect(() => {
    const getAdminData = async () => {
      const admindata = await Axios.get("http://localhost:5000/admin/");
      if (admindata) {
        /* Destructure the result from api to store it in the states */
        const {
          user,
          creative_corner_posts,
          forum_posts,
          therapists,
          topics,
          categories,
          pendingApprovalPosts,
        } = admindata.data;
        setusers(user);
        settherapists(therapists);
        setForumTopics(topics);
        setcreative_corner_posts(creative_corner_posts);
        setcategories(categories);
        setforumposts(forum_posts);
        setpendingposts(pendingApprovalPosts);
      }
    };
    getAdminData();
  }, [stage]);

  //set phase of page according to which the required table will be shown
  const setphase = (phase) => {
    setStage(phase);
  };

  //Therapist Modal Logic
  const handleTherapistShow = () => {
    setTherapistShow(true);
  };

  const handleTherapisthide = () => {
    setTherapistShow(false);
  };

  //Category Modal logic
  const handleCategoryShow = () => {
    setCategoriesModal(true);
  };

  const handleCategoryhide = () => {
    setCategoriesModal(false);
  };

  //function for rendering required components
  const rendercomponent = () => {
    switch (stage) {
      case 1:
        return <Users users={users} />;
      case 2:
        return <CreativePosts creativeposts={creative_corner_posts} />;
      case 3:
        return <Therapists therapists={therapists} />;
      case 4:
        return <Categories categories={categories} />;
      case 5:
        return <Threads topics={forumtopics} />;
      case 6:
        return <ForumPosts posts={forumposts} />;
      case 7:
        return <PendingPosts pendingposts={pendingposts} setphase={setphase} />;
      default:
        return <Users users={users} />;
    }
  };

  //render page
  return (
    <>
      <div className='bg-green-300'>
        <Navbar />
      </div>
      <div className='flex'>
        {/*Sending stage and setstage to these modal taa k creation k baad redirect kr sakayn respective table py */}
        <CreateTherapistModal
          show={showTherapistModal}
          handlehide={handleTherapisthide}
          stage={stage}
          setStage={setStage}
        />
        <CreateCategoriesModal
          show={categoriesModal}
          handlehide={handleCategoryhide}
          setStage={setStage}
        />

        {/*Side Bar */}
        <div className='relative bg-green-900 h-screen w-64 hidden sm:block shadow-xl'>
          <div className='p-6'>
            <p className='text-white text-3xl font-semibold uppercase hover:text-gray-300'>
              Admin
            </p>
            <button
              className='w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center'
              onClick={() => setdropdownshow(!dropdownshow)}>
              <FontAwesomeIcon icon={faPlus} className='mr-3' /> Create Content
            </button>

            {/*drop down button logic */}
            {dropdownshow ? (
              <>
                <button
                  className='w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center'
                  onClick={handleTherapistShow}>
                  <FontAwesomeIcon icon={faPlus} className='mr-3' /> Create
                  Therapist
                </button>
                <button
                  className='w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center'
                  onClick={handleCategoryShow}>
                  <FontAwesomeIcon icon={faPlus} className='mr-3' /> Create
                  Category
                </button>
              </>
            ) : null}
          </div>
          {/*end drop down button logic */}

          <nav className='text-white text-base font-semibold pt-3'>
            <a
              className={
                stage === 1
                  ? "flex items-center active-nav-link text-white py-4 pl-6 nav-item cursor-pointer"
                  : "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
              }
              onClick={() => setphase(1)}>
              Dashboard
            </a>

            <a
              className={
                stage === 3
                  ? "flex items-center active-nav-link text-white py-4 pl-6 nav-item cursor-pointer"
                  : "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
              }
              onClick={() => setphase(3)}>
              Therapists
            </a>
            <a
              className={
                stage === 2
                  ? "flex items-center active-nav-link text-white py-4 pl-6 nav-item cursor-pointer"
                  : "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
              }
              onClick={() => setphase(2)}>
              Creative Corner Posts
            </a>

            <a
              className={
                stage === 4
                  ? "flex items-center active-nav-link text-white py-4 pl-6 nav-item cursor-pointer"
                  : "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
              }
              onClick={() => setphase(4)}>
              Forum Categories
            </a>

            <a
              className={
                stage === 5
                  ? "flex items-center active-nav-link text-white py-4 pl-6 nav-item cursor-pointer"
                  : "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
              }
              onClick={() => setphase(5)}>
              Forum Threads
            </a>

            <a
              className={
                stage === 6
                  ? "flex items-center active-nav-link text-white py-4 pl-6 nav-item cursor-pointer"
                  : "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
              }
              onClick={() => setphase(6)}>
              Forum Posts
            </a>

            <a
              className={
                stage === 7
                  ? "flex items-center active-nav-link text-white py-4 pl-6 nav-item cursor-pointer"
                  : "flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item cursor-pointer"
              }
              onClick={() => setphase(7)}>
              Pending Posts
            </a>
          </nav>
        </div>
        {/*End Side Bar */}

        {/*OverView Cards */}
        <div className='w-full overflow-x-hidden border-t flex'>
          <main className='w-full flex-grow p-6'>
            <h1 className='text-3xl text-black pb-6 mt-4'>Overview</h1>

            <div className='flex'>
              <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0'>
                <div className='flex items-center px-5 py-6 shadow-lg rounded-md bg-white'>
                  <div className='p-3 rounded-full bg-opacity-75'>
                    <FontAwesomeIcon
                      icon={faUser}
                      className='text-indigo-400 text-2xl'
                    />
                  </div>

                  <div className='mx-5'>
                    <h4 className='text-2xl font-semibold text-gray-700'>
                      {users.length}
                    </h4>
                    <div className='text-gray-500'>Total Users</div>
                  </div>
                </div>
              </div>

              <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0'>
                <div className='flex items-center px-5 py-6 shadow-lg rounded-md bg-white'>
                  <div className='p-3 rounded-full  bg-opacity-75'>
                    <FontAwesomeIcon
                      icon={faPhotoVideo}
                      className='text-indigo-400 text-2xl'
                    />
                  </div>

                  <div className='mx-5'>
                    <h4 className='text-2xl font-semibold text-gray-700'>
                      {creative_corner_posts.length}
                    </h4>
                    <div className='text-gray-500'>Total Posts</div>
                  </div>
                </div>
              </div>

              <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0'>
                <div className='flex items-center px-5 py-6 shadow-lg rounded-md bg-white'>
                  <div className='p-3 rounded-full  bg-opacity-75'>
                    <FontAwesomeIcon
                      icon={faStickyNote}
                      className='text-indigo-400 text-2xl'
                    />
                  </div>

                  <div className='mx-5'>
                    <h4 className='text-2xl font-semibold text-gray-700'>
                      {forumtopics.length}
                    </h4>
                    <div className='text-gray-500'>Total Forum Threads</div>
                  </div>
                </div>
              </div>

              <div className='w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0'>
                <div className='flex items-center px-5 py-6 shadow-lg rounded-md bg-white'>
                  <div className='p-3 rounded-full  bg-opacity-75'>
                    <FontAwesomeIcon
                      icon={faComments}
                      className='text-indigo-400 text-2xl'
                    />
                  </div>

                  <div className='mx-5'>
                    <h4 className='text-2xl font-semibold text-gray-700'>
                      {forumposts.length}
                    </h4>
                    <div className='text-gray-500'>Total Forum Posts</div>
                  </div>
                </div>
              </div>
            </div>
            {/*End OverView Cards */}

            {/*All records for the selected List Table Section */}
            {rendercomponent()}
            {/*End All records List Table Section */}
          </main>
        </div>
      </div>

      <div className='bg-green-300'>
        <Footer />
      </div>
    </>
  );
};

export default AdminPanel;
