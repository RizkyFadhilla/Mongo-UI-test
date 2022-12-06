import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import {
  fetchOneUser,
  updateUser,
  fetchAllData,
} from "../stores/actions/userAction";
import "./updateForm.css";

function UpdateUser() {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { fetchOneData, fetchOneLoading, fetchOneError } = useSelector(
    (state) => state
  );
  useEffect(() => {
    dispatch(fetchOneUser(state));
  }, []);

  if (fetchOneLoading) {
    return <h1> Keep Calm, data is still on the way</h1>;
  }
  if (fetchOneError) {
    return Swal.fire({
      icon: "error",
      text: `${fetchOneError.message}`,
    });
  }

  let initialValues = {
    firstName: fetchOneData?.firstName,
    lastName: fetchOneData?.lastName,
    email: fetchOneData?.email,
    gender: fetchOneData?.gender,
    addr: fetchOneData?.addr,
  };

  function validateStreet(value) {
    let error = {};
    if (!value) {
      error = "Require";
    }
    return error;
  }

  return (
    <>
      <h1>Update Form</h1>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.firstName) {
            errors.firstName = "Required";
          }
          if (!values.lastName) {
            errors.lastName = "Required";
          }
          if (!values.gender) {
            errors.gender = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await new Promise((r) => setTimeout(r, 400));
            setSubmitting(false);
            dispatch(updateUser(state, values))
              .then((data) => {
                Swal.fire({
                  icon: "success",
                  text: `${data}`,
                });
              })
              .then(() => {
                return dispatch(fetchAllData());
              })
              .then(() => {
                navigate("/");
              });
          } catch (error) {
            Swal.fire({
              icon: "error",
              text: `${error}`,
            });
          }
        }}
      >
        {({
          values,

          errors,

          touched,

          handleChange,

          handleBlur,

          handleSubmit,

          isSubmitting,

          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <label>First Name</label>
            <br />
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />

            {errors.firstName && touched.firstName && errors.firstName}
            <br />
            <label>Last Name</label>
            <br />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />

            {errors.lastName && touched.lastName && errors.lastName}
            <br />

            <label>Email</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            {errors.email && touched.email && errors.email}
            <br />
            <label>gender</label>
            <br />
            <select
              type="text"
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
            >
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
            </select>

            {errors.gender && touched.gender && errors.gender}
            <br />
            <br />
            <label>Address </label>
            <br />
            <br />
            <FieldArray name="addr">
              {({ insert, remove, push }) => (
                <div>
                  {values.addr.length > 0 &&
                    values.addr.map((address, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <label htmlFor={`addr.${index}.street`}>Street</label>
                          <br />
                          <Field
                            name={`addr.${index}.street`}
                            type="text"
                            required
                          />
                          <ErrorMessage
                            name={`addr.${index}.street`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`addr.${index}.house`}>
                            House Number
                          </label>
                          <br />
                          <Field
                            name={`addr.${index}.house`}
                            type="text"
                            required
                          />
                          <ErrorMessage
                            name={`addr.${index}.house`}
                            component="div"
                            className="field-error"
                          />
                        </div>
                        <div className="col">
                          <label htmlFor={`addr.${index}.city`}>City</label>
                          <br />
                          <Field
                            name={`addr.${index}.city`}
                            type="text"
                            required
                          />
                          <br />
                          <ErrorMessage
                            name={`addr.${index}.city`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <label htmlFor={`addr.${index}.country`}>
                            Country
                          </label>
                          <br />
                          <Field
                            name={`addr.${index}.country`}
                            type="text"
                            required
                          />
                          <ErrorMessage
                            name={`addr.${index}.country`}
                            component="div"
                            className="field-error"
                          />
                        </div>

                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            Delete Address
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() =>
                      push({ street: "", house: "", city: "", country: "" })
                    }
                  >
                    Add Address
                  </button>
                </div>
              )}
            </FieldArray>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default UpdateUser;
