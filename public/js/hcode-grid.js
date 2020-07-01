class HcodeGrid {
  constructor(configs){

    configs.listeners = Object.assign({
      afterUpdateClick:(e)=>{
        //console.log('afterUpdateClick');
        $("#modal-update").modal('show');
      },
      afterDeleteClick:(e) =>{
        window.location.reload();
      },
      afterFromCreate: (e) => {
        window.location.reload();
      },
      afterFormUpdate:(e)=>{
        window.location.reload();
      },
      afterFormCreateError:(e)=>{
        alert("nao foi possivel enviar o formulario");
      },
      afterFormUpdateError:(e)=>{
        alert("nao foi possivel alterar o formulario");
      }
    },configs.listeners);

    this.options = Object.assign({}, {
      formCreate: "#modal-create form",
      formUpdate: "#modal-update form",
      btnUpdate: ".btn-update",
      btnDelete: ".btn-delete",
    },configs);

    this.initForms();
    this.initButtons();

  }//fim constructor

  initForms(){
    this.formCreate = document.querySelector(this.options.formCreate)

    this.formCreate.save().then(json =>{
  
      this.fireEvent("afterFromCreate");
  
    }).catch(err => {
      this.fireEvent("afterFormCreateError");
        console.log(err)
    });
  
    this.formUpdate = document.querySelector(this.options.formUpdate);
  
    this.formUpdate.save().then(json =>{

      this.fireEvent("afterFormUpdate");

    }).catch(err => {
      this.fireEvent("afterFormUpdateError");
      console.log(err);
    });
  }//fim initForms

  fireEvent(name, args){
    if(typeof this.options.listeners[name] === 'function') 
      this.options.listeners[name].apply(this, args)
  }

  getTrData(e){
    let tr = e.path.find(el => {
      return (el.tagName.toUpperCase() === "TR");
    })

    return JSON.parse(tr.dataset.row)
  
  }

  initButtons(){
    
    //convertendo em array pegando botoes update
    [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn => {
  
      btn.addEventListener("click", e => {
        //this.options.listeners.beforeUpdateClick(e);
        this.fireEvent("beforeUpdateClick",[e])
        let data = this.getTrData(e);
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

          this.fireEvent("afterUpdateClick",[e])
          //this.options.listeners.afterUpdateClick(e);

      });//fim btn.addEventListener

    });//fim update
  
    [...document.querySelectorAll(this.options.btnDelete)].forEach(btn => {
      btn.addEventListener("click", e=>{
        
        this.fireEvent("beforeDeleteClick")
        let data = this.getTrData(e);
        
        if(confirm(eval("`" + this.options.deleteMsg + "`"))){

          console.log("data id delete " + data.id);

         fetch(eval("`" + this.options.deleteUrl + "`"),{
          method: "DELETE"
         })
         .then(response => response.json())
         .then(json => {
            console.log(json)
            this.fireEvent("afterDeleteClick");
          });
        }//fim if

      });//fim listener
    });//fim delete
  }//fim init buttons

}