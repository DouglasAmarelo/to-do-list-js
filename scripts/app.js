(function () {
  'use strict';

  const $form = document.querySelector('.form');
  const $list = document.querySelector('.list');

  const getChachedTodoList = () => {
    const chachedList = localStorage.getItem('@TODO_LIST');
    return chachedList ? chachedList.split(',') : [];
  };

  const saveList = list => localStorage.setItem('@TODO_LIST', list);

  const listItemTemplate = (listItem, index) => {
    return `
      <li class="list__item">
        <input type="checkbox" name="${index}" id="${index}" />
        <label for="${index}">${listItem}</label>
      </li>
    `;
  };

  const addItemToList = todoItem => {
    updateList([todoItem, ...getChachedTodoList()]);
  };

  const updateList = (list = getChachedTodoList()) => {
    $list.innerHTML = list.map(listItemTemplate).join('');
    saveList(list);
  };

  const clearFormField = field => (field.value = '');

  $form.addEventListener('submit', function (e) {
    e.preventDefault();

    addItemToList(this.todo.value);
    clearFormField(this.todo);
  });

  updateList();
})();
