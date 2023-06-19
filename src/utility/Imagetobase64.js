async function ImagetoBase64(file){
//create object for filereader
    const reader=new FileReader()
    reader.readAsDataURL(file)

    const data = new Promise((resolve,reject)=>{
      reader.onload=()=>resolve(reader.result)
      reader.onerror=err=>reject(err)  
    })
return data
}

export {ImagetoBase64}