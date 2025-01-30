<script>
import Item from './icons/item.vue';

export default {
    data() {
        return {
            grid: Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => false)), // Сетка 5x5, false = пустая ячейка
            draggedItem: null, // Перетаскиваемый элемент
            draggedItemPosition: { row: null, col: null }, // Позиция перетаскиваемого элемента
        };
    },
    mounted() {
        this.loadFromLocalStorage();
    },
    methods: {
        // Инициализация или загрузка из localStorage
        loadFromLocalStorage() {
            const savedGrid = localStorage.getItem('gridState');
            this.grid = savedGrid 
                ? JSON.parse(savedGrid)
                : Array.from({ length: 5 }, () => Array(5).fill(null));
        },
        // Сохранение в localStorage
        saveToLocalStorage() {
            localStorage.setItem('gridState', JSON.stringify(this.grid));
        },

        // Начало перетаскивания элемента из сетки
        onDragStart(event, row, col) {
            this.draggedItem = true; // Указываем, что элемент перетаскивается
            this.draggedItemPosition = { row, col };
            event.dataTransfer.setData('text/plain', ''); // Требуется для Firefox
        },
        // Начало перетаскивания внешнего элемента
        onDragStartExternal(event) {
            this.draggedItem = true; // Указываем, что внешний элемент перетаскивается
            this.draggedItemPosition = { row: null, col: null }; // Внешний элемент не имеет позиции в сетке
            event.dataTransfer.setData('text/plain', '');
        },

        // Элемент перетаскивается над ячейкой
        onDragOver(event) {
            event.preventDefault(); // Разрешаем drop
        },

        // Элемент отпущен в ячейке
        onDrop(event, row, col) {
            event.preventDefault();

            // Если элемент перетаскивается из сетки, удаляем его из старой позиции
            if (this.draggedItemPosition.row !== null && this.draggedItemPosition.col !== null) {
                this.grid[this.draggedItemPosition.row][this.draggedItemPosition.col] = false;
            }

            // Размещаем элемент в новой позиции
            this.grid[row][col] = true;

            // Сбрасываем состояние перетаскивания
            this.draggedItem = null;
            this.draggedItemPosition = { row: null, col: null };
            this.saveToLocalStorage();
        },
    },
    components : {
        Item,
    },
};
</script>

<template>
    <div>
        <!-- Перетаскиваемый элемент -->
        <div
            class="draggable-item external-item"
            draggable="true"
            @dragstart="onDragStartExternal"
        >
            <Item />
        </div>

        <!-- Сетка 5x5 -->
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
                    <!-- Отображаем SVG, если ячейка занята -->
                    <div
                        v-if="cell"
                        class="draggable-item"
                        draggable="true"
                        @dragstart="onDragStart($event, rowIndex, colIndex)"
                    >
                        <Item />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
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

.draggable-item {
    cursor: grab;
    user-select: none;
}

.external-item {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff7f50;
    margin-bottom: 20px;
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