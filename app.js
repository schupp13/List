const toggleList = document.getElementById('toggleList');
const listDiv = document.querySelector('.list');
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const listUl = listDiv.querySelector('ul');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemInput');
const lis = listUl.children;
const firstListItem = listUl.firstElementChild;
const lastListItem = listUl.lastElementChild;



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



function refresh(){
  for(let i = 0; i < lis.length; i++){
    lis[i].removeChild(lis[i].button);
      if(i === 0){
        attachDownButtons(lis[i]);
        attachRemoveButtons(lis[i]);
      }
      else if (i === lis.length - 1) {
        attachUpButtons(lis[i]);
        attachRemoveButtons(lis[i]);
      }else{
        attachUpButtons(lis[i]);
        attachDownButtons(lis[i]);
        attachRemoveButtons(lis[i]);
      }
}

}


toggleList.addEventListener('click', () =>{
  if(listDiv.style.display == 'none'){
    toggleList.textContent = 'Hide List';
    listDiv.style.display = 'block';
  }else{
    toggleList.textContent = 'Show List';
    listDiv.style.display = 'none';
  }
});


descriptionButton.addEventListener('click', () => {
  descriptionP.innerHTML =  descriptionInput.value + ':';
  descriptionInput.value = "";
});

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

// document.addEventListener('click', (event) => {
//   console.log(event.target);
// });




addItemButton.addEventListener('click' ,() =>{
  let ul = document.getElementsByTagName('ul')[0];
  let li = document.createElement('li');
  li.textContent = addItemInput.value;
  ul.appendChild(li);
  refresh();
  addItemInput.value = '';
});
refresh();
