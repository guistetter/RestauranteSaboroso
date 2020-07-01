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
  getUsers() {
    return new Promise((resolve, reject) => {
      connection.query(
        `
        SELECT * FROM tb_users ORDER BY title
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
  save(fields, files){
    return new Promise((resolve, reject)=>{     
      let query, queryPhoto = "", params = [
        fields.name,
        fields.email
      ];
      //se o id for maior que 0 é update ai criamos do zero
      if(parseInt(fields.id) > 0){

        params.push(fields.id);

        query = `
        UPDATE tb_users
        set name = ?,
            email = ?,
            where id = ?
        `;

     } else { 
      query = `
      INSERT INTO tb_users (name, email, password)
      values(?,?,?)
      `;
      params.push(fields.password)
     }

      connection.query(query, params, (err, results) => {
        if(err){
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },

  delete(id){
    return new Promise((resolve,reject) => {
      connection.query(`
      DELETE FROM tb_users WHERE id = ?
      `,[
        id
      ],(err, results)=>{
        if(err){
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
};
