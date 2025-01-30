<script>
import Item from './icons/item.vue';

export default {
  components: { Item },
  props: {
    item: {
      type: Object,
      default: () => ({ color: '#7FAA65', count: 1 }),
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDeleteMode: false,
      deleteCount: 1,
    };
  },
  methods: {
    closeModal() {
      this.isDeleteMode = false;
      this.deleteCount = 1;
      this.$emit('close');
    },
    startDelete() {
      this.isDeleteMode = true;
    },
    cancelDelete() {
      this.isDeleteMode = false;
      this.deleteCount = 1;
    },
    confirmDelete() {
      if (this.deleteCount > 0 && this.deleteCount <= this.item.count) {
        this.$emit('remove', this.deleteCount);
        this.closeModal();
      }
    },
  },
};
</script>

<template>
    <div v-if="isVisible" class="modal-overlay">
        <div class="modal-content">
            <button class="close-button" @click="closeModal">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1.05L10.95 0L6 4.95L1.05 0L0 1.05L4.95 6L0 10.95L1.05 12L6 7.05L10.95 12L12 10.95L7.05 6L12 1.05Z" fill="white"/>
                </svg>
            </button>

            <!-- Картинка элемента -->
            <div class="item-image">
                <Item :size="100" :color="item.color" />
            </div>

            <hr>

            <div class="info-container">
                <h3 />
                <span class="w-155" />
                <span  class="w-190" />
                <span   class="w-170" />
                <span   class="w-160" />
                <span   class="w-140" />
                <span   class="w-80" />
            </div>

            <hr>

            <!-- Поле для ввода количества -->
            <div v-if="isDeleteMode" class="delete-mode">
                <input
                    id="delete-count"
                    type="number"
                    placeholder="Введите количество"
                    v-model="deleteCount"
                    :max="item.count"
                    min="1"
                />
                <div class="modal-buttons">
                    <button @click="cancelDelete">Отмена</button>
                    <button @click="confirmDelete">Подтвердить</button>
                </div>
            </div>

            <!-- Кнопка удаления -->
            <button v-else @click="startDelete" class="delete-button">Удалить предмет</button>
        </div>
    </div>
</template>
  
<style scoped>
.modal-overlay {
    position: relative;
    top: 1px;
    right: 251px;
    width: 250px;
    height: 99.5%;
    display: flex;
    z-index: 1000;
    background: rgba(38, 38, 38, 0.5);
    border-left: 1px solid var(--color-border);
    backdrop-filter: blur(8px);
    border-radius: 20px;
}
  
.modal-content {
    width: 100%;
}

.modal-content hr {
    border: 1px solid;
    color:  var(--color-border);
    margin: 15px;
}
  
.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
  
.delete-button {
    margin-top: 20px;
    padding: 10px 20px;
    background: #FA7272;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;

}
  
.delete-button:hover {
    background: #ff1a1a;
}
  
.delete-mode {
    margin-top: -20px;
    background: rgba(38, 38, 38, 0.6);
    width: 249px;
    border-top: 1px solid var(--color-border);
    backdrop-filter: blur(8px);
    padding-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
  
.delete-mode input {
    width: 80%;
    padding: 8px;
    margin-bottom: 10px;
    background: var(--color-seconds-background);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #FFFFFF;
    opacity: 0.4;

}
  
.modal-buttons {
    display: flex;
    gap: 10px;
}
  
.modal-buttons button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
  
.modal-buttons button:first-child {
    background: #FFFFFF;
}
  
.modal-buttons button:last-child {
    color: white;
    background: #FA7272;

}

.item-image {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 50px;
}

.info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.info-container h3 {
    width: 190px;
    height: 26px;
    border-radius: 8px;
    background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
    margin: 14px 0;
}
.info-container span {
    margin-bottom: 10px;
    min-width: 80px;
    height: 10px;
    border-radius: 4px;
    background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
    
    &.w-140 {
        min-width: 140px;
    }
    &.w-155 {
        min-width: 155px;
    }
    &.w-160 {
        min-width: 160px;
    }
    &.w-170 {
        min-width: 170px;
    }
    &.w-190 {
        min-width: 190px;
    }
}
</style>