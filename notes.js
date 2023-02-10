let btn = document.getElementById("addBtn");
let search = document.getElementById("search");
let text = document.getElementById("textNote");
let noteVal = document.getElementById("noteVal");
if (text.value == "") {
    btn.setAttribute("disabled", "true");
}
text.addEventListener("input", () => {
    check();
})
showNotes();
btn.addEventListener("click", () => {
    let note = localStorage.getItem("notes");

    if (note == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(note);

    }
    notesObj.push(text.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    text.value = "";
    showNotes();
    check();
})
function showNotes() {
    let note = localStorage.getItem("notes");
    let html = ``;
    if (note == null || JSON.parse(note).length == 0) {
        noteVal.innerHTML = "Nothing to show,Try by adding some notes";
    }
    else {
        JSON.parse(note).forEach((element, index) => {
            html += `<div class="card my-2 mx-2" style="width: 21rem;">
            <div class="card-body cardTxt">
              <h5 class="card-title">Note ${index + 1}</h5>
              <p class="card-text">${element}</p>
              <button id="${index}" onclick="del(${this.id})"class="btn btn-sm btn-primary">Delete Note</button>
            </div>
          </div>`
        });
        noteVal.innerHTML = html;
    }
}
function del(index) {
    let note = localStorage.getItem("notes");
    let notesObj = JSON.parse(note);
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
function check() {
    if (text.value != "") {
        btn.removeAttribute("disabled")
    }
    else {
        btn.setAttribute("disabled", "true");
    }
}
search.addEventListener("input", () => {
    let searchVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("cardTxt");
    Array.from(noteCards).forEach((elem) => {
        let cardTxt = elem.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(searchVal)) {
            elem.style.display = "block";
        }
        else {
            elem.style.display = "none";
        }
    })
})