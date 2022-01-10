import { Alert, Button, Form } from "antd";
import { t } from "i18next";
import { useForm } from "react-hook-form";

export default function RegisterForm({ onFinish, onFinishFailed, error }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });
  return (
    <>
      {error && (
        <Alert className="mb-3" description={error} type="error" showIcon />
      )}
      <Form
        name="basic"
        onFinish={handleSubmit(onFinish)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="form-custom"
      >
        <div className="form-group">
          <label className="form-label">{t("auth.USERNAME")}</label>
          <input
            className={`form-control ${!!errors.username ? "is-invalid" : ""}`}
            {...register("userName", {
              required: `${t("validationMessage.EMPTY_USERNAME")}`,
            })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.username?.message}</div>
        </div>

        <div className="form-group">
          <label className="form-label">{t("auth.PASSWORD")}</label>
          <input
            type="password"
            className={`form-control ${!!errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: `${t("validationMessage.EMPTY_PASSWORD")}`,
            })}
            autoComplete="false"
          />
          <div className="invalid-feedback">{errors?.password?.message}</div>
        </div>

        <div className="form-group">
          <label className="form-label">{t("auth.CONFIRM_PASSWORD")}</label>
          <input
            type="password"
            className={`form-control ${!!errors.confirmPassword ? "is-invalid" : ""}`}
            {...register("confirmPassword", {
              required: `${t("validationMessage.EMPTY_CONFIRM_PASSWORD")}`,
            })}
            autoComplete="false"
          />
          <div className="invalid-feedback">{errors?.confirmPassword?.message}</div>
        </div>

        <div className="form-group">
          <Button
            disabled={!isValid}
            loading={isSubmitting}
            className="btn btn-primary green text-white text-uppercase w-100 font-weight-bold mt-3"
            type="primary"
            htmlType="submit"
          >
            {t("auth.REGISTER")}
          </Button>
        </div>
      </Form>
    </>
  );
}
