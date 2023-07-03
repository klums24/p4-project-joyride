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
          fetch("/api/v1/signin",{
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
                alert("Incorrect username or password",error.error)
              })
            }
          })
        },
    });
    
    return (
      <>
        <form class="form-text" onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
  
          <label class="form-text" htmlFor="password">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
  
          <button class="button" type="submit">
            Login
          </button>
        </form>
        <button class="button" onClick={handleToggleForm}>
          Create new account
        </button>
      </>
      );
    }
    
    export default LoginForm;