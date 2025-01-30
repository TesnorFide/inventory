<script lang="ts">
import { defineComponent } from 'vue';
import ItemGroupSkeleton from './components/ItemGroupSkeleton.vue';
import BottomAlertSkeleton from './components/BottomAlertSkeleton.vue';
import Inventory from './components/Inventory.vue';

export default defineComponent({
  name: 'App',
  components: {
    Inventory,
    ItemGroupSkeleton,
    BottomAlertSkeleton,
  },
});
</script>

<template>
  <div id="app">
    <Suspense>
      <template #default>
        <ItemGroupSkeleton />
      </template>
      <template #fallback>
        <ItemGroupSkeleton />
      </template>
    </Suspense>
    <Inventory />
    <Suspense>
      <template #default>
        <BottomAlertSkeleton />
      </template>
      <template #fallback>
        <BottomAlertSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
