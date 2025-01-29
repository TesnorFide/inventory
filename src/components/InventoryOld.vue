<script lang="ts">
    import { defineComponent, ref, computed } from 'vue';
    import { useInventoryStore } from '../stores/inventoryStore';
    import ConfirmModal from './ConfirmModal.vue';

    export default defineComponent({
        components: {
            ConfirmModal,
        },
        setup() {
            const inventoryStore = useInventoryStore();
            const selectedItemId = ref<number | null>(null);
            const newItemName = ref('');
            const newItemDescription = ref('');
            const isDeleteModalVisible = ref(false);
            const itemToDeleteId = ref<number | null>(null);

            // Загружаем данные из localStorage при инициализации
            inventoryStore.loadFromLocalStorage();

            // Используем computed для реактивного отслеживания изменений в хранилище
            const items = computed(() => inventoryStore.items);

            const showDescription = (id: number) => {
                selectedItemId.value = selectedItemId.value === id ? null : id;
            };

            const openDeleteModal = (id: number) => {
                itemToDeleteId.value = id;
                isDeleteModalVisible.value = true;
            };

            const closeDeleteModal = () => {
                isDeleteModalVisible.value = false;
                itemToDeleteId.value = null;
            };

            const removeItem = () => {
                if (itemToDeleteId.value !== null) {
                    inventoryStore.removeItem(itemToDeleteId.value);
                    closeDeleteModal();
                }
            };

            const addItem = () => {
                if (newItemName.value && newItemDescription.value) {
                    const newItem = {
                        id: Date.now(),
                        name: newItemName.value,
                        description: newItemDescription.value,
                    };
                    inventoryStore.addItem(newItem);
                    newItemName.value = '';
                    newItemDescription.value = '';
                }
            };

            return {
                items,
                selectedItemId,
                newItemName,
                newItemDescription,
                isDeleteModalVisible,
                showDescription,
                openDeleteModal,
                closeDeleteModal,
                removeItem,
                addItem,
            };
        },
    });
</script>

<template>
    <div class="inventory-container">
        <div class="inventory">
            <div v-for="item in items" :key="item.id" class="item" @click="showDescription(item.id)">
                {{ item.name }}
                <div v-if="selectedItemId === item.id" class="description">
                    {{ item.description }}
                    <button class="delete-button" @click.stop="openDeleteModal(item.id)">Удалить предмет</button>
                </div>
            </div>
        </div>
        <div class="add-item-form">
            <input v-model="newItemName" placeholder="Введите название" />
            <input v-model="newItemDescription" placeholder="Введите описание" />
            <button class="confirm-button" @click="addItem">Добавить предмет</button>
        </div>
        <ConfirmModal
            :isVisible="isDeleteModalVisible"
            @confirm="removeItem"
            @cancel="closeDeleteModal"
        />
    </div>
</template>
  

  
<style scoped>
.inventory-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.inventory {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.item {
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    width: 150px;
    text-align: center;
}

.description {
    margin-top: 10px;
}

.delete-button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.add-item-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.add-item-form input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.confirm-button {
    padding: 8px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.confirm-button:hover {
    background-color: #45a049;
}
</style>
