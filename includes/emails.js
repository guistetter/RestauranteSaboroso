var connection = require("./db");

module.exports = {

  getEmails(){
    return new Promise((resolve, reject) => {
      connection.query(`
        SELECT * FROM tb_emails ORDER BY email
      `, (err, results) => {
        if(err){
          reject(err);
        } else {
          resolve(results);
        }
      });
    })
  },

  delete(id){
    return new Promise((resolve, reject) => {
      connection.query(`
      DELETE FROM tb_emails where id = ?
      `, [id],
      (err, results) => {
        if(err){
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }
}