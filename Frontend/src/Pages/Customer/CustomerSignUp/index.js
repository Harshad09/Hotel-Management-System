import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { URL } from '../../../config';

const CustomerSignUp = () => {
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        pinCode: ""
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter your name"),
        email: Yup.string().email("Invalid email address").required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Please confirm your password"),
        address: Yup.string().required("Please enter your address"),
        pinCode: Yup.number().required("Please enter your pin code")
    });

    const onSubmit = (values) => {
        const url = `${URL}/customers/signup`;
        axios.post(url, values).then(response => {
            const result = response.data;
            if(result.status === "SUCCESS") {
                Swal.fire("Success", "Customer successfully signed up", "success").then(() => {
                    navigate("/customer/signin");
                });
            } else {
                Swal.fire("Error", result.message, "error");
            }
        });
    };

    return (
        <div className="card" style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="card-body">
            <h2 className="title">Fill details to Sign Up</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="form">
                    {/* name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="label-control">
                            Name
                        </label>
                        <Field type="text" placeholder="Enter your name" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="error-message text-danger" />
                    </div>

                    {/* email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="label-control">
                            Email Address
                        </label>
                        <Field type="email" placeholder="Enter your email Id" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="error-message text-danger" />
                    </div>

                    {/* password */}
                    <div className="mb-3">
                        <label htmlFor="password" className="label-control">
                            Password
                        </label>
                        <Field type="password" name="password" className="form-control" />
                        <ErrorMessage name="password" component="div" className="error-message text-danger" />
                    </div>

                    {/* confirm password */}
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="label-control">
                            Confirm Password
                        </label>
                        <Field type="password" name="confirmPassword" className="form-control" />
                        <ErrorMessage name="confirmPassword" component="div" className="error-message text-danger" />
                    </div>

                    {/* address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="label-control">
                            Address
                        </label>
                        <Field as="textarea" placeholder="Enter address here" name="address" className="form-control" />
                        <ErrorMessage name="address" component="div" className="error-message text-danger" />
                    </div>

                    {/* pin code */}
                    <div className="mb-3">
                        <label htmlFor="pinCode" className="label-control">
                            Pin Code
                        </label>
                        <Field type="number" name="pinCode" className="form-control" />
                        <ErrorMessage name="pinCode" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                        <div>
                            Already have an account? <Link to="/customer/signin">Sign in here!</Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                </Form>
            </Formik>
        </div>
        </div>
    );
}

export default CustomerSignUp;
