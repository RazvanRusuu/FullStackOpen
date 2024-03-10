const info = (...params) => {
  console.log(...params);
};

const errors = (...errors) => {
  console.error(...errors);
};

module.exports = {
  info,
  errors,
};
