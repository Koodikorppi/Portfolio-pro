require('dotenv').config()

module.exports = (on, config) => {
  // copy any needed variables from process.env to config.env
  config.env.username = process.env.USER_NAME

  // do not forget to return the changed config object!
  return config
}