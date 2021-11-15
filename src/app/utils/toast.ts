import { message, Modal } from "antd";

const success = (title, sec = 2) => {
    message.success(title, sec);
};

const error = (title, sec = 2) => {
    message.error(title, sec);
};

const toast = {
    error,
    success
}

export default toast