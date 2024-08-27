import axios from "axios";
import * as Yup from "yup";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({ fullname: "", email: "", password: "" });
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState(null);

  // user validation - schema
  const userSchema = Yup.object({
    fullname: Yup.string()
      .required("Fullname is required")
      .min(3, "Fullname is too short")
      .matches(/^[a-zA-Z\s]+$/, "Invalid fullname"),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
      
    password: Yup.string()
      .required("Password is required")
      .min(5, 'Password is too short')
      .matches(/[0-9]/, "Password must contains at least one number")
      .matches(/[A-Z]/, "Password must contains at least one uppercase letter")
      .matches(/[a-z]/, "Password must contains at least one lowercase letter"),
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      // validate user based on the userSchema
      await userSchema.validate(user, { abortEarly: false });

      // send request to backend
      const res = await axios({
        url: "http://localhost:5000/users/register",
        method: "POST",
        data: user,
        withCredentials: true,
      });
      setStatus(res.statusText === "OK" ? true : false);
    
    } catch (error) {
      if (error.response) {
        setErrors({ ...errors, res: error.response.data.errors[0].msg });
        console.log("error.response");
      }


      // handle validation errors
      const newErrors = {};
      if (error.name === "ValidationError"){
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      setErrors(newErrors)
      }
    }
  };

  return (
    <div className="h-full sm:w-2/3 md:w-3/5 lg:w-2/4 xl:w-2/6 m-auto my-10 bg-gray-50 p-10 sm:rounded-md md:rounded-md">
      <div className="mb-10 text-gray-900 text-center">
        <h3 className="text-3xl">Register here!</h3>
        <p className="text-sm">Please provide data for all fields!</p>

        {status && (
          <div className="text-green-700 my-4 flex gap-x-2 justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 12 12"
              fill="green"
              className="animate-pulse w-5 h-5"
            >
              <path
                fill="irishgreen"
                fill-rule="evenodd"
                d="M6 10a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0 2A6 6 0 1 0 6 0a6 6 0 0 0 0 12"
                clip-rule="evenodd"
              />
            </svg>
            <span className="text-sm ">
              Please verify your email by click on Verify link!
            </span>
          </div>
        )}
      </div>
      <form
        className="flex flex-col"
        name="register-form"
        onSubmit={submitHandler}
      >
        <input
          type="text"
          name="fullname"
          id="fullname"
          placeholder="fullname"
          className="py-2 px-2 rounded shadow"
          onChange={changeHandler}
        />
        {errors?.fullname && <div className="text-red-500 text-sm p-2">{errors?.fullname}</div>}
        <input
          type="text"
          name="email"
          id="email"
          placeholder="email"
          className="py-2 px-2 rounded shadow mt-5"
          onChange={changeHandler}
          />
          {errors?.email && <div className="text-red-500 text-sm p-2">{errors?.email}</div>}
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="py-2 px-2 rounded shadow mt-5"
          onChange={changeHandler}
          />
          {errors?.password && <div className="text-red-500 text-sm p-2">{errors?.password}</div>}

        <input
          type="submit"
          value="Register"
          className="px-4 py-2 bg-blue-500 shadow text-white rounded-sm active:bg-blue-600 mt-10 hover:cursor-pointer"
        />
      </form>

      <ul className="m-5 mb-0 text-md text-blue-600">
        <li className="mb-1">
          <Link className="hover:text-orange-600" to="/forgetpassword">
            Forget Password
          </Link>
        </li>
        <li>
          <Link className="hover:text-orange-600" to="/login">
            Signin
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Register;
