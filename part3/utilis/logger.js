const info = (...params) => {
  console.log(...params)
}

const errors = (...erros) => {
  console.error(...errors)
}

module.exports = { info, errors }
