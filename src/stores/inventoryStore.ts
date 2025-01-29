import { defineStore } from 'pinia';

interface Item {
    id: number;
    name: string;
    description: string;
}

export const useInventoryStore = defineStore('inventory', {
    state: () => ({
        items: [] as Item[],
    }),
    actions: {
        addItem(item: Item) {
            this.items.push(item);
            this.saveToLocalStorage();
        },
        removeItem(id: number) {
            this.items = this.items.filter(item => item.id !== id); // Обновляем массив items
            this.saveToLocalStorage();
        },
        loadFromLocalStorage() {
            const savedItems = localStorage.getItem('inventory');
            if (savedItems) {
                this.items = JSON.parse(savedItems);
            }
        },
        saveToLocalStorage() {
            localStorage.setItem('inventory', JSON.stringify(this.items));
        },
    },
});
