const moment = require("moment");

const dateNow = () => {
  const format = "YYYY-MM-DD HH:mm:ss";
  const date = moment(Date.now())
    .locale("pt-br")
    .format(format);

  return date;
};

module.exports = { dateNow };
