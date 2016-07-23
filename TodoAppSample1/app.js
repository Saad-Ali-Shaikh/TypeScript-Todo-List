var Note = (function () {
    function Note() {
    }
    return Note;
}());
var notes = new Array();
window.onload = function () {
    var btnSave = document.getElementById('btnSaveNote');
    btnSave.onclick = function () {
        var noteSub = document.getElementById("txtNoteSubject");
        var noteDesc = document.getElementById("txtNoteDescription");
        var note = new Note();
        if (parseInt(btnSave.title) > 0) {
            note.NoteId = parseInt(btnSave.title);
            deleteNote(note.NoteId);
        }
        else {
            note.NoteId = notes != null && notes.length > 0 && typeof (notes) !== 'undefined' ? notes.length + 1 : 1;
        }
        note.NoteSubject = noteSub.value;
        note.NoteDescription = noteDesc.value;
        //if (note.NoteSubject == '' || note.NoteDescription == '') {
        notes.push(note);
        clearForm();
        showNotes();
        //} else {
        //    alert('Please provide complete information!');  
        //}
    };
    var btnClear = document.getElementById('btnClearNote');
    btnClear.onclick = function () { clearForm(); };
};
function deleteNote(noteId) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].NoteId == noteId) {
            notes.splice(i, 1);
            showNotes();
        }
    }
}
function editNote(noteId) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].NoteId == noteId) {
            loadNote(notes[i]);
        }
    }
}
function loadNote(note) {
    var noteSub = document.getElementById("txtNoteSubject");
    var noteDesc = document.getElementById("txtNoteDescription");
    noteSub.value = note.NoteSubject;
    noteDesc.value = note.NoteDescription;
    var btnSave = document.getElementById('btnSaveNote');
    btnSave.title = note.NoteId.toString();
}
function showNotes() {
    clearNotes();
    if (notes != null && notes.length > 0) {
        notes.sort();
        for (var i = 0; i < notes.length; i++) {
            printNote(notes[i]);
        }
    }
}
function clearNotes() {
    var savedNotes = document.getElementById("SavedNotes");
    savedNotes.tBodies[0].innerHTML = "";
}
function clearForm() {
    var noteSub = document.getElementById("txtNoteSubject");
    var noteDesc = document.getElementById("txtNoteDescription");
    noteSub.value = "";
    noteDesc.value = "";
    var btnSave = document.getElementById('btnSaveNote');
    btnSave.title = "0";
}
function printNote(note) {
    var savedNotes = document.getElementById("SavedNotes");
    var noteSubCol = document.createElement("td");
    var noteDescCol = document.createElement("td");
    var noteCommandCol = document.createElement("td");
    var noteEditButton = document.createElement("button");
    var noteDeleteButton = document.createElement("button");
    noteEditButton.id = note.NoteId.toString();
    noteDeleteButton.id = note.NoteId.toString();
    noteEditButton.innerText = "Edit";
    noteDeleteButton.innerText = "Delete";
    noteEditButton.onclick = function () { editNote(note.NoteId); };
    noteDeleteButton.onclick = function () { deleteNote(note.NoteId); };
    noteCommandCol.width = "150px";
    noteCommandCol.appendChild(noteEditButton);
    noteCommandCol.appendChild(noteDeleteButton);
    var noteIdSpan = document.createElement("span");
    noteIdSpan.hidden = true;
    noteIdSpan.innerHTML = "" + note.NoteId;
    noteSubCol.width = "300px";
    noteSubCol.appendChild(noteIdSpan);
    var noteSubSpan = document.createElement("span");
    noteSubSpan.innerHTML = note.NoteSubject;
    noteSubCol.appendChild(noteSubSpan);
    var noteDescSpan = document.createElement("span");
    noteDescSpan.innerHTML = note.NoteDescription;
    noteDescCol.width = "300px";
    noteDescCol.appendChild(noteDescSpan);
    var noteRow = document.createElement("tr");
    noteRow.insertCell(0).appendChild(noteSubCol);
    noteRow.insertCell(1).appendChild(noteDescCol);
    noteRow.insertCell(2).appendChild(noteCommandCol);
    savedNotes.tBodies[0].appendChild(noteRow);
}
//# sourceMappingURL=app.js.map