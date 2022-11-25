function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Дабавить дело';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItem(todoItem, {onDone, onDelete}, owner) {
  let item = document.createElement('li');
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = todoItem.name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  if (todoItem.done) {
    item.classList.add('list-group-item-success')
  }

  doneButton.addEventListener('click', function () {
    onDone({todoItem, element: item}, owner);
    item.classList.toggle('list-group-item-success');
  });

  deleteButton.addEventListener('click', function () {
    onDelete({todoItem, element: item}, owner);
  });

  return item;
}

export default async function createTodoApp(container, {
  title,
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick
}) {
  container.textContent = '';
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();
  const handlers = {onDone: onDoneClick, onDelete: onDeleteClick };

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList)

  todoItemList.forEach(todoItem => {
    const todoItemElement = createTodoItem(todoItem,handlers,owner);
    todoList.append(todoItemElement);
  });

  todoItemForm.button.setAttribute('disabled', true);

  todoItemForm.input.addEventListener('input', () => {
    if (todoItemForm.input.value.length > 0) {
      todoItemForm.button.removeAttribute('disabled');
    } else {
      todoItemForm.button.setAttribute('disabled', true);
    }
  });

  todoItemForm.form.addEventListener('submit', async e => {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim()
    });

    let todoItemElement = createTodoItem(todoItem, handlers);

    todoList.append(todoItemElement);

    todoItemForm.input.value = '';
    todoItemForm.button.setAttribute('disabled', true);
  });
}




