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

  getNavigation(params){
    let limitPagesNav = 5;
    let links = [];
    let nrstart = 0;
    let nrend = 0;

    if(this.getTotalPages() < limitPagesNav){
      limitPagesNave = this.getTotalPages();
    }
    //checar se é uma das primeiras paginas
    if((this.getCurrentPage() - parseInt(limitPagesNav / 2)) < 1){
      nrstart = 1;
      nrend = limitPagesNav;
    } else if((this.getCurrentPage() + parseInt(limitPageNav/1)) > this.getTotalPages()){
      nrstart = this.getTotalPages() - limitPagesNav;
      nrend = this.getTotalPages();
    } else {
      nrstart = this.getCurrentPage() - parseInt(limitPageNave / 2);
      nrend = this.getCurrentPage() + parseInt(limitPageNav/2);
    }

    for(let x = nrstart; x <= nrend; x++){
      links.push({
        text: x,
        href: `?page=${x}`
      })
    }

    return links;
  }

}


module.exports = Pagination;