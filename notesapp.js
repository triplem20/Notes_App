const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const clearBtn = document.querySelector(".clearB"); 
const yesClear = document.querySelector(".clear-btn"); 


let noteToDelete = null;

//Load Notes
document.addEventListener("DOMContentLoaded", function () {
    showNotes();
});


function showNotes() {
    const savedNotes = localStorage.getItem("notes");
    notesContainer.innerHTML = savedNotes || "";

    // Reattach event listeners to the loaded notes
    notesContainer.querySelectorAll(".input-box").forEach(note => {
        addNoteListeners(note);
    });
}


//Clear Dom Function
function clearDOM() {
    notesContainer.innerHTML = '';
    updateStorage(); 
}

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

//Create Note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "../images/delete-icon-png-16.jpg";
    img.alt = "Delete Note";
    img.style.cursor = "pointer"; 

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);

    addNoteListeners(inputBox);
    updateStorage();
});


//Delete Note
function addNoteListeners(note) {
    note.querySelector("img").addEventListener("click", function () {

        noteToDelete = note;
        openPopup();
        // note.remove();
        // updateStorage();
    });

    note.addEventListener("input", function () {
        updateStorage();
    });
}

//Clear Notes
clearBtn.addEventListener("click", function() {
    openPopupCl(); 
});

//Popup(clear)
let popupcl = document.getElementById("popup-clear")
function openPopupCl(){
    popupcl.classList.add("open-popup");
}
function closePopupCl(){
    popupcl.classList.remove("open-popup");
}

document.querySelector(".clear-btn").addEventListener("click", function() {
    clearDOM(); 
    closePopupCl(); 
});

//Delete Note (after confirmation)
document.querySelector(".delete-btn").addEventListener("click", function () {
    if (noteToDelete) {
        noteToDelete.remove();
        updateStorage(); 
        closePopup(); 
    }
});

//Popups(delete)
let popup= document.getElementById("popup")
function openPopup(){
    popup.classList.add("open-popup");
}
function closePopup(){
    popup.classList.remove("open-popup");
}