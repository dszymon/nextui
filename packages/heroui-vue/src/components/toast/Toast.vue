<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface Props {
  title?: string;
  description?: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'default',
  duration: 4000
});

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const isVisible = ref(true);

onMounted(() => {
  if (props.duration > 0) {
    setTimeout(() => {
      close();
    }, props.duration);
  }
});

const close = () => {
    isVisible.value = false;
    // Animation timeout then emit close
    setTimeout(() => {
        emit('close');
    }, 300);
}

const classes = computed(() => {
    return [
        'heroui-toast',
        `heroui-toast-${props.color}`,
        {
            'heroui-toast-hidden': !isVisible.value
        }
    ]
})
</script>

<template>
  <div :class="classes" role="alert">
    <div class="heroui-toast-content">
        <div v-if="title" class="heroui-toast-title">{{ title }}</div>
        <div v-if="description" class="heroui-toast-description">{{ description }}</div>
    </div>
    <button class="heroui-toast-close" @click="close" type="button">✕</button>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-toast
  pointer-events auto
  min-width 200px
  background-color var(--heroui-background)
  border 1px solid var(--heroui-default-200)
  box-shadow 0 4px 6px -1px rgba(0,0,0,0.1)
  border-radius $radius-medium
  padding $spacing-3
  display flex
  align-items flex-start
  gap $spacing-3
  transition all 0.3s ease
  transform translateY(0)
  opacity 1

  &-hidden
    opacity 0
    transform translateY(10px)

  &-content
    flex 1

  &-title
    font-weight 600
    font-size $font-small
    margin-bottom 2px

  &-description
    font-size $font-tiny
    color var(--heroui-default-500)

  &-close
    background transparent
    border none
    cursor pointer
    font-size 1.2em
    line-height 1
    opacity 0.5
    &:hover
      opacity 1

  // Colors
  &-primary
    border-left 4px solid var(--heroui-primary)
  &-success
    border-left 4px solid var(--heroui-success)
  &-warning
    border-left 4px solid var(--heroui-warning)
  &-danger
    border-left 4px solid var(--heroui-danger)

</style>
