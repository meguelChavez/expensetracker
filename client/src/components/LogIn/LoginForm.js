import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  useHistory
} from "react-router-dom";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const LoginForm = props => {
  let history = useHistory();

  const handleLogin = async values => {
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 500));
    const { email, password } = values;
    const payload = { email, password };
    try {
      const res = await axios.post("/auth/login", payload);
      console.log(res);
      if (res.data.success) {
        props.toggle("isAuthed", true);
        const path = `/dashboard`;
        history.push(path);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .min(14)
            .required("Password is required")
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props;
          return (
            <Form onSubmit={handleSubmit} className="col">
              <FormGroup>
                {/* <Label for="email">Email</Label> */}
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </FormGroup>
              <FormGroup>
                {/* <Label for="password">Password</Label> */}
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "text-input error"
                      : "text-input"
                  }
                />
              </FormGroup>
              <FormGroup className="d-flex justify-content-end">
                {/* <Button
                          type="button"
                          className="outline mr-3"
                          onClick={handleReset}
                          disabled={!dirty || isSubmitting}
                          size="lg"
                        >
                          Reset
                        </Button> */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  color="primary"
                  size="lg"
                >
                  Submit
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default LoginForm;
