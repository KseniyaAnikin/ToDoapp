export function getLocalList(owner) {
  return JSON.parse(localStorage.getItem(owner)) || [];
}

export function createLocalItem({owner, name}) {
  let arrItems = JSON.parse(localStorage.getItem(owner)) || [];
  arrItems.push({name, done: false});
  localStorage.setItem(owner, JSON.stringify(arrItems));
  return {name, done: false}
}

export function switchItemDoneLocal({todoItem}, owner) {
  const arrItems = JSON.parse(localStorage.getItem(owner));

  for (const item of arrItems) {
    if (item.name === todoItem.name) {
      item.done = !item.done;
    }
  }
  localStorage.setItem(owner, JSON.stringify(arrItems));

}

export function deleteFromLocal({todoItem, element}, owner) {
  if(!confirm('Вы уверены?')) {
    return;
  }
  element.remove();
  let arrItems = JSON.parse(localStorage.getItem(owner));

  for (let i of arrItems) {
    if (i.name === todoItem.name) {
      arrItems.splice(arrItems[i],1)
    }
  }
  localStorage.setItem(owner, JSON.stringify(arrItems))

}



