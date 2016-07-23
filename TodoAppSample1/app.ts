class Note {
    public NoteId: number;
    public NoteSubject: string;
    public NoteDescription: string;
}

var notes: Array<Note> = new Array<Note>();
window.onload = () => {
    var btnSave = <HTMLButtonElement>document.getElementById('btnSaveNote');
    btnSave.onclick = () => {
        var noteSub = <HTMLInputElement>document.getElementById("txtNoteSubject");
        var noteDesc = <HTMLInputElement>document.getElementById("txtNoteDescription");
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

    var btnClear = <HTMLButtonElement>document.getElementById('btnClearNote');
    btnClear.onclick = ()=> { clearForm(); };
};

function deleteNote(noteId: number) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].NoteId == noteId) {
            notes.splice(i, 1);
            showNotes();
        }
    }
}

function editNote(noteId: number) {
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].NoteId == noteId) {
            loadNote(notes[i]);
        }
    }
}

function loadNote(note: Note) {
    var noteSub = <HTMLInputElement>document.getElementById("txtNoteSubject");
    var noteDesc = <HTMLInputElement>document.getElementById("txtNoteDescription");

    noteSub.value = note.NoteSubject;
    noteDesc.value = note.NoteDescription;

    var btnSave = <HTMLButtonElement>document.getElementById('btnSaveNote');
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
    var savedNotes: HTMLTableElement = <HTMLTableElement>document.getElementById("SavedNotes");
    savedNotes.tBodies[0].innerHTML = "";
}

function clearForm() {
    var noteSub = <HTMLInputElement>document.getElementById("txtNoteSubject");
    var noteDesc = <HTMLInputElement>document.getElementById("txtNoteDescription");

    noteSub.value = "";
    noteDesc.value = "";

    var btnSave = <HTMLButtonElement>document.getElementById('btnSaveNote');
    btnSave.title = "0";
}

function printNote(note: Note) {
    var savedNotes: HTMLTableElement = <HTMLTableElement>document.getElementById("SavedNotes");
    var noteSubCol: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.createElement("td");
    var noteDescCol: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.createElement("td");
    var noteCommandCol: HTMLTableDataCellElement = <HTMLTableDataCellElement>document.createElement("td");

    var noteEditButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");
    var noteDeleteButton: HTMLButtonElement = <HTMLButtonElement>document.createElement("button");

    noteEditButton.id = note.NoteId.toString();
    noteDeleteButton.id = note.NoteId.toString();

    noteEditButton.innerText = "Edit";
    noteDeleteButton.innerText = "Delete";

    noteEditButton.onclick = () => { editNote(note.NoteId); };
    noteDeleteButton.onclick = () => { deleteNote(note.NoteId); };
    noteCommandCol.width = "150px";
    noteCommandCol.appendChild(noteEditButton);
    noteCommandCol.appendChild(noteDeleteButton);

    var noteIdSpan: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
    noteIdSpan.hidden = true;
    noteIdSpan.innerHTML = "" + note.NoteId;
    noteSubCol.width = "300px";
    noteSubCol.appendChild(noteIdSpan);

    var noteSubSpan: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
    noteSubSpan.innerHTML = note.NoteSubject;
    noteSubCol.appendChild(noteSubSpan);

    var noteDescSpan: HTMLSpanElement = <HTMLSpanElement>document.createElement("span");
    noteDescSpan.innerHTML = note.NoteDescription;
    noteDescCol.width = "300px";
    noteDescCol.appendChild(noteDescSpan);

    var noteRow: HTMLTableRowElement = <HTMLTableRowElement>document.createElement("tr");
    noteRow.insertCell(0).appendChild(noteSubCol);
    noteRow.insertCell(1).appendChild(noteDescCol);
    noteRow.insertCell(2).appendChild(noteCommandCol);

    savedNotes.tBodies[0].appendChild(noteRow);
}
