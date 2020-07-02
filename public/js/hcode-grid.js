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
      btnUpdate: "btn-update",
      btnDelete: "btn-delete",

      onUpdateLoad: (form, name, data) => {

        let input = form.querySelector('[name=' + name + ']');
        if(input) input.value = data[name];

      }
    },configs);

    this.rows = [...document.querySelectorAll("table tbody tr")];

    this.initForms();
    this.initButtons();

  }//fim constructor

  initForms(){

    this.formCreate = document.querySelector(this.options.formCreate)

    this.formCreate.save({
      success: () => {
        this.fireEvent("afterFromCreate");
      },
      failure: () => {
        this.fireEvent("afterFormCreateError");
      }
    });
  
    this.formUpdate = document.querySelector(this.options.formUpdate);
  
    this.formUpdate.save({
      success:() => {
        this.fireEvent("afterFormUpdate");
      }, failure:() => {
        this.fireEvent("afterFormUpdateError");
      }
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

  btnUpdateClick(e){

    this.fireEvent("beforeUpdateClick",[e]);
    
    let data = this.getTrData(e);

    for (let name in data){
      this.options.onUpdateLoad(this.formUpdate, name, data);
    }

    this.fireEvent("afterUpdateClick",[e]);
  }//fim 

  btnDeleteClick(e){
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

  }//fim btnDelete

  initButtons(){


    this.rows.forEach(row =>{

      [...row.querySelectorAll(".btn")].forEach(btn => {

        btn.addEventListener('click', e => {
              console.log(e.target.classList);
              console.log(this.options.btnUpdate);
               console.log(e.target);
          if(e.target.classList.contains(this.options.btnUpdate)){

            this.btnUpdateClick(e);

          } else if(e.target.classList.contains(this.options.btnDelete)){

            this.btnDeleteClick(e);

          } else {

            this.fireEvent("buttonClick", [e.target, this.getTrData(e),e]);

          }
        });
      });
    });

  }//fim init buttons

}