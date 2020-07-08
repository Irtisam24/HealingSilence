import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { useSpring, animated } from "react-spring";

import EditCategoryModal from "./modals/editCategoryModal";

const Categories = ({ categories }) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState({});

  const handleShow = (category) => {
    setShow(true);
    setCategory({
      cat_id: category.cat_id,
      cat_title: category.cat_title,
      cat_desc: category.cat_desc,
    });
  };

  const handlehide = () => {
    setShow(false);
  };

  //configure animations
  const props = useSpring({
    from: {
      opacity: 0,
      marginLeft: -500,
    },
    to: { opacity: 1, marginLeft: 0 },
  });

  const animation =
    "transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-y-110 subpixel-antialiased";

  if (categories.length === 0) {
    return (
      <>
        <p>No Category found</p>
      </>
    );
  } else {
    return (
      <>
        <EditCategoryModal
          show={show}
          handlehide={handlehide}
          category={category}
          setCategory={setCategory}
        />

        <animated.div style={props}>
          <div className='w-full mt-12 h-sm overflow-y-auto overflow-x-hidden'>
            <p className='text-xl pb-3 flex items-center'>
              <FontAwesomeIcon icon={faList} className='mr-4 text-indigo-400' />{" "}
              All Forum Categories
            </p>

            <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
              <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                <table className='min-w-full leading-normal'>
                  <thead>
                    <tr>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Category Title
                      </th>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Category Description
                      </th>
                      <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>
                        Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((item) => {
                      return (
                        <tr className={animation}>
                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <div className='flex items-center'>
                              <div className='ml-3'>
                                <p className='text-gray-900 whitespace-no-wrap'>
                                  {item.cat_title}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <p className='text-gray-900 whitespace-no-wrap'>
                              {item.cat_desc}
                            </p>
                          </td>

                          <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            <button
                              className='text-white font-bold bg-teal-600 rounded-md p-2 mt-2 mb-2 transition duration-500 ease-in-out hover:bg-teal-800 
                         transform hover:-translate-y-1 hover:scale-110 subpixel-antialiased'
                              onClick={() => handleShow(item)}>
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

export default Categories;
