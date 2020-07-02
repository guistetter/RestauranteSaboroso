//interferir no comportamento padrao ao salvar formulario
//dir(document.querySelector("form"))
HTMLFormElement.prototype.save = function(config){

  let form = this;

  form.addEventListener('submit', e =>{

    e.preventDefault();
    let formData = new FormData(form)//formulario criado como objeto

    //fetch("/admin/menus",{ url sera passado no form action
    fetch(form.action,{
      method: form.method,
      body: formData
    })
    .then(response => response.json())
    .then(json => {

      if(json.error){

        if(typeof config.failure === "function") config.failure(json.error);
        // alert(json.error)
        // reject(json);
      } else {

        if(typeof config.success === "function") config.success(json);
        // console.log("json", json)
        // console.log(formData)
        // //window.location.reload();
        // resolve(json);
      }
      
    }).catch(err =>{
      if(typeof config.failure === "function") config.failure(err);
      //reject(err)
      
    })
  });

  
}