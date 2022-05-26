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

  displayToDos();
});

form.addEventListener('submit', e => {
  e.preventDefault();

  if (!input.value) {
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


// TODO: IIFE
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear(); 

let weekDay = date.getDay();

switch(weekDay) {
  case 0: 
    weekDay = "Sunday";
    weekDays[6].style.backgroundColor = "rgb(220, 150, 150)";
    weekDays[6].style.textDecoration = "underline";
    weekDays[6].style.color = "white";
    break;
  case 1: 
    weekDay = "Monday";
    weekDays[0].style.backgroundColor = "rgb(220, 150, 150)";
    weekDays[0].style.textDecoration = "underline";
    weekDays[0].style.color = "white";
    break;
  case 2: 
    weekDay = "Tuesday";
    weekDays[1].style.backgroundColor = "rgb(220, 150, 150)";
    weekDays[1].style.textDecoration = "underline";
    weekDays[1].style.color = "white";
    break;
  case 3: 
    weekDay = "Wednesday"; 
    weekDays[2].style.backgroundColor = "rgb(220, 150, 150)";
    weekDays[2].style.textDecoration = "underline";
    weekDays[2].style.color = "white";
    break; 
  case 4:
    weekDay = "Thursday";
    weekDays[3].style.backgroundColor = "rgb(220, 150, 150)";
    weekDays[3].style.textDecoration = "underline";
    weekDays[3].style.color = "white";
    break;
  case 5:
    weekDay = "Friday";
    weekDays[4].style.backgroundColor = "rgb(220, 150, 150)";
    weekDays[4].style.textDecoration = "underline";
    weekDays[4].style.color = "white";
    break;
  case 6:
    weekDay = "Saturday";
    weekDays[5].style.backgroundColor = "rgb(220, 150, 150)";
    weekDays[5].style.textDecoration = "underline";
    weekDays[5].style.color = "white";
    break;
}

const output = `${day}.${month < 10 ? 0 : ''}${month}.${year} ${weekDay}`;
headerDate.prepend(output);



function displayToDos() {
  toDoList.innerHTML = '';

  todos.forEach(todo => {
    const newToDo = document.createElement("li"); 
    const toDoText = document.createElement("div"); 
    const checkButton = document.createElement("button");
    const category = document.createElement("div"); 
    const delButton = document.createElement("button");
    const categoryDelButtons = document.createElement("div");

    toDoText.innerText = todo.content;
    newToDo.classList.add("todo_item"); 
    toDoText.classList.add("todo_text");
    checkButton.classList.add("item_check_button");
    toDoList.prepend(newToDo);
    newToDo.append(toDoText);
    toDoText.before(checkButton);

    checkButton.addEventListener('click', e => {
      todo.completed = e.target.classList.contains("checked");

      if (todo.completed) {
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

    if (todo.completed) {
      checkButton.classList.add("checked");
      toDoText.classList.add("completed");
    } else {
      checkButton.classList.remove("checked");
      toDoText.classList.remove("completed");
    }
    
    category.classList.add("item_category");
    category.textContent = todo.category;

    if (todo.category === "Housework") {
      category.innerHTML = `<img src="./assets/house.svg"/> ${todo.category}`;
    }
    if (todo.category === "Work") {
      category.innerHTML = `<img src="./assets/work.svg"/> ${todo.category}`;
    }
    if (todo.category === "Personal") {
      category.innerHTML = `<img src="./assets/personal.svg"/> ${todo.category}`;
    }
    if (todo.category === "Relationships") {
      category.innerHTML = `<img src="./assets/heart.svg"/> ${todo.category}`;
    }
    if (todo.category === "select") {
      category.innerHTML = "";
    }
  
    delButton.classList.add("item_del_button");
    delButton.innerHTML = `<img src="./assets/trash.svg"/>`;
    
    categoryDelButtons.classList.add("category_del_buttons");
    newToDo.append(categoryDelButtons);
    categoryDelButtons.append(category);
    categoryDelButtons.append(delButton);

    delButton.addEventListener('click', () => {
      todos = todos.filter(t => t !== todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      displayToDos();
    })
  })
}

