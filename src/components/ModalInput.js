import React from "react";
import ErrorAlert from "./errorAlert";

const ModalInput = ({ label, value, error, onchange }) => {
  return (
    <>
      <div className='mb-6 w-full'>
        <label className='capitalize  block text-black text-md ml-2'>
          {label === "cat_title"
            ? "Category Title"
            : label === "cat_desc"
            ? "Category Description"
            : `${label}: `}
        </label>

        {label === "cat_desc" ? (
          <textarea
            name='cat_desc'
            onChange={onchange}
            value={value}
            rows='4'
            cols='50'
            className='mr-4 appearance-none border rounded w-full text-md placeholder-black p-1 shadow-md outline-none focus:shadow-outline focus:bg-teal-100'
            placeholder='Enter Category Description'
          />
        ) : (
          <input
            type={
              label === "fullname" ||
              label === "username" ||
              label === "education" ||
              label === "cat_title"
                ? "text"
                : label === "email"
                ? "email"
                : label === "password"
                ? "password"
                : "number"
            }
            className={
              "mr-4 appearance-none border rounded w-full text-md placeholder-black p-1 shadow-md outline-none focus:shadow-outline focus:bg-teal-100"
            }
            name={label === "password" ? "pass" : `${label}`}
            onChange={onchange}
            value={value}
            placeholder={
              label === "cat_title" ? "Enter Category Title" : `Enter ${label}`
            }
          />
        )}
        {error ? <ErrorAlert error={error} /> : null}
      </div>
    </>
  );
};

export default ModalInput;
