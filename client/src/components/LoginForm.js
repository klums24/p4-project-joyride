import React from "react"
import {useFormik} from "formik";
import * as yup from "yup";

function LoginForm({saveDriver, handleToggleForm}) {

    const formik = useFormik({
        initialValues: {
          email: "",
          password: "",
        },
        validationSchema: yup.object({
          email: yup.string().required("Email is required"),
          password: yup.string().required("Password is required"),
        }),
        onSubmit: values => {
          fetch("/signin",{
            method:"POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then(resp => {
            if (resp.ok) {
              resp.json()
              .then(driver => {
                saveDriver(driver)
              })
            }
            else {
              resp.json()
              .then(error => {
                alert(error.error)
              })
            }
          })
        },
    });
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.lastName}
            />
            
          <button type="submit">Login</button>
        
        </form>
        <button onClick={handleToggleForm}>
        Sign up to create new account
        </button>
      </>
      )
    }
    
    export default LoginForm;