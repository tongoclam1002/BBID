import axios from "axios";

interface IApi {
  API_TOKEN: string;
  CLIENT: string;
  API_URL: string;
}

export default class Api implements IApi {
  API_TOKEN = null;
  CLIENT = null;
  API_URL = process.env.REACT_APP_API_URL;

  init = () => {
    let headers = {
      Accept: "application/json",
      Authorization: "",
    };

    if (this.API_TOKEN) {
      headers.Authorization = `Bearer ${this.API_TOKEN}`;
    }

    this.CLIENT = axios.create({
      baseURL: this.API_URL,
      timeout: 31000,
      headers: headers,
    });

    return this.CLIENT;
  };

  get = (url: string) => {
    return this.init()
      .get(url)
      .then((res: any) => {
        console.log(res);
        if (res.statusText != "OK") {
          this.handleResponseError(res);
        }
        return res.data.data;
      })
      .catch((error: any) => {
        this.handleResponseError(error);
      });
  };

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
    console.log(error.message);
  }
}
