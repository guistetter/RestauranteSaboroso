class HcodeFileReader{
//inputEl é o elemento modal-create do tipo file e igmEl é o campo onde sera inserido a img
  constructor(inputEl, imgEl){
    this.inputEl = inputEl;
    this.imgEl = imgEl
    this.initInputEvent()
  }
  
  initInputEvent(){
     //adiciona o evento;
    console.log(document.querySelector(this.inputEl))
    //observa a mudanca no modal-create ou modal-update
    document.querySelector(this.inputEl).addEventListener("change",e => {

      console.log(e.target.files[0])

      this.reader(e.target.files[0]).then(result => {
        //toda vez que alterar fazer o reader
        console.log(document.querySelector(this.inputEl))
        //insere no campo img a nova imagem 
        document.querySelector(this.imgEl).src = result;

      })
    })
  }//fim initInput

  reader(file){
    return new Promise((resolve, reject) =>{

      let reader = new FileReader()

      reader.onload = function(){
        console.log(reader)
        resolve(reader.result)
      }

      reader.onerror = function(){
        reject("Não foi possivel ler a imagem ")
      }

      reader.readAsDataURL(file)

    })

  }//fim reader



}