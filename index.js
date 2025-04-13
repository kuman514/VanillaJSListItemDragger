(() => {
  document.addEventListener('DOMContentLoaded', () => {
    let newItemId = 0;
    const items = [];

    let draggedItem = null;

    const draggableList = document.querySelector('#draggable-list');

    function generateListItem(newItem) {
      const newListItemContent = document.createElement('span');
      newListItemContent.textContent = newItem.value;
      const newListItem = document.createElement('li');
      newListItem.appendChild(newListItemContent);
      newListItem.draggable = true;
      newListItem.id = newItem.id;
      draggableList.appendChild(newListItem);
    }

    draggableList.addEventListener('dragstart', (event) => {
      draggedItem = event.target;
    });
    draggableList.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    draggableList.addEventListener('drop', (event) => {
      event.preventDefault();

      const draggedItemIndex = items.findIndex(
        (item) => draggedItem.id === item.id
      );
      const primaryTargetIndex = items.findIndex(
        (item) => event.target.id === item.id
      );

      if (
        draggedItemIndex === -1 ||
        primaryTargetIndex === -1 ||
        primaryTargetIndex === draggedItemIndex
      ) {
        return;
      }

      items.splice(primaryTargetIndex, 0, items[draggedItemIndex]);
      if (primaryTargetIndex > draggedItemIndex) {
        items.splice(draggedItemIndex, 1);
      } else {
        items.splice(draggedItemIndex + 1, 1);
      }

      draggableList.textContent = '';
      items.forEach(generateListItem);

      draggedItem = null;
    });

    const itemForm = document.querySelector('#item-form');
    const itemFormText = document.querySelector('#item-form-text');

    itemForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const trimmedTextValue = itemFormText.value.trim();
      if (trimmedTextValue.length === 0) {
        return;
      }

      const newItem = {
        id: String(newItemId),
        value: trimmedTextValue,
      };
      items.push(newItem);
      generateListItem(newItem);

      itemFormText.value = '';
      newItemId++;

      return false;
    });
  });
})();
