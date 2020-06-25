//interferir no comportamento padrao ao salvar formulario
//dir(document.querySelector("form"))
HTMLFormElement.prototype.save = function(){

  let form = this;
  
  return new Promise ((resolve, reject) => {

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
        console.log("json", json)
        console.log(formData)
        //window.location.reload();
        resolve(json);
      }).catch(err =>{

        reject(err)
        
      })
    });

  })
  
}