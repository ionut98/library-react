const config = {
  IP: 'localhost',
  PORT: 30401,
};

const URI = (route) => `http://${config.IP}:${config.PORT}/${route}`;

export {
  URI,
};