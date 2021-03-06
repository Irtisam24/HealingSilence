import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";

const ModalValidation = (initialvalues, validate) => {
  const usercontext = useContext(UserContext);
  const { userdetails } = usercontext;

  const [values, setValues] = useState({ initialvalues });
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState("");

  const handleonChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handlefile = (event) => {
    const uimg = event.target.files[0];
    setFile(uimg);
  };

  const handleonSubmit = async (e) => {
    e.preventDefault();
    const validaterrors = await validate(values, file);
    setErrors(validaterrors);
    const formdata = new FormData();
    formdata.set("title", values.title);
    formdata.set("description", values.description);
    formdata.set("userid", userdetails.userid);
    formdata.append("file", file);

    if (Object.keys(validaterrors).length === 0) {
      const newPost = await axios.post(
        "http://localhost:5000/creativecorner/createpost",
        formdata,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (newPost.data) {
        window.location.reload();
      }
    }
  };

  return { handleonSubmit, handlefile, handleonChange, values, errors };
};

export default ModalValidation;
