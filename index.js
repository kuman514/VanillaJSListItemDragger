(() => {
  document.addEventListener('DOMContentLoaded', () => {
    let isClicked = false;

    const draggableList = document.querySelector('#draggable-list');

    const itemForm = document.querySelector('#item-form');
    const itemFormText = document.querySelector('#item-form-text');

    itemForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const newListItem = document.createElement('li');
      newListItem.textContent = itemFormText.value;
      draggableList.appendChild(newListItem);

      itemFormText.value = '';
      return false;
    });
  });
})();
