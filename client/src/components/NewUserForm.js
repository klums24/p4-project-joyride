// import { useEffect, useState } from "react";
import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";


function NewUserForm({saveDriver, handleToggleForm}) {

  const userSchema = yup.object({
    first_name: yup.string().required("Please enter your first name"),
    last_name: yup.string().required("Please enter your last name"),
    email: yup.string().required("Please enter your email"),
    password: yup.string()
      .required("Please enter your password")
      .min(4, "Password must be at least 4 characters"),
    user_name: yup.string()
      .required("Please enter your user name")
      .min(2, "Username must be at least 2 characters")
      .max(13, "Username can be at most 13 characters"),
    age: yup
      .number()
      .required("Please enter your age")
      .min(16, "Age must be at least 16")
      .max(100, "Age can be at most 100"),
    zip_code: yup
      .string()
      .required("Please enter your zip code")
      .length(5, "Zip code must be exactly 5 digits"),
    profile_picture: yup.string().required("Please enter a valid URL for the profile picture"),
  });
    const formik = useFormik ({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            user_name: "",
            age: "",
            zip_code: "",
            profile_picture: "",
        },
        validationSchema: userSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            fetch("/api/v1/signup", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(values, null, 2),
            }).then(resp => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(driver => {
                        saveDriver(driver)
                    })
                }
                else {
                    resp.json()
                    .then(errorObj => {
                        alert(errorObj.error)
                    })
                }
            })
        },
    });

   

    return (
        <div>
          <form className="form-text" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <div className="error">{formik.errors.first_name}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <div className="error">{formik.errors.last_name}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password} 
              />
              {formik.touched.password && formik.errors.password && (
                <div className="error">{formik.errors.password}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="user_name">User Name:</label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.user_name} 
              />
              {formik.touched.user_name && formik.errors.user_name && (
                <div className="error">{formik.errors.user_name}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="age">Age:</label>
              <input
                id="age"
                name="age"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.age} 
              />
              {formik.touched.age && formik.errors.age && (
                <div className="error">{formik.errors.age}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="zip_code">Zip Code:</label>
              <input
                id="zip_code"
                name="zip_code"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.zip_code} 
              />
              {formik.touched.zip_code && formik.errors.zip_code && (
                <div className="error">{formik.errors.zip_code}</div>
              )}
            </div>
    
            <div>
              <label htmlFor="profile_picture">Profile Picture URL:</label>
              <input
                id="profile_picture"
                name="profile_picture"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_picture} 
              />
              {formik.touched.profile_picture && formik.errors.profile_picture && (
                <div className="error">{formik.errors.profile_picture}</div>
              )}
            </div>
    
            <button type="submit">Submit</button>
          </form>
          <button onClick={handleToggleForm}>
            Already have an account?
          </button>
        </div>
      );
    }
    
    export default NewUserForm;