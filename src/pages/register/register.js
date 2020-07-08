import React from "react";
import { useTrail, animated } from "react-spring";
import useFormValidation from "./Formvalidation";
import Validate from "./validate";
import GreenButton from "../../components/button";
import SecondaryButton from "../../components/SecondaryButton";
import FormInput from "../../components/FormInput";
import ErrorAlert from "../../components/errorAlert";

const Register = ({ changeregister, toggle }) => {
  const initialvalues = {
    fullname: "",
    email: "",
    username: "",
    pass: "",
    phone: "",
    age: "",
    account_type: "listener",
    file: "",
  };

  const {
    submitform,
    handleChange,
    handlefile,
    values,
    errors,
    backenderrors,
  } = useFormValidation(initialvalues, Validate);

  const items = [
    <FormInput
      label="fullname"
      value={values.fullname}
      error={errors.fullname ? errors.fullname : null}
      onchange={handleChange}
    />,
    <FormInput
      label="username"
      value={values.username}
      error={errors.username ? errors.username : null}
      onchange={handleChange}
    />,
    <FormInput
      label="email"
      value={values.email}
      error={errors.email ? errors.email : null}
      onchange={handleChange}
    />,
    <FormInput
      label="password"
      value={values.password}
      error={errors.pass ? errors.pass : null}
      onchange={handleChange}
    />,
    <FormInput
      label="phone"
      value={values.phone}
      error={errors.phone ? errors.phone : null}
      onchange={handleChange}
    />,
    <FormInput
      label="age"
      value={values.age}
      error={errors.age ? errors.age : null}
      onchange={handleChange}
    />,

    <div className="mb-2">
      <label className="capitalize text-white text-xl">Account Type:</label>
      <select
        value={values.account_type}
        onChange={handleChange}
        name="account_type"
        className="rounded-lg bg-gray-400 bg-opacity-75 ml-1 placeholder-black p-1 shadow-sm outline-none focus:shadow-outline focus:bg-teal-100"
      >
        <option value="listener">Listener</option>
        <option value="user">User</option>
      </select>
    </div>,

    <div>
      <input
        type="file"
        className="text-white text-lg mb-2"
        onChange={handlefile}
      />
    </div>,
  ];

  const config = { mass: 5, tension: 2000, friction: 200 };

  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : 20,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <>
      <form onSubmit={submitform} className="pt-8 mr-64">
        {backenderrors ? <ErrorAlert error={backenderrors} /> : null}

        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate((x) => `translate3d(0,${x}px,0)`),
            }}
          >
            <animated.div>{items[index]}</animated.div>
          </animated.div>
        ))}

        <div className="mt-2 ml-12">
          <GreenButton text="Register" />
          <SecondaryButton text="Login" action={changeregister} />
        </div>
      </form>
    </>
  );
};

export default Register;
