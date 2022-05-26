const headerDate = document.querySelector(".header_date");
const input = document.querySelector(".todo_input");
const toDoButton = document.querySelector(".todo_button");
const container = document.querySelector(".todo_container");
const toDoList = document.querySelector(".todo_list"); 
const toDoCategory = document.querySelector(".todo_category");
const weekDays = document.querySelectorAll("li"); 
const form = document.querySelector("form");

let todos;

window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  
  form.addEventListener('submit', e => {
    e.preventDefault();
    if(input.value == '') {
      return;
    }
    const selectedCategory = toDoCategory.options[toDoCategory.selectedIndex].value; 
    const todo = {
      content: e.target.elements[0].value,
      category: selectedCategory,
      completed: false
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
  
    input.value = '';
  
    displayToDos();
  })

  displayToDos();
});


function date () {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear(); 
  let day2 = date.getDay();
  switch(day2) {
    case 0: 
      day2 = "Sunday";
      weekDays[6].style.backgroundColor = "rgb(220, 150, 150)";
      weekDays[6].style.textDecoration = "underline";
      weekDays[6].style.color = "white";
      break;
    case 1: 
      day2 = "Monday";
      weekDays[0].style.backgroundColor = "rgb(220, 150, 150)";
      weekDays[0].style.textDecoration = "underline";
      weekDays[0].style.color = "white";
      break;
    case 2: 
      day2 = "Tuesday";
      weekDays[1].style.backgroundColor = "rgb(220, 150, 150)";
      weekDays[1].style.textDecoration = "underline";
      weekDays[1].style.color = "white";
      break;
    case 3: 
      day2 = "Wednesday"; 
      weekDays[2].style.backgroundColor = "rgb(220, 150, 150)";
      weekDays[2].style.textDecoration = "underline";
      weekDays[2].style.color = "white";
      break; 
    case 4:
      day2 = "Thursday";
      weekDays[3].style.backgroundColor = "rgb(220, 150, 150)";
      weekDays[3].style.textDecoration = "underline";
      weekDays[3].style.color = "white";
      break;
    case 5:
      day2 = "Friday";
      weekDays[4].style.backgroundColor = "rgb(220, 150, 150)";
      weekDays[4].style.textDecoration = "underline";
      weekDays[4].style.color = "white";
      break;
    case 6:
      day2 = "Saturday";
      weekDays[5].style.backgroundColor = "rgb(220, 150, 150)";
      weekDays[5].style.textDecoration = "underline";
      weekDays[5].style.color = "white";
      break;
  }
  if(month < 10) {
    headerDate.prepend(`${day}.0${month}.${year} ${day2}`);
  } else {
    headerDate.prepend(`${day}.${month}.${year} ${day2}`);
  }
}
date();



function displayToDos() {
  toDoList.innerHTML = '';
  todos.forEach(todo => {
    const newToDo = document.createElement("li"); 
    const toDoText = document.createElement("div"); 
    toDoText.innerText = todo.content;
    newToDo.classList.add("todo_item"); 
    toDoText.classList.add("todo_text");
    toDoList.prepend(newToDo);
    newToDo.append(toDoText);

    const checkButton = document.createElement("button");
    checkButton.classList.add("item_check_button");
    toDoText.before(checkButton);


    checkButton.addEventListener('click', e => {
      todo.completed = e.target.classList.contains("checked"); 
      if(todo.completed) {
        checkButton.classList.remove("checked");
        toDoText.classList.remove("completed");
        todo.completed = false; 
      } else {
        checkButton.classList.add("checked");
        toDoText.classList.add("completed");
        todo.completed = true;
      }
      localStorage.setItem('todos', JSON.stringify(todos));
    })

    if(todo.completed) {
      checkButton.classList.add("checked");
      toDoText.classList.add("completed");
    } else {
      checkButton.classList.remove("checked");
      toDoText.classList.remove("completed");
    }
    
    const category = document.createElement("div"); 
    category.classList.add("item_category");
    category.innerText = todo.category;
    if(todo.category == "Housework") {
      category.innerHTML = `<img src="./assets/house.svg"/> ${todo.category}`;
    }
    if(todo.category == "Work") {
      category.innerHTML = `<img src="./assets/work.svg"/> ${todo.category}`;
    }
    if(todo.category == "Personal") {
      category.innerHTML = `<img src="./assets/personal.svg"/> ${todo.category}`;
    }
    if(todo.category == "Relationships") {
      category.innerHTML = `<img src="./assets/heart.svg"/> ${todo.category}`;
    }
    if(todo.category == "select") {
      category.innerHTML = "";
    }
  
    const delButton = document.createElement("button");
    delButton.classList.add("item_del_button");
    delButton.innerHTML = `<img src="./assets/trash.svg"/>`;
    
    const categoryDelButtons = document.createElement("div");
    categoryDelButtons.classList.add("category_del_buttons");
    newToDo.append(categoryDelButtons);
    categoryDelButtons.append(category);
    categoryDelButtons.append(delButton);

    delButton.addEventListener('click', () => {
      newToDo.remove();
      todos = todos.filter(t => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
    })
  })
}

