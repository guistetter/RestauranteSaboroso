class HcodeGrid {
  constructor(configs){
    this.options = Object.assign({}, {
      formCreate: "#modal-create form",
      formUpdate: "#modal-update form",
      btnUpdate: ".btn-update",
      btnDelete: ".btn-delete",
    },configs);
    this.initForms();
    this.initButtons();
  }

  initForms(){
    this.formCreate = document.querySelector(this.options.formCreate)

    this.formCreate.save().then(json =>{
  
      window.location.reload();
  
    }).catch(err => {
        console.log(err)
    });
  
    this.formUpdate = document.querySelector(this.options.formUpdate);
  
    this.formUpdate.save().then(json =>{
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });
  }
  
  initButtons(){
    
    //convertendo em array pegando botoes update
    [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn => {
  
      btn.addEventListener("click", e => {
  
          let tr = e.path.find(el => {
            return (el.tagName.toUpperCase() === "TR");
          })
  
          let data = JSON.parse(tr.dataset.row)
          console.log(data);
  
          for (let name in data){
            let input = this.formUpdate.querySelector(`[name=${name}]`);
            switch(name){
              case "date":
              if(input) input.value = moment(data[name]).format("YYYY-MM-DD");
                console.log(data[name]);
                console.log(moment(data[name]).format("YYYY-MM-DD"));
              break;
              default : 
              if(input) input.value = data[name];
            }
    
          }
          $("#modal-update").modal('show');
      });//fim btn.addEventListener
    });//fim update
  
    [...document.querySelectorAll(this.options.btnDelete)].forEach(btn => {
      btn.addEventListener("click", e=>{
    
        let tr = e.path.find(el => {
          return (el.tagName.toUpperCase() === "TR");
        });

        let data = JSON.parse(tr.dataset.row);

        if(confirm(eval("`" + this.options.deleteMsg + "`"))){

          console.log("data id delete " + data.id);

        fetch(eval("`" + this.options.deleteUrl + "`"),{
          method: "DELETE"
        })
        .then(response => response.json())
        .then(json => {

          console.log(json)
          
          window.location.reload();
        });
        } 
      });
    });
  }
}