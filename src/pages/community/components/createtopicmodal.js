import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ModalValidation from "../components/ModalValidation";
import Validate from "../components/validatepost";
import GreenButton from "../../../components/button";
import SecondaryButton from "../../../components/SecondaryButton";
import ErrorAlert from "../../../components/errorAlert";

import UserContext from "../../../context/UserContext";

const CreateTopicModal = ({ show, catid, handlehide }) => {
  const initialvalues = {
    title: "",
    description: "",
    file: "",
  };

  const {
    userdetails: { token },
  } = useContext(UserContext);
  const {
    handleonChange,
    handleonSubmit,
    handlefile,
    values,
    errors,
  } = ModalValidation(initialvalues, Validate, catid);

  return (
    <>
      <Dialog
        open={show}
        onClose={handlehide}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        has
        className='rounded-lg mt-5 shadow-md'>
        <>
          <DialogTitle className='bg-gray-200'>Add New Topic</DialogTitle>
          <DialogContent>
            {token ? (
              <form onSubmit={handleonSubmit} className='w-full'>
                {/* post title input and Label */}
                <label className='capitalize block text-black text-md ml-2 mt-4 '>
                  Topic Title
                </label>
                <input
                  type='text'
                  name='title'
                  className='mr-4 mb-4 appearance-none border rounded w-full text-md placeholder-black p-1 shadow-md outline-none focus:shadow-outline focus:bg-teal-100'
                  placeholder='Enter The Title of the Post'
                  onChange={handleonChange}
                />
                {errors.title ? <ErrorAlert error={errors.title} /> : null}

                {/* post description title and Label */}
                <label className='capitalize block text-black text-md ml-2 '>
                  Topic Description
                </label>
                <textarea
                  rows='4'
                  cols='50'
                  name='description'
                  className='mr-4 mb-4 appearance-none border rounded w-full text-md placeholder-black p-1 shadow-md outline-none focus:shadow-outline focus:bg-teal-100'
                  placeholder='Enter Post Description'
                  onChange={handleonChange}
                />
                {errors.description ? (
                  <ErrorAlert error={errors.description} />
                ) : null}

                {/* file upload */}
                <div>
                  <input
                    type='file'
                    className='mr-4 mb-4 appearance-none border rounded w-full text-md placeholder-black p-1 shadow-md outline-none focus:shadow-outline focus:bg-teal-100'
                    onChange={handlefile}
                  />
                  {errors.file ? <ErrorAlert error={errors.file} /> : null}
                </div>
              </form>
            ) : (
              <ErrorAlert error='You Must be Logged in Before You can Post Anything' />
            )}
            <DialogActions>
              {token ? (
                <GreenButton autoFocus text='Create' action={handleonSubmit} />
              ) : null}
              <SecondaryButton text='Close' action={handlehide} />
            </DialogActions>
          </DialogContent>
        </>
      </Dialog>
    </>
  );
};

export default CreateTopicModal;
