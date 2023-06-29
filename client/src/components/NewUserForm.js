// import { useEffect, useState } from "react";
import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";


function NewUserForm({saveDriver, handleToggleForm}) {
    const userSchema = yup.object({
        first_name: yup.string().required("Please enter your first name"),
        last_name: yup.string().required("Please enter your last name"),
        email: yup.string().required("Please enter your email"),
        password: yup.string().required("Password is required"),
        user_name: yup.string().required("user_name is required"),
        age: yup.string().required("Please enter your age"),
        zip_code: yup.string().required("Please enter your zip code"),
        profile_picture: yup.string().required("Please enter a valid URL for picture")
    })
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
        <>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="first_name">First Name:</label>
            <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
            />

            <label htmlFor="last_name">Last Name:</label>
            <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
            />

            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />

            <label htmlFor="password">Password:</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <label htmlFor="user_name">User Name:</label>
            <input
                id="user_name"
                name="user_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.user_name}
            />

            <label htmlFor="age">Age:</label>
            <input
                id="age"
                name="age"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.age}
            />

            <label htmlFor="zip_code">Zip Code:</label>
            <input
                id="zip_code"
                name="zip_code"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.zip_code}
            />

            <label htmlFor="profile_picture">Profile Picture URL:</label>
            <input
                id="profile_picture"
                name="profile_picture"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_picture}
            />

            <button type="submit">Submit2</button>

        </form>
        <button onClick={handleToggleForm}>
        Login to your account
        </button>
        </>
    )
    
}

export default NewUserForm