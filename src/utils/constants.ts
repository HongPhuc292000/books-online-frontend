const baseUrl = process.env.REACT_APP_API;

const defaultFilter = {
  page: 0,
  size: 10,
};

const emailRegex =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export { defaultFilter, baseUrl, emailRegex };
