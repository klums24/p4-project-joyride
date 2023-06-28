// import { useEffect, useState } from "react";
import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";


function NewUserForm() {

    const formik = useFormik ({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            username: "",
            age: "",
            zipCode: "",
        },
        validationSchema: yup.object({
          firstName: yup.string().required("Please enter your first name"),
          lastName: yup.string().required("Please enter your first name"),
          email: yup.string().required("Please enter your email"),
          password: yup.string().required("Password is required"),
          username: yup.string().required("Username is required"),
          age: yup.string().required("Please enter your age"),
          zipcode: yup.string().required("Please enter your zip code"),
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.lastName}
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

            <label htmlFor="username">Username:</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
            />

            <label htmlFor="age">Age:</label>
            <input
                id="age"
                name="age"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.age}
            />

            <label htmlFor="zipCode">Zip Code:</label>
            <input
                id="zipCode"
                name="zipCode"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.zipCode}
            />

            <button type="submit">Submit</button>
        </form>
    )
    
}

export default NewUserForm