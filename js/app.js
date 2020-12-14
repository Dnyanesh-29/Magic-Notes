console.log("Welocme");

let date=new Date();  
let day=date.getDate();  
let month=date.getMonth()+1;  
let year=date.getFullYear(); 
let fullDate = day +"/"+month+"/"+year                                      
showNotes();

// if user add a note add it to local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let addTitle = document.getElementById("addTitle");
  if (notes == null) {
    localStorage.clear();
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let MyObj = {
    Title: addTitle.value,
    Text: addTxt.value,
    imp: false,
    Date: fullDate
  } 
  notesObj.unshift(MyObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// add note ass important
let addBtnImp = document.getElementById("addBtnImp");
addBtnImp.addEventListener("click", function () {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let addTitle = document.getElementById("addTitle");
  if (notes == null) {
    localStorage.clear();
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let MyObj = {
    Title: addTitle.value,
    Text: addTxt.value,
    imp: true,
    Date: fullDate
  } 
  // console.log(MyObj.imp)
  notesObj.unshift(MyObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  // console.log(notesObj);
  showNotes();
});



// function to show elements from localstorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    localStorage.clear();
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }   
  // console.log(notesObj);
  
  
  let html = "";
  notesObj.forEach(function (element, index) {
    if (element.imp === true) {
      html += `
      <div class="noteCard my-2 mx-2 imp-card card node-${index}" style="width: 18rem;)">
      <div class="card-body ">
      <span style = "font-size: 14px; color:White;">${element.Date}</span>
      <h5 class="card-title">${element.Title}</h5>
      <p class="card-text">${element.Text}</p>
      <button type="button" class="btn btn-primary row mx-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick = "fullScreen(${index})">
      Open Note
      </button>
      <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
      </div>
      </div>`;
    } 
    else {
      html += `
      <div class="noteCard my-2 mx-2 card bg-info node-${index}" style="width: 18rem">
      <div class="card-body ">
      <span style = "font-size: 14px; color:white">${element.Date}</span>
      <h5 class="card-title">${element.Title}</h5>
      <p class="card-text">${element.Text}</p>
      <button type="button" class="btn btn-primary row mx-1" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick ="fullScreen(${index})">
      Open Note
      </button>
      <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
      </div> 
      </div>`; 
    } 
   
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = "Noting to show";
  }

}

// function to delete a note
function deleteNote(index) {
  // console.log("i am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    localStorage.clear();
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// function fpr search button 
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputVal = search.value.toLowerCase();
  // console.log('Input event fired!', inputVal);
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    // console.log(cardTxt);
  });
});

// Read note in big screen
function fullScreen(s) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    localStorage.clear();
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }  
    let ModalTitle = document.getElementById("staticBackdropLabel");
      ModalTitle.innerText = notesObj[s]["Title"];
    let ModalText = document.getElementById("modal-body")
    ModalText.innerText = notesObj[s]["Text"]
    let ModalDate = document.getElementById("ModalDate");
    ModalDate.innerHTML = notesObj[s]["Date"]
    let modalFooter = document.getElementsByClassName("modal-footer")[0]
    modalFooter.innerHTML = `<button type="button" class="btn btn-primary" onclick="editNote(${s})">Edit Note</button>`
}

// function to edit the note
function editNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    localStorage.clear();
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }


  ModalTitle = document.getElementById("staticBackdropLabel");
  ModalTitle.Value = notesObj[index]["Title"]
  ModalTitle.innerHTML = `<textarea class="form-control" id="editNoteTitle" rows="1" style = "width: 800px;" is="auto-size">${ModalTitle.Value}</textarea>`

  modalBody = document.getElementById("modal-body");
  modalBody.Value = notesObj[index]["Text"]
  modalBody.innerHTML = `<textarea class="form-control" id="editNoteText" rows="3" style = "width: 100%" is="auto-size">${modalBody.Value}</textarea>`
  let modalFooter = document.getElementsByClassName("modal-footer")[0]
  modalFooter.innerHTML = `<button type="button" class="btn btn-primary" onclick="editNoteText1(${index})">Save Note</button>`
  
  // console.log("Editing");      
}

function editNoteText1(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    localStorage.clear();
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let saveTextValue = document.getElementById("editNoteText").value;
  let saveTitleValue = document.getElementById("editNoteTitle").value;
  if (notesObj[index]["imp"] == true) {
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    let MyObj = {
      Title: saveTitleValue,
      Text: saveTextValue ,
      imp: true,
      Date: `${fullDate}(Edited)`
    } 
    notesObj.splice(index, 0, MyObj);
    // notesObj.unshift(MyObj);
  } 
  else {
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    let MyObj = {
      Title: saveTitleValue,
      Text: saveTextValue ,
      imp: false,
      Date: `${fullDate}(Edited)`
    } 
    notesObj.splice(index, 0, MyObj);
    // notesObj.unshift(MyObj);
  }
  let BodyText = notesObj[index]["Text"]
  let TitleText  = notesObj[index]["Title"]
  modalBody.innerText = `${BodyText}`
  ModalTitle.innerText = `${TitleText}`
  let modalFooter = document.getElementsByClassName("modal-footer")[0]
  modalFooter.innerHTML = `<button type="button" class="btn btn-primary" onclick="editNote(${index})">edit Note</button>`
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes()
}


