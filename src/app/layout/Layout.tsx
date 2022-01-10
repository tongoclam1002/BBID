import { Modal } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { login } from "../../features/Account/accountSlice";
import LoginForm from "../../features/Account/LoginForm";
import { useAppDispatch } from "../store/configureStore";
import toast from "../utils/toast";
import Header from "./Header";

export default function Layout(props: layoutProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [errorLogin, setErrorLogin] = useState();
  const dispatch = useAppDispatch();

  async function submitForm(data: FieldValues) {
    await dispatch(login(data))
      .then((response: any) => {
        if (!response.payload.token) {
          setErrorLogin(t("errorMessage.INCORRECT_AUTHENCTICATION"));
        } else {
          setErrorLogin(null);
          handleCancel();
        }
      })
      .catch((error) => console.log(error));
  }

  const onFinishFailed = () => {
    console.log("failed");
    toast.warning(t("message.EMPTY_CHECKOUT_INFO"), 0.5);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // async function onFinish(data: FieldValues) {
  //   await api.Account.login(data.username, data.password)
  //   console.log(data);
  // }

  return (
    <>
      <div className="box-content">
        <Header showModal={showModal} />
        <div className="container main-content" id="main-content">
          <div className="row">
            <div className="col col-12">{props.children}</div>
          </div>
        </div>
      </div>
      <Modal
        className="modal-custom"
        title={t("auth.SIGN_IN")}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <LoginForm
          onFinish={submitForm}
          onFinishFailed={onFinishFailed}
          error={errorLogin}
          // form = {{register, handleSubmit, formState: {isSubmitting}}}
        />
      </Modal>
    </>
  );
}

interface layoutProps {
  children?: React.ReactNode;
}
