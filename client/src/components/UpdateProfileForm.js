import React from "react"
import {useFormik} from "formik";
import * as yup from "yup";


function UpdateProfileForm({currentDriver, saveDriver}) {

    

    const formik = useFormik({
        initialValues: {
          email: currentDriver.email,
          profile_picture: currentDriver.profile_picture,
        },
        validationSchema: yup.object({
          email: yup.string().required("Email is required"),
          profile_picture: yup.string().required("Profile picture is required"),
        }),
        onSubmit: values => {
          fetch(`/api/v1/drivers/${currentDriver.id}`, {
            method:"PATCH",
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
                alert("THIS IS WRONG",error.error)
              })
            }
          })
        },
    });
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
            <label class="form-text" htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            
            <label class="form-text" htmlFor="profile_picture">Profile picture:</label>
            <input
                id="profile_picture"
                name="profile_picture"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_picture}
            />
            
          <button class="button" type="submit">Update</button>
        
        </form>
      </>
      )
    }
    
    export default UpdateProfileForm;