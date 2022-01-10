import { ErrorMessage, Field, Formik, Form } from "formik";
import { t } from "i18next";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(t("validationMessage.EMPTY_RECEIVER_NAME")),
  address: Yup.string().required(t("validationMessage.EMPTY_ADDRESS")),
  phone: Yup.string().required(t("validationMessage.EMPTY_PHONE")),
});

export default function AddressForm({ onFinish, onFinishFailed, form }) {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form id="address-form">
            <div className="form-group">
              <label className="form-label">{t("order.FULL_NAME")}</label>
              <Field
                name="name"
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="name" />
              </div>
            </div>
            {errors.name && touched.name ? (
              <div className="invalid-feedback">{errors.name}</div>
            ) : null}

            <div className="form-group">
              <label className="form-label">{t("order.PHONE")}</label>
              <Field
                name="phone"
                className={`form-control ${
                  errors.phone && touched.phone ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="phone" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{t("order.ADDRESS")}</label>
              <Field
                name="address"
                className={`form-control ${
                  errors.address && touched.address ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="address" />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
