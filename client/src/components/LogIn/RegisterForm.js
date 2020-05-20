import React, { useState } from "react";
import { Formik, ErrorMessage } from "formik";
import {
  BrowserRouter as Router,
  Redirect,
  useHistory
} from "react-router-dom";
import * as Yup from "yup";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Alert,
  Input
} from "reactstrap";
import axios from "axios";

const RegisterForm = props => {
  const [visible, setVisible] = useState(false);

  const onDismiss = () => setVisible(false);
  let history = useHistory();
  const handleAuth = async values => {
    onDismiss();

    await new Promise(resolve => setTimeout(resolve, 500));
    try {
      const res = await axios.post("/auth/register", values);
      console.log(res);
      if (
        !res.data.success &&
        res.data.errors[0].msg === "Email is already registered"
      ) {
        setVisible(true);
      } else {
        props.toggle("isAuthed", true);
        // const path = `/repos/${userName}/${repo}`;
        const path = `/dashboard`;
        history.push(path);
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={{ email: "", password: "", password2: "" }}
        onSubmit={handleAuth}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .min(14)
            .required("Password is required"),
          password2: Yup.string()
            .min(14)
            .oneOf([Yup.ref("password"), null], "Passwords don't match")
            .required("Password confirm is required")
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
                <Alert color="info" isOpen={visible} toggle={onDismiss}>
                  This email has already been registered.
                </Alert>
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
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </FormGroup>
              <FormGroup>
                {/* <Label for="password">Password</Label> */}
                <Input
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="Confirm Password"
                  value={values.password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password2 && touched.password2
                      ? "text-input error"
                      : "text-input"
                  }
                />
                {errors.password2 && touched.password2 && (
                  <div className="input-feedback">{errors.password2}</div>
                )}
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

export default RegisterForm;
