import React, { useState } from 'react';
import "../Styles/Sales.css"



function FileUploader() {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleButtonClick = () => {
    document.getElementById('input-file').click();
  };

  const handleInputChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);
    showFiles(selectedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const selectedFiles = event.dataTransfer.files;
    setFiles(selectedFiles);
    showFiles(selectedFiles);
  };

  function showFiles(files) {
    for (const file of files) {
      processFile(file);
    }
  }

  function processFile(file) {
    const docType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'imga/png'];

    if (validExtensions.includes(docType)) {
      const fileReader = new FileReader();
      const id = `file-${Math.random().toString(32).substring(7)}`;

      fileReader.addEventListener('load', (event) => {
        const fileUrl = event.target.result;
        const image = `
          <div id="${id}" className="file-container">
            <img src="${fileUrl}" alt="${file.name}">
            <div className="status">
              <span>${file.name}</span>
              <span className="status-text">Loading...</span>
            </div>
          </div>
        `;
        const previewHtml = document.querySelector('#preview').innerHTML;
        document.querySelector('#preview').innerHTML = image + previewHtml;
      });

      fileReader.readAsDataURL(file);
      uploadFile(file, id);
    } else {
      alert('No es un archivo válido');
    }
  }

  async function uploadFile(file, id) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      document.querySelector(`#${id}.status-text`).innerHTML = `<span className="success"></span>`;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`drop-area ${isDragging ? 'active' : ''}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <h2>Arrastra y suelta imágenes</h2>
      <button onClick={handleButtonClick}>Seleccionar archivos</button>
      <input type="file" id="input-file" onChange={handleInputChange} multiple style={{ display: 'none' }} />
      <div id="preview"></div>
    </div>
  );
}

export default FileUploader;





// const dropArea = Document.querySelector(".drop-area");
// const dragText = dropArea.querySelector("h2")
// const button = dropArea.querySelector("button");
// const input = dropArea.querySelector(".#input-file");
// let files;

// button.addEvenListener("click", (e)=> {
//   input.click();
// })



// input.addEvenListener("change", (e)=>{
//   files = this.files;
//   dropArea.classList.add("active;")
//   showFiles(files);
//   dropArea.classList.remove("active")

// })


// dropArea.addEvenListener("dragover",(e)=>{
//  e.prevenDefault()
//  dropArea.classList.add("active")
//  dragText.textContent="Arrastra y suelta imagenes"
// })

// dropArea.addEvenListener("dragleave",(e)=>{
//   e.prevenDefault()
//   dropArea.classList.add("active")
//   dragText.textContent="Arrastra y suelta imagenes"
// })

// dropArea.addEvenListener("drop", (e)=>{
//   e.prevenDefault()
//   files = e.dataTrasnfer.files;
  
//   dropArea.classList.add("active")
//   dragText.textContent="Arrastra y suelta imagenes"
// })


// function showFiles(files){
// if(files.length === undefined){
 
//   processFile(files);
// }else{
//   for(const file of files)
//   {
//     processFile(file);
//   }
// }
// }

// function processFile(file){
// const docType = file.type
// const valideExtensions =['image/jpeg', 'image/jpg','imga/png',]


// if(valideExtensions.includes(docType)){
//   //archivo valido
//   const fileReader = new FileReader();
//   const id = `file-${Math.random().toString(32).substring(7)}`

// fileReader.addEventListener('load',e=>{
//   const fileUrl = fileReader.result;
//   const img =
//   ` <div id="${id}" className="file-container">
//     <img src="${fileUrl}" alt ="${file.name}"> 
    
//     <div className="status">
//     <span>${file.name}
//     <span className = "status-text">
//     Loading...
//     </span>
//     </div>`;


// const html = document.querySelector("#preview").innerHTML;
// document.querySelector("#Preview").innerHTML = image + html
// })



// FileReader.readAsDataURL(file)
// uploadFile(file, id);

// }else{
//   //no es un archivo valido
// alert("No es un archivo válido");

// }

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   try {
//     const response = await fetch('http://localhost:3000/upload', {
//       method: "POST",
//       body: formData,
//     });

//     const responseText = await response.text();
//     document.querySelector(`#${id}.status-text`).innerHTML= `<span className="success"></span>`

//   } catch(error) {
//     console.error(error);
//   }
// };
// }