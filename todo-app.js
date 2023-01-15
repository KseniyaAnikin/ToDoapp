// import  {getListFromLocal, saveListInLocal} from './todo-app/localStorage.js';
(
  function () {


  // создаем пустой массив,куда будем записывать дела obj
  let listArray = [];
  let listName = '';
  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  //создаем и возвращаем форму для создания дел
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название новогодела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // создаем и возвращаем список дел
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // создаем дело
  function createTodoItem(obj) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = obj.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    if (obj.done == true) {
      item.classList.add('list-group-item-success')
    }
    //  добавляем обработчикик на кнопки
    doneButton.addEventListener('click', function () {
      item.classList.toggle('list-group-item-success');

      let currentName = obj.name;
      for (const listItem of listArray) {
        if (listItem.name == currentName)
          listItem.done = !listItem.done;
      }
      saveList(listArray, listName)
    });

    deleteButton.addEventListener('click', function () {
      if (confirm('Вы уверены?')) {
        item.remove();
      }
      let currentName = obj.name;
      for (let i = 0; i < listArray.length; i++) {
        if (listArray[i].name == currentName)
          listArray.splice(i, 1);
      }
      saveList(listArray, listName)
    });

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатыват события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function saveList(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr))
  }

  function createTodoApp(container, title = 'Список дел', keyName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    listName = keyName;

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList)

    // getListFromLocal(listName, listArray)

    // let localData = localStorage.getItem(listName)

    // if (localData !== null && localData !== '') {
    //   listArray = JSON.parse(localData)
    // }


    import("./todo-app/localStorage.js").then((module) => {

      module.getListFromLocal(listName, listArray);
      for (const itemList of listArray) {
        let todoItem = createTodoItem(itemList);
        todoList.append(todoItem.item);
      }
  });

    // for (const itemList of listArray) {
    //   let todoItem = createTodoItem(itemList);
    //   todoList.append(todoItem.item);
    // }

    todoItemForm.button.setAttribute('disabled', true);

    todoItemForm.input.addEventListener('input', () => {
      if (todoItemForm.input.value.length > 0) {
        todoItemForm.button.removeAttribute('disabled');
      } else {
        todoItemForm.button.setAttribute('disabled', true);
      }
    });

    // браузер создает событие на форме по нажатию кнопки или enter
    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      // если пользователь ничего не ввел в поле,игнорируем создание элемента
      if (!todoItemForm.input.value) {
        return;
      }

      let newItem = {
        name: todoItemForm.input.value,
        done: false,
      }

      let todoItem = createTodoItem(newItem);

      listArray.push(newItem);

      // создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);
      saveList(listArray, listName);

      //обнуляем значение в поле,чтоб не делать это вручную
      todoItemForm.input.value = '';
      todoItemForm.button.setAttribute('disabled', true);
    });
  }

  window.createTodoApp = createTodoApp;

})();
