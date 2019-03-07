const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = listDiv.querySelector('ul');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemInput');
const lis = listUl.children;
const lisbuttons = lis.children;
const firstListItem = listUl.firstElementChild;
const lastListItem = listUl.lastElementChild;
const clearList = document.querySelector('.clearList');

function attachUpButtons(li){
  let up = document.createElement('button');
  up.className = 'up'
  up.textContent = 'Up'
  li.appendChild(up);
}

function attachDownButtons(li){
  let down = document.createElement('button');
  down.className = 'down'
  down.textContent = 'Down'
  li.appendChild(down);
}

function attachRemoveButtons(li){
  let remove = document.createElement('button');
  remove.className = 'remove'
  remove.textContent = 'Remove'
  li.appendChild(remove);
}

// this function clears all the buttons that are children to the list items.
function clearButtons(){
  const li = document.querySelectorAll('.list > ul > li');
  for(let i = 0; i < li.length; i++ ){
    while(li[i].firstElementChild){
      li[i].removeChild(li[i].firstElementChild);
    }
  }
}


function refresh(){
// calling the clear function to delete all old buttons before generating new ones
  clearButtons();
 // for loop that builds the new buttons
  for(let i = 0; i < lis.length; i++){
      if(i === 0){ // the first list item will have two options depending on the length of the list.
        if(lis.length > 1){// if the list is greate than one item long, it will have two buttons
          attachDownButtons(lis[i]);
          attachRemoveButtons(lis[i]);
        }else if (lis.length === 1) {// if the list is is only one item long, it will only have the rmove button
          attachRemoveButtons(lis[i]);
        }
      }
      else if (i === lis.length - 1) {// last item in the list will only have two options up or remove
        attachUpButtons(lis[i]);
        attachRemoveButtons(lis[i]);
      }else{// All middle items in the list will have all button options - up , down or remove
        attachUpButtons(lis[i]);
        attachDownButtons(lis[i]);
        attachRemoveButtons(lis[i]);
      }
    }
}

// toggleList is the button that hides or shows the list
toggleList.addEventListener('click', () =>{
  if(listDiv.style.display == 'none'){
    toggleList.textContent = 'Hide List';
    listDiv.style.display = 'block';
  }else{
    toggleList.textContent = 'Show List';
    listDiv.style.display = 'none';
  }
});

// changing the name of the list
descriptionButton.addEventListener('click', () => {
  if(descriptionInput.value !== ""){
    descriptionP.innerHTML =  descriptionInput.value + ':';
    descriptionInput.value = "";
  }
});

// this function detects if if the event.target is the remove, up or down button.
listUl.addEventListener('click', (event) => {
  if(event.target.tagName == 'BUTTON'){
    if(event.target.className == 'remove'){
    let li = event.target.parentNode;
    let ul = li.parentNode;
    ul.removeChild(li);
    }
    if(event.target.className == 'up'){
      let li = event.target.parentNode;
      let prevLi = li.previousElementSibling;
      let ul = li.parentNode;
      if (prevLi){
        ul.insertBefore(li, prevLi);
      }
    }

    if(event.target.className == 'down'){
      let li = event.target.parentNode;
      let nextLi = li.nextElementSibling;
      let ul = li.parentNode;
      if(nextLi){
        ul.insertBefore(nextLi, li);
      }
    }
    refresh();
  }
});

//If the user types in a value it the list and press the add itme button this function will run and add a 'li' item to the 'ul'
addItemButton.addEventListener('click' ,() =>{
  if(addItemInput.value !== ""){
    let ul = document.querySelector('.list ul');
    let li = document.createElement('li');
    li.textContent = addItemInput.value;
    ul.appendChild(li);
    refresh();
    addItemInput.value = '';
  }
});

// button that delets all items in the list
clearList.addEventListener('click', () => {
  while(listUl.firstElementChild){
    listUl.removeChild(listUl.firstElementChild);
  }
})
refresh();
