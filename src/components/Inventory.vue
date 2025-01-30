<script>
import Item from './icons/item.vue';
import InventoryModal from './InventoryModal.vue';

export default {
  components: { Item, InventoryModal },
  data() {
    return {
      // Сетка инвентаря (5x5)
      grid: Array.from({ length: 5 }, () => Array(5).fill(null)),
      // Внешние предметы (пример)
      externalItems: [
        { id: 1, color: '#7FAA65', count: 1 },
        { id: 2, color: '#AA9765', count: 1 },
        { id: 2, color: '#656CAA', count: 1 },
      ],
      draggedItem: null, // Перетаскиваемый предмет
      draggedPosition: { row: null, col: null }, // Позиция предмета в сетке
      selectedItem: null, // Выбранный предмет
      selectedPosition: { row: null, col: null }, // Позиция выбранного предмета
      isModalVisible: false, // Видимость модального окна
    };
  },
  created() {
    // Загрузка сохраненного инвентаря
    const savedInventory = localStorage.getItem('inventory');
    if (savedInventory) this.grid = JSON.parse(savedInventory);
  },
  methods: {
    // Начало перетаскивания из сетки
    onDragStart(event, row, col) {
      this.draggedItem = this.grid[row][col];
      this.draggedPosition = { row, col };
      event.dataTransfer.setData('text/plain', '');
    },
    // Начало перетаскивания внешнего предмета
    onDragStartExternal(item) {
      this.draggedItem = { ...item };
      this.draggedPosition = { row: null, col: null };
    },
    // Предмет над ячейкой
    onDragOver(event) {
      event.preventDefault();
    },
    // Размещение предмета
    onDrop(event, row, col) {
      event.preventDefault();

      // Если ячейка пуста, просто добавляем предмет
      if (!this.grid[row][col]) {
        this.grid[row][col] = this.draggedItem;
      } else {
        // Если ячейка уже содержит предмет, проверяем, можно ли их объединить
        if (this.canStackItems(this.grid[row][col], this.draggedItem)) {
          this.grid[row][col].count += this.draggedItem.count;
        } else {
          // Если нельзя объединить, не делаем ничего
          return;
        }
      }

      // Удаление предмета из старой позиции (если он был в сетке)
      if (this.draggedPosition.row !== null) {
        this.grid[this.draggedPosition.row][this.draggedPosition.col] = null;
      }

      // Сохранение инвентаря
      this.saveInventory();
    },
    // Проверка, можно ли объединить два предмета
    canStackItems(existingItem, newItem) {
      return existingItem.color === newItem.color; // Пример: объединяем по цвету
    },
    // Сохранение в localStorage
    saveInventory() {
      localStorage.setItem('inventory', JSON.stringify(this.grid));
    },
    openModal(item, row, col) {
      this.selectedItem = item;
      this.selectedPosition = { row, col };
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedItem = null;
      this.selectedPosition = { row: null, col: null };
    },
    removeSelectedItem(count) {
      const { row, col } = this.selectedPosition;
      const item = this.grid[row][col];

      if (item.count > count) {
        item.count -= count; // Уменьшаем количество
      } else {
        this.grid[row][col] = null; // Удаляем предмет, если количество <= 0
      }

      this.saveInventory();
      this.closeModal();
    },
  },
};
</script>

<template>
  <div class="inventory-container">
    <!-- Внешние предметы для перетаскивания -->
    <div class="external-items">
      <div
        v-for="item in externalItems"
        :key="item.id"
        class="external-item"
        draggable="true"
        @dragstart="onDragStartExternal(item)"
      >
        <Item :size="50" :color="item.color" />
        <span class="item-count">{{ item.count }}</span>
      </div>
    </div>
    <div class="modal-container">
      <!-- Сетка инвентаря 5x5 -->
      <div class="grid-container">
        <div
          v-for="(row, rowIndex) in grid"
          :key="rowIndex"
          class="grid-row"
        >
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            class="grid-cell"
            :class="{
                'top-left': rowIndex === 0 && colIndex === 0,
                'top-right': rowIndex === 0 && colIndex === 4,
                'bottom-left': rowIndex === 4 && colIndex === 0,
                'bottom-right': rowIndex === 4 && colIndex === 4,
            }"
            @dragover.prevent="onDragOver"
            @drop="onDrop($event, rowIndex, colIndex)"
          >
            <div
              v-if="cell"
              class="inventory-item"
              draggable="true"
              @dragstart="onDragStart($event, rowIndex, colIndex)"
              @click="openModal(cell, rowIndex, colIndex)"
            >
              <Item :size="50" :color="cell.color" />
              <span class="item-count">{{ cell.count }}</span>
            </div>
          </div>
        </div>
      </div>
        
      <!-- Модальное окно -->
      <InventoryModal
        v-if="selectedItem"
        :item="selectedItem"
        :isVisible="isModalVisible"
        @close="closeModal"
        @remove="removeSelectedItem"
      />
    </div>
  </div>
</template>
  
<style scoped>
.inventory-container {
  display: flex;
  flex-direction: row-reverse;
}

.modal-container {
  display: flex;
}

.grid-container {
  display: flex;
  flex-direction: column;
  background-color: var(--color-seconds-background);
  border: 1px solid var(--color-border);
  border-radius: 12px;
}

.grid-row {
  display: flex;
}

.grid-cell {
  width: 100px;
  height: 100px;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

.inventory-item {
  width: 100px;
  height: 100px;
  position: relative;
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-count {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1px solid var(--color-border);
  border-top-left-radius: 6px;
  border-right: 0;
  border-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #FFFFFF;
  opacity: 0.4;
}

.external-items {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.external-item {
  border-radius: 8px;
  cursor: grab;
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Стили для скругления углов */
.top-left {
  border-top: 0px;
  border-left: 0px;
}
.top-right {
  border-top: 0px;
  border-right: 0px;
}
.bottom-left {
  border-bottom: 0px;
  border-left: 0px;
}
.bottom-right {
  border-bottom: 0px;
  border-right: 0px;
}
</style>