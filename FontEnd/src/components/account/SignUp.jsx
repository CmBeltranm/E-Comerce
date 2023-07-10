import React, { useEffect, useState } from "react";
import { validate } from "./validate";
import { ToastContainer, toast } from "react-toastify";
import { notify } from "./toast";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    IsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setErrors(validate(data, "signUp"));
  }, [data, touched]);

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      const urlApi = `https://lightem.senatorhost.com/login-react/index.php?email=${data.email.toLowerCase()}&password=${data.password}&register=true`;
      const pushData = async () => {
        const responseA = axios.get(urlApi);
        const response = await toast.promise(responseA, {
          pending: "Check your data",
          success: "Checked!",
          error: "Something went wrong!",
        });
        if (response.data.ok) {
          notify("You signed Up successfully", "success");
        } else {
          notify("You have already registered, log in to your account", "warning");
        }
      };
      pushData();
    } else {
      notify("Please Check fields again", "error");
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        IsAccepted: false,
      });
    }
  };

  return (
    <div className="App">
      <form className="formLogin" onSubmit={submitHandler} autoComplete="off">
        <h2>Sign Up</h2>
        <div>
          <div className={`${errors.name && touched.name ? "unCompleted" : !errors.name && touched.name ? "completed" : ""}`}>
            <input type="text" name="name" value={data.name} placeholder="Name" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <i className="fas fa-user" style={{ color: "#000000" }}></i>
          </div>
          {errors.name && touched.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <div className={`${errors.email && touched.email ? "unCompleted" : !errors.email && touched.email ? "completed" : ""}`}>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <i className="fas fa-envelope" style={{ color: "#000000" }}></i>
          </div>
          {errors.email && touched.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <div className={`${errors.password && touched.password ? "unCompleted" : !errors.password && touched.password ? "completed" : ""}`}>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <i className="fas fa-unlock-alt" style={{ color: "#000000" }}></i>
          </div>
          {errors.password && touched.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <div className={`${errors.confirmPassword && touched.confirmPassword ? "unCompleted" : !errors.confirmPassword && touched.confirmPassword ? "completed" : ""}`}>
            <input type="password" name="confirmPassword" value={data.confirmPassword} placeholder="Confirm Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <i className="fas fa-unlock-alt" style={{ color: "#000000" }}></i>
          </div>
          {errors.confirmPassword && touched.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
        <div>
          <div className="terms">
            <input type="checkbox" name="IsAccepted" value={data.IsAccepted} id="accept" onChange={changeHandler} onFocus={focusHandler} />
            <label htmlFor="accept">I accept terms of privacy policy</label>
          </div>
          {errors.IsAccepted && touched.IsAccepted && <span className="error">{errors.IsAccepted}</span>}
        </div>
        <div>
          <button type="submit">Create Account</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Already have an account? <Link to="/login">Sign In</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;

