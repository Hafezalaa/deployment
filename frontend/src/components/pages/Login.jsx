import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";

function Login() {
  const [user, setUser] = useState({
    email: "a.fahimahmadi@gmail.com",
    password: "Fahim123",
  });
  const [errors, setErrors] = useState(null);
  const [beErr, setBeError] = useState(null);
  const [status, setStatus] = useState(false);

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // define validation schema for user
  const loginSchema = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Email format is not valid"),

    // password: Yup.string()
    //   .required('Password is required')
    //   .min(5, 'Password is too short')
    //   .matches(/[a-z]/, 'Password should contain lower-case letter')
    //   .matches(/[A-Z]/, 'Password should contain upper-case letter')
    //   .matches(/[0-9]/, 'Password should contain number')
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      //validate user data
      await loginSchema.validate(user, { abortEarly: false });

      // send request to backend
      const res = await axios({
        url: "http://localhost:5000/users/login",
        method: "POST",
        data: user,
        withCredentials: true,
      });
      console.log(res);
      setStatus(res.statusText === "OK" ? true : false);
    } catch (error) {
      // backend error
      if (error.response) {
        // console.log(error.response)
        setBeError(error.response.data.msg);
      }

      // validation errors
      const vErrors = {};
      if (error.name === "ValidationError") {
        error.inner.forEach((err) => {
          vErrors[err.path] = err.message;
        });

        setErrors(vErrors);
      }
    }
  };

  return status ? (
    <Navigate to="/posts" replace={true} />
  ) : (
    <div className="h-full sm:w-2/3 md:w-3/5 lg:w-2/4 xl:w-2/6 m-auto my-10 bg-gray-50 p-16 sm:rounded-md md:rounded-md">
      <div className="mb-10 text-gray-900 text-center">
        <h3 className="text-3xl mb-2">Login here!</h3>
        <p className="text-sm">Please provide data for all fields!</p>
      </div>
      <form
        className="flex flex-col"
        name="login-form"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          className="py-2 px-2 rounded shadow mt-5"
          onChange={changeHandler}
          value={user.email}
        />
        {errors?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="py-2 px-2 rounded shadow mt-5"
          onChange={changeHandler}
          value={user.password}
        />
        {errors?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <input
          type="submit"
          value="Login"
          className="px-4 py-2 bg-blue-500 shadow text-white rounded-sm active:bg-blue-600 mt-10 hover:cursor-pointer"
        />

        {beErr && (
          <div className="text-red-500 text-small text-center py-4">
            {beErr}
          </div>
        )}
      </form>

      {/* Confirmation message when form submitted */}
      {/* {errors?.res ? (
          <div className="text-red-500 my-4">
            <span className="text-sm">{errors.res}</span>
          </div>
        ) : (
          ""
        )} */}

      <ul className="m-5 mb-0 text-md text-blue-600">
        <li className="mb-1">
          <Link className="hover:text-orange-600" to="/forgetpassword">
            Forget Password
          </Link>
        </li>
        <li>
          <Link className="hover:text-orange-600" to="/register">
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Login;
