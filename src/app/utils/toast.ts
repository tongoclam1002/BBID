import { Modal } from "antd";

const error = (title, description?) => {
    Modal.error({
        title: title,
        content: description,
    });
};

const success = (title, description?) => {
    Modal.success({
        title: title,
        content: description,
    });
};

const successAutoClose = (sec, title, description?) => {
    let secondsToGo = sec;
    const modal = Modal.success({
        title: title,
        content: description,
        centered: true,

    });
    setTimeout(() => {
        modal.destroy();
    }, secondsToGo * 1000);
}

const toast = {
    error,
    success,
    successAutoClose
}

export default toast