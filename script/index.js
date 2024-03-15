const todoListContainer = document.getElementsByClassName(
  "todo__container__list"
)[0];
const input = document.getElementsByClassName("header__newTask__input");
const finishedCounter = document.getElementById(
  "todo__container__stats__finished"
);
const itemCounter = document.getElementById("todo__container__stats__amount");
const showIfEmpty = document.getElementById("todo__container__list__empty");



// add item
function addItem() {
  let item = {
    name: input[0].value,
    id: localStorage.length,
    state: false,
  };
  localStorage.setItem(localStorage.length, JSON.stringify(item));
  itemRenderer(item);
  finishedCount();
}

// display storage
function itemRenderer(item) {
  const listItem = document.createElement("li");
  const listItemName = document.createElement("p");
  const listItemDelete = document.createElement("i");

  listItem.className = item.state
    ? "todo__container__list__item--finished"
    : "todo__container__list__item";
  listItem.id = item.id;
  listItem.onclick = changeState;
  listItemName.innerHTML = item.name;
  listItemDelete.className = "fa-solid fa-trash-can";
  listItemDelete.onclick = deleteItem;
  listItemDelete.id = item.id;
  listItem.appendChild(listItemName);
  listItem.appendChild(listItemDelete);
  todoListContainer.appendChild(listItem);
}

function renderDB() {
  for (let i = 0; i < localStorage.length; i++) {
    itemRenderer(JSON.parse(localStorage[i]));
  }
}

// change state
function changeState() {
  const storedItem = JSON.parse(localStorage.getItem(this.id));
  if (this.id == storedItem.id) {
    localStorage.setItem(
      storedItem.id,
      JSON.stringify(
        (item = {
          name: storedItem.name,
          id: storedItem.id,
          state: storedItem.state ? false : true,
        })
      )
    );
  }
  location.reload();
}

// delete item
function deleteItem() {
  console.log(this.id);
  localStorage.removeItem(this.id);
  const deleteItem = document.getElementById(this.id);
  deleteItem.remove();
  finishedCount();
}

// todo counter
function finishedCount() {
  finishedAmount = 0;
  for (let i = 0; i < localStorage.length; i++) {
    let state = JSON.parse(localStorage[i]).state;
    finishedAmount += state ? +1 : 0;
    finishedCounter.innerHTML = `${finishedAmount} / ${localStorage.length}`;
    itemCounter.innerHTML = localStorage.length;
  }
  if (localStorage.length <= 0) {
    showIfEmpty.style.display = "flex";
    console.log(localStorage.length);
  } else if (localStorage.length > 0) {
    showIfEmpty.style.display = "none";
  }
}

finishedCount();
renderDB();
