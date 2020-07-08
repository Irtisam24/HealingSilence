import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ModalInput from "../../../../components/ModalInput";
import GreenButton from "../../../../components/button";
import SecondaryButton from "../../../../components/SecondaryButton";

import ValidateErrors from "../validateerrors";
import Axios from "axios";

const CreateTherapistModal = ({ show, handlehide, setStage }) => {
  const initialvalues = {
    fullname: "",
    email: "",
    username: "",
    pass: "",
    phone: "",
    age: "",
    education: "",
  };

  const [values, setvalues] = useState({ initialvalues });
  const [file, setfile] = useState("");
  const [errors, seterrors] = useState({});

  const handleonChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handlefile = (e) => {
    const uimg = e.target.files[0];
    setfile(uimg);
  };

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const validate = await ValidateErrors(values);
    seterrors(validate);
    const formdata = new FormData();
    formdata.set("fullname", values.fullname);
    formdata.set("email", values.email);
    formdata.set("phone", values.phone);
    formdata.set("age", values.age);
    formdata.set("username", values.username);
    formdata.set("pass", values.pass);
    formdata.set("education", values.education);
    formdata.append("file", file);
    if (Object.keys(validate).length === 0) {
      const newTherapist = await Axios.post(
        "http://localhost:5000/admin/createtherapist",
        formdata
      );
      if (newTherapist) {
        setStage(3);
        setvalues(initialvalues);
        handlehide();
      }
    }
  };

  return (
    <Dialog
      open={show}
      onClose={handlehide}
      className='mt-5'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      has>
      <>
        <DialogTitle className='bg-gray-200'>Add A New Therapist</DialogTitle>
        <DialogContent className='bg-gray-100'>
          <form onSubmit={handleonSubmit}>
            <ModalInput
              label='fullname'
              value={values.fullname}
              onchange={handleonChange}
              error={errors.fullname}
            />
            <ModalInput
              label='email'
              value={values.email}
              onchange={handleonChange}
              error={errors.email}
            />
            <ModalInput
              label='username'
              value={values.username}
              onchange={handleonChange}
              error={errors.username}
            />
            <ModalInput
              label='password'
              value={values.password}
              onchange={handleonChange}
              error={errors.password}
            />
            <ModalInput
              label='phone'
              value={values.phone}
              onchange={handleonChange}
              error={errors.phone}
            />
            <ModalInput
              label='age'
              value={values.age}
              onchange={handleonChange}
              error={errors.age}
            />
            <ModalInput
              label='education'
              value={values.education}
              onchange={handleonChange}
              error={errors.education}
            />
            <div>
              <input
                type='file'
                className='mr-4 appearance-none border rounded w-full text-md placeholder-black p-1 shadow-md outline-none focus:shadow-outline focus:bg-teal-100'
                onChange={handlefile}
              />
            </div>
          </form>

          <DialogActions>
            <GreenButton autoFocus text='Create' action={handleonSubmit} />
            <SecondaryButton text='Close' action={handlehide} />
          </DialogActions>
        </DialogContent>
      </>
    </Dialog>
  );
};

export default CreateTherapistModal;
