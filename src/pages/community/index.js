import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Axios from "axios";
import { Link } from "react-router-dom";
import Header from "../community/components/header";

const Community = () => {
  const [data, setData] = useState([]);
  const [totalposts, setTotalPosts] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const catData = await Axios.get("http://localhost:5000/community/");
      if (catData) {
        setData(catData.data[0]);
        setTotalPosts(catData.data[1]);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Navbar />

      <Header />
      <div
        className='bg-no-repeat bg-scroll bg-right-bottom bg-gray-300 h-screen -mt-16'
        style={{
          backgroundImage: `url(${require("../../pictures/ccbg.png")})`,
        }}>
        <div className='container mt-5 ml-sm mb-12 mt-16 bg-gray-300 pt-24'>
          <table className='min-w-full leading-normal border-l-2 border-r-2 border-gray-200'>
            <thead>
              <tr className='text-white text-xl'>
                <th className='px-5 py-3 border-b-2 border-gray-300 bg-green-400 text-left text-xs font-semibold uppercase tracking-wider'>
                  Category
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-300 bg-green-400 text-left text-xs font-semibold uppercase tracking-wider'>
                  Total Threads
                </th>
                <th className='px-5 py-3 border-b-2 border-gray-300 bg-green-400 text-left text-xs font-semibold uppercase tracking-wider'>
                  Latest Thread
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((category) => {
                return (
                  <tr>
                    <td className='px-5 py-5 border-b border-gray-300 bg-white text-md border-grey-light border'>
                      <div className='flex items-center'>
                        <div className='ml-3'>
                          <p className='text-gray-900 whitespace-no-wrap'>
                            <Link to={`/community/${category.cat_id}`}>
                              {category.cat_title}
                            </Link>
                            <br />
                            <span className='mt-3'>{category.cat_desc}</span>
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-5 py-5 border-b border-gray-300 bg-white text-md border-grey-light border'>
                      {totalposts.map((total) => {
                        return (
                          <>
                            {total.cat_id == category.cat_id ? (
                              <p className='text-gray-900 whitespace-no-wrap text-center'>
                                {total.count}
                              </p>
                            ) : null}
                          </>
                        );
                      })}
                    </td>
                    <td className='px-5 py-5 border-b border-gray-300 bg-white text-md border-grey-light border'>
                      <p className='text-gray-900 whitespace-no-wrap'>
                        {category.topic_title ? (
                          <Link
                            to={`/community/${category.cat_id}/${category.topic_id}`}>
                            {category.topic_title}
                          </Link>
                        ) : (
                          "No Post Made in this Category"
                        )}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Community;
