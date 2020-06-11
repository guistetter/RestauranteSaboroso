let connection = require("./db");

module.exports = {
  getMenus() {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT * FROM tb_menus ORDER BY title
      `,
        (err, results) => {
          if (err) {
            reject(err);
          }
          resolve(results);
        }
      );
    });
  },
};
