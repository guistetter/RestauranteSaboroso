let connection = require("./db");
let path = require("path")
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
  save(fields, files){
    return new Promise((resolve, reject)=>{
      fields.photo = `images/${path.parse(files.photo.path).base}` //pegar só o nome do arquivo
      connection.query(`
        INSERT INTO tb_menus (title, description, price, photo)
        values(?,?,?,?)
      `,[
        fields.title,
        fields.description,
        fields.price, 
        fields.photo,
      ], (err, results) => {
        if(err){
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
};
