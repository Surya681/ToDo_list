const td = document.querySelector(".todos");
const add = document.getElementById('add')
const text = document.querySelector('.inp');
const clear = document.querySelector('.clear');
const clear_c=document.querySelector('.clear_comp')

const tasks = JSON.parse(localStorage.getItem("tasks"));
const completed = JSON.parse(localStorage.getItem("completed"));

var p = 0;

if (tasks) {
  tasks.forEach((task) => {
    addNewTask(task, completed[p]);
    p++;

  });
}
if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}
add.addEventListener('click', () => {

  addNewTask();
})

text.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {

    addNewTask();
  }
})

function addNewTask(tsk = " ", cmp = 0) {

  if (tsk == " ")
  {showNotification("success", "Task was successfully added")
    t = text.value;}
  else {
    t = tsk;
  }



  if (t == '' || t == ' ') {
    alert('enter some value')
  } else {

    var todo = document.createElement('li');
    var btn = document.createElement('button');

    btn.classList.add('btn')
    todo.classList.add('tasks')
    btn.innerHTML = `
<i class="fa-solid fa-xmark"></i>
`
    td.appendChild(todo);
    td.appendChild(btn);
    if (cmp == 1) {
      todo.classList.add('completed');
    }

    btn.addEventListener("click", () => {
      todo.remove();
      btn.remove();
      updateLS()
      showNotification("success", "Task was successfully Deleted")

    });

    todo.addEventListener("click", () => {
      if (todo.classList.contains('completed')) {
        todo.classList.remove('completed');
        btn.classList.remove('comp');
      } else {
        todo.classList.add('completed');
        btn.classList.add('comp');
        comp();
      }
    });

    clear.addEventListener("click", () => {

      clear_all();
      updateLS()
      showNotification("success", "All tasks were cleared")

    })
    clear_c.addEventListener("click", () => {

      clear_comp();
      updateLS()
      showNotification("success", "All completed tasks were cleared")

    })

    todo.innerHTML = t;
    updateLS()
    comp();

    text.value = ' ';

  }

}

function updateLS() {
  const notesText = document.querySelectorAll(".tasks");

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.innerHTML);

  });

  localStorage.setItem("tasks", JSON.stringify(notes));
}

function comp() {
  const c = document.querySelectorAll("li");

  const com = [];
  c.forEach((task) => {
    if (task.classList.contains('completed')) {
      com.push(1);
    } else {
      com.push(0);

    }
    // console.log(note.innerHTML);
  });

  localStorage.setItem("completed", JSON.stringify(com));
}

function showNotification(type, text) {
  new Noty({
    type,
    text: `<i class="check icon"></i> ${text}`,
    layout: "bottomRight",
    timeout: 500,
    progressBar: true,
    closeWith: ["click"],
    theme: "bootstrap-v3",
  }).show()
}


function clear_all() {
  const clear = document.querySelectorAll('li')
  const clbtn = document.querySelectorAll('.btn')
  clear.forEach((cl) => {
    cl.remove();

  });
  clbtn.forEach((cl) => {
    cl.remove();

  });

}



function clear_comp() {
  const clear = document.querySelectorAll('li')
  const clbtn = document.querySelectorAll('.btn')
  clear.forEach((cl) => {
    if(cl.classList.contains('completed'))
    cl.remove();

  });
  clbtn.forEach((cl) => {
    if(cl.classList.contains('comp'))
    cl.remove();

  });

}
