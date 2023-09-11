
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { URL } from '../../../config';

const ManagerSignUp = () => {
    const navigate = useNavigate();

    const initialValues = {
        managerName: "",
        managerEmail: "",
        managerPassword: "",
        confirmManagerPassword: "",
        restaurantName: "",
        restaurantAdressText: "",
        restaurantPinCode: ""
    };

    const validationSchema = Yup.object({
        managerName: Yup.string().required("Please enter manager's name"),
        managerEmail: Yup.string().email("Invalid email address").required("Please enter manager's email"),
        managerPassword: Yup.string().required("Please enter manager's password"),
        confirmManagerPassword: Yup.string()
            .oneOf([Yup.ref("managerPassword"), null], "Passwords must match")
            .required("Please confirm manager's password"),
        restaurantName: Yup.string().required("Please enter restaurant name"),
        restaurantAdressText: Yup.string().required("Please enter restaurant address"),
        restaurantPinCode: Yup.number().required("Please enter restaurant pin code")
    });

    const onSubmit = (values) => {
        const url = `${URL}/restaurantmanager/signup`;
        axios.post(url, values).then((response) => {
            const result = response.data;

            if (result.status === "SUCCESS") {
                Swal.fire("Success", "Manager successfully signed up", "success").then(() => {
                    navigate("/manager/signin");
                });
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="card-body">
            <h2 className="title">Manager Sign Up</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="form">
                    <div className="mb-3">
                        <label htmlFor="managerName" className="label-control">
                            Manager Name
                        </label>
                        <Field type="text" name="managerName" className="form-control" />
                        <ErrorMessage name="managerName" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="managerEmail" className="label-control">
                            Manager Email Address
                        </label>
                        <Field type="text" name="managerEmail" className="form-control" />
                        <ErrorMessage name="managerEmail" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="managerPassword" className="label-control">
                            Manager Password
                        </label>
                        <Field type="password" name="managerPassword" className="form-control" />
                        <ErrorMessage name="managerPassword" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmManagerPassword" className="label-control">
                            Confirm Password
                        </label>
                        <Field type="password" name="confirmManagerPassword" className="form-control" />
                        <ErrorMessage name="confirmManagerPassword" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="restaurantName" className="label-control">
                            Restaurant Name
                        </label>
                        <Field type="text" name="restaurantName" className="form-control" />
                        <ErrorMessage name="restaurantName" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="restaurantAdressText" className="label-control">
                            Restaurant Address
                        </label>
                        <Field type="text" name="restaurantAdressText" className="form-control" />
                        <ErrorMessage name="restaurantAdressText" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="restaurantPinCode" className="label-control">
                            Restaurant Pin Code
                        </label>
                        <Field type="number" name="restaurantPinCode" className="form-control" />
                        <ErrorMessage name="restaurantPinCode" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <div>
                            Already have an account? <Link to="/manager/signin">Sign in here!</Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </Form>
            </Formik>
        </div>
        </div>
    );
}

export default ManagerSignUp;
