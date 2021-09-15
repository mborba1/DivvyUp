import React from "react";
import { Formik } from "formik";

function AppForm({ initialValues, onSubmit, validations, children }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validations={validations}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;