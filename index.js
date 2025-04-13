(() => {
  document.addEventListener('DOMContentLoaded', () => {
    let newItemId = 0;
    const items = [];

    let draggedItem = null;

    const draggableList = document.querySelector('#draggable-list');

    function generateListItem(newItem) {
      const newListItemContent = document.createElement('span');
      newListItemContent.className = 'content';
      newListItemContent.textContent = newItem.value;

      const newListItemUpperLayer = document.createElement('span');
      newListItemUpperLayer.id = `${newItem.id}-upper`;
      newListItemUpperLayer.className = 'upper-layer';
      newListItemUpperLayer.addEventListener('dragenter', () => {
        newListItemUpperLayer.classList.add('highlighted');
      });
      newListItemUpperLayer.addEventListener('dragleave', () => {
        newListItemUpperLayer.classList.remove('highlighted');
      });

      const newListItemUnderLayer = document.createElement('span');
      newListItemUnderLayer.id = `${newItem.id}-under`;
      newListItemUnderLayer.className = 'under-layer';
      newListItemUnderLayer.addEventListener('dragenter', () => {
        newListItemUnderLayer.classList.add('highlighted');
      });
      newListItemUnderLayer.addEventListener('dragleave', () => {
        newListItemUnderLayer.classList.remove('highlighted');
      });

      const newListItem = document.createElement('li');
      newListItem.appendChild(newListItemContent);
      newListItem.appendChild(newListItemUpperLayer);
      newListItem.appendChild(newListItemUnderLayer);
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

      const [targetId, direction] = event.target.id.split('-');

      const draggedItemIndex = items.findIndex(
        (item) => draggedItem.id === item.id
      );
      const primaryTargetIndex = items.findIndex(
        (item) => targetId === item.id
      );

      if (draggedItemIndex === -1 || primaryTargetIndex === -1) {
        return;
      }

      const finalTargetIndex =
        direction === 'under' ? primaryTargetIndex + 1 : primaryTargetIndex;

      items.splice(finalTargetIndex, 0, items[draggedItemIndex]);

      if (finalTargetIndex > draggedItemIndex) {
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
