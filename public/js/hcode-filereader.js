class HcodeFileReader{

  constructor(inputEl, imgEl){
    this.inputEl = inputEl;
    this.imgEl = imgEl
    this.initInputEvent()
  }
  
  initInputEvent(){
    console.log(document.querySelector(this.inputEl))

    document.querySelector(this.inputEl).addEventListener("change",e => {

      console.log(e.target.files[0])

      this.reader(e.target.files[0]).then(result => {
        console.log(document.querySelector(this.inputEl))
        document.querySelector(this.imgEl).src= result;
      })
    })
  }

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
    
  }
}