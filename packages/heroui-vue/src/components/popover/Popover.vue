<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  isOpen?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  showArrow?: boolean;
  offset?: number;
  trigger?: 'click' | 'hover';
  backdrop?: 'transparent' | 'opaque' | 'blur';
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: undefined,
  placement: 'bottom',
  showArrow: true,
  offset: 7,
  trigger: 'click',
  backdrop: 'transparent'
});

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

const internalOpen = ref(false);

const isVisible = computed(() => {
  return props.isOpen !== undefined ? props.isOpen : internalOpen.value;
});

const toggle = () => {
    const newState = !isVisible.value;
    internalOpen.value = newState;
    emit('update:isOpen', newState);
};

const close = () => {
    internalOpen.value = false;
    emit('update:isOpen', false);
};

// Simple click outside handling could be added here
</script>

<template>
  <div class="heroui-popover-wrapper">
    <div @click="trigger === 'click' ? toggle() : undefined" class="heroui-popover-trigger">
        <slot name="trigger"></slot>
        <!-- If no trigger slot, maybe default slot is children, first is trigger?
             React impl splits children. Vue usually uses named slots for cleaner API.
             If using default slot for everything, we need to inspect children which is hard in SFC setup.
             Let's assume usage: <Popover><template #trigger><Button/></template><template #content>...</template></Popover>
             OR <Popover> <Button /> <PopoverContent /> </Popover>
        -->
        <slot v-if="!$slots.trigger"></slot> <!-- Render default slot here if it acts as trigger? -->
    </div>

    <transition name="popover-fade">
        <div v-if="isVisible" class="heroui-popover-content-wrapper">
             <div v-if="showArrow" class="heroui-popover-arrow"></div>
             <div class="heroui-popover-content">
                <slot name="content"></slot>
                <!-- Support legacy pattern if needed -->
                <slot v-if="$slots.content"></slot>
             </div>
        </div>
    </transition>

    <!-- Backdrop for click outside if needed -->
    <div v-if="isVisible && backdrop !== 'transparent'" class="heroui-popover-backdrop" @click="close"></div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-popover-wrapper
  display inline-block
  position relative

.heroui-popover-trigger
  display inline-block

.heroui-popover-content-wrapper
  position absolute
  z-index 50
  margin-top 8px // Offset
  top 100% // Default bottom placement
  left 50%
  transform translateX(-50%)

  background-color var(--heroui-background)
  color var(--heroui-foreground)
  border-radius $radius-medium
  box-shadow 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
  padding $spacing-2 $spacing-3
  min-width 200px

.heroui-popover-arrow
  position absolute
  top -4px
  left 50%
  margin-left -4px
  width 8px
  height 8px
  background-color var(--heroui-background)
  transform rotate(45deg)
  box-shadow -1px -1px 1px rgba(0,0,0,0.05) // Top-left shadow

.heroui-popover-backdrop
  position fixed
  inset 0
  z-index 40
  // transparent usually, but can be opaque
</style>
