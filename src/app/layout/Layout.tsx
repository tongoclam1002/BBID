import { Modal, Typography } from "antd";
import { t } from "i18next";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { login } from "../../features/Account/accountSlice";
import LoginForm from "../../features/Account/LoginForm";
import RegisterForm from "../../features/Account/RegisterForm";
import { fetchCartAsync } from "../../features/Cart/cartSlice";
import api from "../api/api";
import { useAppDispatch } from "../store/configureStore";
import toast from "../utils/toast";
import Header from "./Header";

export default function Layout(props: layoutProps) {
  const { Link } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(props.isOpenLoginModal);
  const [errorLogin, setErrorLogin] = useState();
  const [isRegister, setRegister] = useState(false);
  const dispatch = useAppDispatch();

  async function submitLogin(data: FieldValues) {
    await dispatch(login(data))
      .then((response: any) => {
        if (!response.payload.token) {
          setErrorLogin(t("errorMessage.INCORRECT_AUTHENCTICATION"));
        } else {
          setErrorLogin(null);
          handleCancel();
          dispatch(fetchCartAsync());
        }
      })
      .catch((error) => console.log(error));
  }

  async function submitRegister(data: FieldValues) {
    await api.Account.register(data).then(() => console.log("success"));
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

  const onChangeRegister = () => {
    setRegister(!isRegister);
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
        {!isRegister ? (
          <>
            <LoginForm
              onFinish={submitLogin}
              onFinishFailed={onFinishFailed}
              error={errorLogin}
            />
            <div className="text-center">
              {t("auth.DO_NOT_HAVE_AN_ACCOUNT")}{" "}
              <Link
                className="primary-color"
                onClick={() => onChangeRegister()}
              >
                {t("auth.REGISTER")}
              </Link>
            </div>
          </>
        ) : (
          <>
            <RegisterForm
              onFinish={submitRegister}
              onFinishFailed={onFinishFailed}
              error={errorLogin}
            />
            <div className="text-center">
              {t("auth.ALREADY_HAVE_AN_ACCOUNT")}{" "}
              <Link
                className="primary-color"
                onClick={() => onChangeRegister()}
              >
                {t("auth.SIGN_IN")}
              </Link>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

interface layoutProps {
  children?: React.ReactNode;
  isOpenLoginModal: boolean;
}
