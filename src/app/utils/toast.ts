import { message } from "antd";

const success = (title: string, sec = 0.5) => {
    message.success({
        content: title,
        className: "fixed-center",
        duration: sec
    });
};

const warning = (title: string, sec = 0.5) => {
    message.warning({
        content: title,
        duration: sec
    });
};

const error = (title, sec = 0.5) => {
    message.error(title, sec);
};

const toast = {
    error,
    success,
    warning
}

export default toast