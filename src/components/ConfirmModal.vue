<script lang="ts">
    import { defineComponent } from 'vue';
  
    export default defineComponent({
        props: {
            isVisible: Boolean,
        },
        emits: ['confirm', 'cancel'],
        setup(props, { emit }) {
            const onConfirm = () => {
                emit('confirm');
            };
  
            const onCancel = () => {
                emit('cancel');
            };
  
            return {
                onConfirm,
                onCancel,
            };
        },
    });
</script>
  
<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal">
            <p>Вы уверены, что хотите удалить этот предмет?</p>
            <div class="modal-buttons">
                <button @click="onCancel">Отмена</button>
                <button @click="onConfirm">Подтвердить</button>
            </div>
        </div>
    </div>
</template>
  

  
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
  
.modal {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
}
  
.modal-buttons {
    margin-top: 20px;
}

.modal-buttons button {
    margin: 0 10px;
    padding: 8px 15px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.modal-buttons button:first-child {
    background-color: #ccc;
}

.modal-buttons button:last-child {
    background-color: #ff4d4d;
    color: white;
}
</style>
  