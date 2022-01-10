import { Field, Formik, Form } from "formik";
import { Alert, Button } from "antd";
import * as Yup from "yup";
import { t } from "i18next";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("validationMessage.EMPTY_USERNAME"),
  password: Yup.string().required("validationMessage.EMPTY_PASSWORD"),
  confirmPassword: Yup.string().required("validationMessage.EMPTY_CONFIRM_PASSWORD"),
});

export default function RegisterForm({
  onFinish,
  onFinishFailed,
  setToken,
  error,
  isLoading,
}) {
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={validationSchema}
        onSubmit={onFinish}
      >
        {({ errors, touched }) => (
          <Form className="form-custom">
            <div className="form-group">
              <label className="form-label">{t("auth.USERNAME")}</label>
              <Field
                name="username"
                className={`form-control ${
                  errors.username && touched.username ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.username && touched.username ? (
                  <>{t(errors.username)}</>
                ) : null}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t("auth.PASSWORD")}</label>
              <Field
                name="password"
                type="password"
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.password && touched.password ? (
                  <>{t(errors.password)}</>
                ) : null}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t("auth.PASSWORD")}</label>
              <Field
                name="password"
                type="password"
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.password && touched.password ? (
                  <>{t(errors.password)}</>
                ) : null}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{t("auth.CONFIRM_PASSWORD")}</label>
              <Field
                name="confirmPassword"
                type="password"
                className={`form-control ${
                  errors.confirmPassword && touched.confirmPassword ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword && touched.confirmPassword ? (
                  <>{t(errors.confirmPassword)}</>
                ) : null}
              </div>
            </div>

            <div className="form-group">
                <Button
                  className="btn btn-primary green text-white text-uppercase w-100 font-weight-bold mt-3"
                  htmlType="submit"
                  title={t("auth.SIGN_IN")}
                  loading={isLoading}
                >
                  {t("auth.SIGN_IN")}
                </Button>
              </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
