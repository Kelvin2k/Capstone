import React from "react";
import Lottie from "react-lottie"; // Changed from "react-lottie"
import * as LoginAnimation from "./../../assets/animation/loginAnimation.json";
import { useFormik } from "formik";
import { getAuth } from "firebase/auth";
import "./../../Firebase/init";
import * as Yup from "yup";
import userServ from "../../services/userServ";
import { message } from "antd";
import { useState } from "react";
import { saveLocalStorage } from "../../utils/local";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveInfoUser } from "../../redux/slice/userSlice";

const auth = getAuth();

const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      // onSubmit: (values) => {
      //   console.log(values);
      //   userServ
      //     .loginServ(values)
      //     .then((res) => {
      //       console.log(res);
      //       messageApi.open({
      //   type: "success",
      //   content: "Login success",
      // save user information
      // saveLocalStorage(res.data.content, 'user_info')
      // dispatch(saveInfoUser(res.data.content, "user_info"))
      // setTimeout(() => {
      // navigate('/')

      // }, 1000);
      // });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       messageApi.open({
      //   type: "error",
      //   content: err.response.data.content,
      // });
      //     });
      // },

      onSubmit: async (values) => {
        try {
          console.log(values);
          const result = await userServ().loginServ(values);
          console.log("Login successfully", result);
          messageApi.open({
            type: "success",
            content: "Login success",
          });
          // save user information
          saveLocalStorage(values, "user_info");
          setTimeout(() => {
            navigate("/");
          }, 1000);
          dispatch(saveInfoUser(values));
        } catch (error) {
          //error can not login
          console.error("Login failed:", error);
          messageApi.open({
            type: "error",
            content: "This is an error message",
          });
        }
      },
      validationSchema: Yup.object({
        email: Yup.string().required("Please do not leave this field empty"),
        password: Yup.string().required("Please do not leave this field empty"),
      }),
    });
  // const {} = formik
  const setTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoginAnimation, // Must be defined
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {contextHolder}
      <div className="h-screen flex justify-center items-center">
        <div className="container">
          <div className="grid grid-cols-2">
            <div className="col_left">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
            <div className="col-right">
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-bold text-3xl">Login Movie</h2>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    User name
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Please input email"
                    required
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="Please input password"
                      required
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />

                    {errors.password && touched.password ? (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.password}
                      </p>
                    ) : null}
                    <button
                      type="button"
                      onClick={setTogglePassword}
                      className="absolute inset-y-0 right-0 pr-3 hover:opacity-70 duration-300"
                    >
                      {showPassword ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-2 px-5 bg-black text-white rounded-md hover:bg-opacity-70 duration-500"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
