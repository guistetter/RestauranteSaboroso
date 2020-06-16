var conn = require("./db");

module.exports = {
  render(req, res, error) {
    console.log(error);
    res.render("admin/login", {
      body: req.body,
      error,
    });
  },

  login(email, password) {
    return new Promise((resolve, reject) => {
      conn.query(
        `
        select * from tb_users where email = ?
        `,
        [email],

        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (!results.length > 0) {
              reject("Usuário ou Senha Incorretos");
            } else {
              let row = results[0];

              if (row.password !== password) {
                reject("Usuário ou Senha Incorretos");
              } else {
                resolve(row);
              }
            }
          }
        }
      );
    });
  }, // Fim do metodo login
};
