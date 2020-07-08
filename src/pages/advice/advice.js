import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Axios from "axios";
import Spinner from "./components/spinner";
import RandomQoute from "./components/qoute";
import GreenButton from "../../components/button";

const Advice = () => {
  const [advices, setAdvices] = useState([]);
  const [randomqoute, setRandomQoute] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const getadvice = async () => {
      const getadviceres = await Axios.get("https://type.fit/api/quotes");
      if (getadviceres.data) {
        setRandomQoute(
          getadviceres.data[
            Math.floor(Math.random() * getadviceres.data.length)
          ]
        );
        setAdvices(getadviceres.data);
        setIsLoading(false);
      }
    };
    getadvice();
  }, []);


  const changeqoute=()=>{
    setIsLoading(true)
    setRandomQoute(
        advices[
          Math.floor(Math.random() * advices.length)
        ]
      );
    setIsLoading(false)
  }


  return (
    <>
      
        <div className='bg-no-repeat bg-cover h-screen' style={{backgroundImage:`url(${require('../../pictures/advice.jpeg')})`}}>
        <Navbar />
        <div className="container m-auto mt-32 box-border bg-gray-300 bg-opacity-75 rounded-md space-y-4 shadow-lg flex flex-col items-center justify-center">
          <div className="w-full bg-gray-500">
            <h4 className="text-2xl text-black ml-4 flex-1">Inspirational Qoutes</h4>
          </div>
          <div className="h-full w-full mt-4 p-4 flex flex-1 justify-center">
            {isloading ? <Spinner /> : (<>
            <RandomQoute qoute={randomqoute} />
            </>)}
            </div>
            {!isloading ? (<div className='flex flex-1 justify-center'>
            <GreenButton action={changeqoute} text='Get More Qoutes'/>
            </div>):null}
            
    
        </div>
        

      </div>
    </>
  );
};

export default Advice;
