let connection = require("./db");

class Pagination {
  
  constructor(
    query, 
    params = [],
    itensPerPage = 10
  ){this.query = query;
    this.params = params;
    this.itensPerPage = itensPerPage;
  }

  getPage(page){

    this.currentPage = page -1;

    this.params.push(
      this.currentPage * this.itensPerPage,
      this.itensPerPage
    );

    return new Promise((resolve, reject) => {
      connection.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(";"), 
      this.params, (err, results) => {
        if(err){
          reject(err);
        } else {

          this.data = results[0];
          this.total = results[1][0].FOUND_ROWS;
          this.totalPages = Math.ceil(this.total / this.itensPerPage);
          console.log(this.total);
          console.log(this.totalPages);
          resolve(this.data);
        }
      });
    });

  }//fim getPage
  
  getTotal(){
    return this.total;
  }

  getCurrentPage(){
    return this.currentPage;
  }

  getTotalPages(){
    return this.totalPages;
  }

}


module.exports = Pagination;