let connection = require("./db");
let path = require("path");
const { resolve } = require("path");
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
     
      //params padrao, comum ao insert e update, diferenca id e photo
      let query, queryPhoto = "", params = [
        fields.title,
        fields.description, 
        fields.price 
      ];
      //precisa do name pra saber tem a foto mas tem conteudo?, sem o name nao funciona
      if(files.photo.name){
        queryPhoto = ",photo = ?";
        params.push(fields.photo);
      }
      //se o id for maior que 0 é update ai criamos do zero
      if(parseInt(fields.id) > 0){
        params.push(fields.id);

        query = `
        UPDATE tb_menus
        set title = ?,
            description = ?,
            price = ?
            ${queryPhoto}
            where id = ?
        `;
     } else { //se id nao for > 0 então é um novo cadastrao, nao é update
       if(!files.photo.name){
         reject("Envie a foto do prato.");
       }
      query = `
      INSERT INTO tb_menus (title, description, price, photo)
      values(?,?,?,?)
      `;
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
      DELETE FROM tb_menus WHERE id = ?
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
