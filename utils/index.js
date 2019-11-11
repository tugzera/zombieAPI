const dateNow = () => {
  const date = new Date(Date.now()).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo"
  });
  return date;
};

module.exports = {dateNow}
