import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ModalInput from "../../../../components/ModalInput";
import GreenButton from "../../../../components/button";
import SecondaryButton from "../../../../components/SecondaryButton";

import ValidateErrors from "../validatecategory";
import Axios from "axios";

const CreateCategoriesModal = ({ show, handlehide, setStage }) => {
  const initialvalues = {
    cat_title: "",
    cat_desc: "",
  };

  const [values, setvalues] = useState({ initialvalues });

  const [errors, seterrors] = useState({});

  const handleonChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const validate = await ValidateErrors(values);
    seterrors(validate);
    const formdata = new FormData();
    formdata.set("cat_title", values.cat_title);
    formdata.set("cat_desc", values.cat_desc);

    if (Object.keys(validate).length === 0) {
      const newTherapist = await Axios.post(
        "http://localhost:5000/admin/createcategory",
        formdata
      );
      if (newTherapist) {
        setStage(4);
        setvalues(initialvalues);
        handlehide();
      }
    }
  };

  return (
    <>
      <Dialog
        open={show}
        onClose={handlehide}
        className='mt-5'
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        has>
        <>
          <DialogTitle className='bg-gray-200'>Add New Category</DialogTitle>
          <DialogContent className='bg-gray-100'>
            <form onSubmit={handleonSubmit} className='w-full'>
              <ModalInput
                label='cat_title'
                value={values.cat_title}
                onchange={handleonChange}
                error={errors.cat_title}
              />
              <ModalInput
                label='cat_desc'
                value={values.cat_desc}
                onchange={handleonChange}
                error={errors.cat_desc}
              />
            </form>

            <DialogActions>
              <GreenButton autoFocus text='Create' action={handleonSubmit} />
              <SecondaryButton text='Close' action={handlehide} />
            </DialogActions>
          </DialogContent>
        </>
      </Dialog>
    </>
  );
};

export default CreateCategoriesModal;
