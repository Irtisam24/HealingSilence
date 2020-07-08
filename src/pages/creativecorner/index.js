import React, { useState, useEffect } from "react";
import Header from "../creativecorner/header";
import Navbar from "../../components/navbar";
import Post from "./components/post";
import Axios from "axios";
import Footer from "../../components/footer";

export default function CreativeCorner() {
  const [posts, setposts] = useState([]);
  //const [isloading,setisloading]=useState(true)

  useEffect(() => {
    const getallposts = async () => {
      const allposts = await Axios.get("http://localhost:5000/creativecorner/");
      setposts(allposts.data);
      // setisloading(false)
    };
    getallposts();
  }, []);

  return (
    <>
      <Navbar />

      <div
        className='bg-no-repeat bg-scroll bg-right-bottom bg-gray-300 '
        style={{
          backgroundImage: `url(${require("../../pictures/ccbg.png")})`,
        }}>
        <Header />
        <Post posts={posts} />
        <Footer />
      </div>
    </>
  );
}
