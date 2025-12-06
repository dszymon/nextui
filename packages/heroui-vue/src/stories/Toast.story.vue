<script setup lang="ts">
import Toast from '../components/toast/Toast.vue';
import ToastProvider from '../components/toast/ToastProvider.vue';
import Button from '../components/button/Button.vue';
import { ref } from 'vue';

const toasts = ref<{ id: number; title: string; color: string }[]>([]);

const addToast = (color: string) => {
    toasts.value.push({
        id: Date.now(),
        title: 'Notification',
        color
    });
};

const removeToast = (id: number) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
};
</script>

<template>
  <Story title="Toast">
    <Variant title="Default">
      <div class="flex gap-2">
          <Button @click="addToast('default')">Default</Button>
          <Button @click="addToast('success')" color="success">Success</Button>
          <Button @click="addToast('danger')" color="danger">Danger</Button>
      </div>

      <ToastProvider>
          <Toast
            v-for="toast in toasts"
            :key="toast.id"
            :title="toast.title"
            :color="toast.color"
            @close="removeToast(toast.id)"
          />
      </ToastProvider>
    </Variant>
  </Story>
</template>

<style scoped>
.flex { display: flex; }
.gap-2 { gap: 0.5rem; }
</style>
