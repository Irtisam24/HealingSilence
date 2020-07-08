import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Therapist from "./components/therspist";
import UserContext from "../../context/UserContext";
import Axios from "axios";

const TherapisIndex = () => {
  const [therspistsList, setTherapistLists] = useState([]);

  //get all therapists
  useEffect(() => {
    const getTherapists = async () => {
      const alltherapists = await Axios.get("http://localhost:5000/therapist");
      if (alltherapists) {
        setTherapistLists(alltherapists.data);
      }
    };
    getTherapists();
  }, []);

  const {
    userdetails: { userid },
  } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <div className='listeners_list_container bg-gray-300 pb-12'>
        {therspistsList.map((therapist) => {
          return (
            <Therapist
              therapist={therapist}
              userid={userid}
              key={therapist.t_id}
            />
          );
        })}
      </div>
      <div className=''>
        <Footer />
      </div>
    </>
  );
};

export default TherapisIndex;
