 import './cookie.html';

const homeworkContainer = document.querySelector('#homework-container');

// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookiesMap = getCookies();
let filterValue = '';

updateTable();

function getCookies() {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .map((cookie) => cookie.match(/^([^=]+)=(.+)/))
    .reduce((obj, [, name, value]) => {
      obj.set(name, value);

      return obj;
    }, new Map());
}

filterNameInput.addEventListener('input', function () {
  filterValue = this.value;
  updateTable();
});

addButton.addEventListener('click', () => {
  const name = encodeURIComponent(addNameInput.value.trim());
  const value = encodeURIComponent(addValueInput.value.trim());

  if (!name) {
    return;
  }

  document.cookie = `${name}=${value}`;
  cookiesMap.set(name, value);

  updateTable();
});

listTable.addEventListener('click', (e) => {
  const { role, cookieName } = e.target.dataset;

  if (role === 'remove-cookie') {
    cookiesMap.delete(cookieName);
    document.cookie = `${cookieName}=deleted; max-age=0`;
    updateTable();
  }
});

function updateTable() {
  const fragment = document.createDocumentFragment();
  let total = 0;

  listTable.innerHTML = '';

  for (const [name, value] of cookiesMap) {
    if (
      filterValue &&
      !name.toLowerCase().includes(filterValue.toLowerCase()) &&
      !value.toLowerCase().includes(filterValue.toLowerCase())
    ) {
      continue;
    }

    total++;

    const tr = document.createElement('tr');
    const nameTD = document.createElement('td');
    const valueTD = document.createElement('td');
    const removeTD = document.createElement('td');
    const removeButton = document.createElement('button');

    removeButton.dataset.role = 'remove-cookie';
    removeButton.dataset.cookieName = name;
    removeButton.textContent = 'Удалить';
    nameTD.textContent = name;
    valueTD.textContent = value;
    valueTD.classList.add('value');
    tr.append(nameTD, valueTD, removeTD);
    removeTD.append(removeButton);

    fragment.append(tr);
  }

  if (total) {
    listTable.parentNode.classList.remove('hidden');
    listTable.append(fragment);
  } else {
    listTable.parentNode.classList.add('hidden');
  }
}
