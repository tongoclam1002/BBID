import { Form } from "antd";
import { t } from "i18next";

export default function AddressForm({
  onFinish,
  onFinishFailed,
  register,
  handleSubmit,
  formState: { isSubmitting, errors, isValid },
}) {
  return (
    <>
      <Form
        id="address-form"
        name="basic"
        onFinish={handleSubmit(onFinish)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="form-custom"
      >
        <div className="form-group">
          <label className="form-label">{t("order.FULL_NAME")}</label>
          <input
            name="name"
            className={`form-control ${!!errors.name ? "is-invalid" : ""}`}
            {...register("name", {
              required: `${t("validationMessage.EMPTY_RECEIVER_NAME")}`,
            })}
            autoFocus
          />
          <div className="invalid-feedback">{errors?.name?.message}</div>
        </div>

        <div className="form-group">
          <label className="form-label">{t("order.PHONE")}</label>
          <input
            name="phone"
            className={`form-control ${!!errors.phone ? "is-invalid" : ""}`}
            {...register("phone", {
              required: `${t("validationMessage.EMPTY_PHONE")}`,
            })}
          />
          <div className="invalid-feedback">{errors?.phone?.message}</div>
        </div>

        <div className="form-group">
          <label className="form-label">{t("order.ADDRESS")}</label>
          <input
            name="address"
            className={`form-control ${!!errors.address ? "is-invalid" : ""}`}
            {...register("address", {
              required: `${t("validationMessage.EMPTY_ADDRESS")}`,
            })}
          />
          <div className="invalid-feedback">{errors?.address?.message}</div>
        </div>
      </Form>
    </>
  );
}
