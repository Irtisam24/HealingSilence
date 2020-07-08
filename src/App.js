import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import Axios from "axios";

//Pages import
import AdminPanel from "./pages/admin/index";
import Home from "./pages/home/Home";
import Registerpage from "../src/pages/login/registerpage";
import CreativeCorner from "./pages/creativecorner/index";
import SinglePost from "./pages/creativecorner/components/singlePost";
import UserContext from "./context/UserContext";
import Chat from "./pages/chat";
import Messages from "./pages/chat/messages";
import Community from "./pages/community";
import CategoryView from "./pages/community/categoryview";
import SingleThread from "./pages/community/singleThread";
import TherapistIndex from "./pages/therapists/index";
import TherapistChat from "./pages/therapists/components/chat";
import Advice from "./pages/advice/advice";
import MyProfile from "./pages/profiles/myprofile";
import NotFound from "./pages/notfound/404";

function App() {
  const [userdetails, setuserdetails] = useState({
    token: undefined,
    userid: undefined,
    fullname: undefined,
    username: undefined,
    pic: undefined,
    email: undefined,
    phone: undefined,
    age: undefined,
    access_level: undefined,
  });

  const location = useLocation();

  const [register, setregister] = useState(true);

  const changeregister = () => {
    if (register) {
      setregister(false);
    } else {
      setregister(true);
    }
  };

  useEffect(() => {
    const verifyuser = async () => {
      let token = localStorage.getItem("x-auth-token");
      if (token === null) {
        localStorage.setItem("x-auth-token", " ");
        token = "";
      }
      const result = await Axios.post(
        "http://localhost:5000/user/verify",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (result.data) {
        const getuser = await Axios.get("http://localhost:5000/user/getuser", {
          headers: { "x-auth-token": token },
        });

        setuserdetails({
          token: token,
          userid: getuser.data.rows[0].user_id,
          username: getuser.data.rows[0].username,
          fullname: getuser.data.rows[0].fullname,
          pic: getuser.data.rows[0].pic,
          email: getuser.data.rows[0].email,
          age: getuser.data.rows[0].age,
          phone: getuser.data.rows[0].phone,
          access_level: getuser.data.rows[0].access_lvl,
        });
      }
    };
    verifyuser();
  }, []);

  const transition = useTransition(location, (location) => location.pathname, {
    from: {
      position: "absolute",
      width: "100%",
      opacity: 0,
      transform: "translate(100%,0)",
    },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" },
  });

  return (
    <>
      <UserContext.Provider value={{ userdetails, setuserdetails }}>
        {transition.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route exact={true} path='/' component={Home}></Route>

              <Route
                exact={true}
                path='/register'
                render={(props) => (
                  <Registerpage
                    {...props}
                    register={register}
                    changeregister={changeregister}
                    userdetails={userdetails}
                  />
                )}></Route>

              <Route
                exact={true}
                path='/login'
                render={(props) => (
                  <Registerpage
                    {...props}
                    register={register}
                    changeregister={changeregister}
                    userdetails={userdetails}
                  />
                )}></Route>

              {/*creative corner routes*/}
              <Route
                exact={true}
                path='/creativecorner'
                component={CreativeCorner}
              />
              <Route
                exact={true}
                path='/creativecorner/:postid'
                component={SinglePost}
              />

              {/*community Routes */}
              <Route exact={true} path='/community' component={Community} />
              <Route
                exact={true}
                path='/community/:catid'
                component={CategoryView}
              />
              <Route
                exact={true}
                path='/community/:catid/:topicid'
                component={SingleThread}
              />

              {/*Therapists Routes*/}
              <Route
                exact={true}
                path='/therapists'
                component={TherapistIndex}
              />
              <Route
                exact={true}
                path='/therapists/chat/:therapistid'
                component={userdetails.userid ? TherapistChat : Home}
              />

              {/*chat routes*/}
              <Route exact={true} path='/listeners' component={Chat} />
              <Route
                exact={true}
                path='/listeners/chat/:user_id'
                component={userdetails.userid ? Messages : Home}
              />

              {/*Advice Routes*/}
              <Route exact={true} path='/advice' component={Advice}></Route>

              {/* Profile Routes */}
              <Route
                exact={true}
                path='/myprofile'
                component={userdetails.userid ? MyProfile : Home}></Route>
              {/*admin panel */}
              <Route
                exact
                path='/admin'
                component={userdetails.access_level === 3 ? AdminPanel : Home}
              />

              {/* Not Found Route*/}
              {<Route component={NotFound} />}
            </Switch>
          </animated.div>
        ))}
      </UserContext.Provider>
    </>
  );
}

export default App;
