import React, { useEffect, useState, useContext } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import CreateTopicModal from "../community/components/createtopicmodal";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import "./category.css";
import Header from "../community/components/header";
const CategoryView = ({ match }) => {
  const {
    params: { catid },
  } = match;
  const {
    userdetails: { userid },
  } = useContext(UserContext);
  const [topics, settopics] = useState([]);
  const [postCount, SetPostCount] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const errors = [];

  let Title;

  useEffect(() => {
    const gettopics = async () => {
      const alltopics = await Axios.get(
        `http://localhost:5000/community/${catid}`
      );
      if (alltopics) {
        settopics(alltopics.data[0]);
        SetPostCount(alltopics.data[1]);
      }
    };
    gettopics();
  }, []);

  const handlehide = () => {
    setModalShow(false);
  };

  topics.map((topic) => {
    Title = topic.cat_title;
  });

  return (
    <>
      <Navbar />
      <Header />
      <CreateTopicModal
        show={modalShow}
        handlehide={handlehide}
        catid={catid}
      />
      <div
        className='bg-no-repeat bg-scroll bg-right-bottom bg-gray-300 h-screen -mt-16'
        style={{
          backgroundImage: `url(${require("../../pictures/ccbg.png")})`,
        }}>
        <div
          style={{ width: "60%" }}
          className='container mt-5 ml-sm mb-12 mt-16 bg-gray-300 pt-24'>
          <div className='card_categories'>
            <div className='card-header header_categories bg-green-400'>
              <p className='text-xl text-white mt-4 ml-4 text-center'>
                {Title}
              </p>
              <button
                className='text-white bg-green-500  rounded-md p-2 mt-2 mb-2 ml-2 mr-2 transition duration-500 ease-in-out hover:bg-green-600 
            transform hover:-translate-y-1 hover:scale-105 subpixel-antialiased'
                onClick={() => setModalShow(true)}>
                Create new Topic
              </button>
            </div>
            <table className='min-w-full leading-normal border-l-2 border-r-2 border-gray-200'>
              <thead>
                <tr className='text-white text-xl'>
                  <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-500 text-left text-xs font-semibold uppercase tracking-wider'>
                    Thread Title
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-500 text-left text-xs font-semibold uppercase tracking-wider'>
                    Total Posts
                  </th>
                  <th className='px-5 py-3 border-b-2 border-gray-300 bg-gray-500 text-left text-xs font-semibold uppercase tracking-wider'>
                    Created By
                  </th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic) => {
                  return (
                    <tr key={topic.topic_id}>
                      <td className='px-5 py-5 border-b border-gray-300 bg-white text-md border-grey-light border'>
                        <div className='flex items-center'>
                          <div className='ml-3'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              <Link
                                to={`/community/${topic.cat_id}/${topic.topic_id}`}>
                                {topic.topic_title}
                              </Link>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-5 py-5 border-b border-gray-300 bg-white text-md border-grey-light border'>
                        {postCount.map((replies) => {
                          return (
                            <>
                              {topic.topic_id === replies.topic_id ? (
                                <p className='text-gray-900 whitespace-no-wrap text-center'>
                                  {replies.count}
                                </p>
                              ) : null}
                            </>
                          );
                        })}
                      </td>
                      <td className='px-5 py-5 border-b border-gray-300 bg-white text-md border-grey-light border'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                          {topic.username}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <div className='my-4 w-60 rounded-md shadow-lg' ref={createtopicbox}>
        <h5 className=''>Create a New Topic:</h5>
        <div className='card-body'>
          <form onSubmit={handlesubmit}>
            <div className='form-group'>
              <label className='form-control-label' for='posttitle'>
                Post Title
              </label>
              <input
                className='form-control'
                name='posttitle'
                onChange={(e) => setPostTitle(e.target.value)}></input>
            </div>
            <div className='form-group'>
              <label className='form-control-label' for='reply'>
                Post Description
              </label>
              <textarea
                className='form-control'
                rows='3'
                name='reply'
                onChange={(e) => setPostDesc(e.target.value)}></textarea>
              {errors.reply ? (
                <p className='alert alert-danger mt-2'>{errors.reply}</p>
              ) : null}
              {errors.login ? (
                <p className='alert alert-danger mt-2'>{errors.login}</p>
              ) : null}

              <div className='custom-file mt-2'>
                <input
                  type='file'
                  onChange={(e) => setfile(e.target.files[0])}
                />
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div> */}

      <Footer />
    </>
  );
};

export default CategoryView;
