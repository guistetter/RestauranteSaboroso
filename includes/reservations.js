var connection = require("./db");

module.exports = {

  render(req, res, error, success) {
    res.render("reservations", {
      title: "Reservas-Restaurante Saboroso!",
      background: "images/img_bg_2.jpg",
      h1: "Reserve uma Mesa!",
      body: req.body,
      error,
      success,
    });
  },

  save(fields) {
    return new Promise((resolve, reject) => {

      if(fields.date.indexOf("/") > -1){

        let date = fields.date.split("/");
        fields.date = `${date[2]}-${date[1]}-${date[0]}`;
        
      }
      
      let query, params = [
                          fields.name, 
                          fields.email, 
                          fields.people, 
                          fields.date, 
                          fields.time
                          ];

      if(parseInt(fields.id) > 0){
        query = `
        UPDATE tb_reservations
        SET 
          name = ?,
          email = ?,
          people = ?,
          date = ?,
          time = ?
        Where id = ?
        `;

        params.push(fields.id);

      } else {

        query = `
        INSERT INTO tb_reservations (name, email, people, date, time)
        VALUES(?,?,?,?,?)
        `;
      }

      connection.query(query, params, (err, results) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};
