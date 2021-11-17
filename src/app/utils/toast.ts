import { message } from "antd";

const success = (title: string, sec = 2) => {
    message.success({
        content: title,
        className: "fixed-center",
        duration: sec
    });
};

const warning = (title: string, sec = 2) => {
    message.warning({
        content: title,
        className: "fixed-center",
        duration: sec
    });
};

const error = (title, sec = 2) => {
    message.error(title, sec);
};

const toast = {
    error,
    success,
    warning
}

export default toast