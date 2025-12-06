<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue';

interface Props {
  isOpen?: boolean;
  defaultOpen?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
  radius?: 'none' | 'sm' | 'md' | 'lg';
  placement?: 'auto' | 'top' | 'top-center' | 'bottom' | 'bottom-center' | 'center';
  backdrop?: 'transparent' | 'opaque' | 'blur';
  scrollBehavior?: 'normal' | 'inside' | 'outside';
  closeButton?: any;
  hideCloseButton?: boolean;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  defaultOpen: false,
  size: 'md',
  radius: 'lg',
  placement: 'center',
  backdrop: 'opaque',
  scrollBehavior: 'normal',
  hideCloseButton: false,
  isDismissable: true,
  isKeyboardDismissDisabled: false
});

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
  (e: 'close'): void;
  (e: 'open'): void;
}>();

const handleClose = () => {
  emit('update:isOpen', false);
  emit('close');
};

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget && props.isDismissable) {
    handleClose();
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && !props.isKeyboardDismissDisabled && props.isOpen) {
    handleClose();
  }
};

watch(() => props.isOpen, (val) => {
    if (val) {
        emit('open');
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
});

const backdropClasses = computed(() => {
  return [
    'heroui-modal-backdrop',
    `heroui-modal-backdrop-${props.backdrop}`,
    {
      'heroui-modal-backdrop-open': props.isOpen
    }
  ];
});

const wrapperClasses = computed(() => {
    return [
        'heroui-modal-wrapper',
        `heroui-modal-wrapper-${props.scrollBehavior}`,
        `heroui-modal-wrapper-${props.placement}`
    ]
})

const contentClasses = computed(() => {
  return [
    'heroui-modal-content',
    `heroui-modal-size-${props.size}`,
    `heroui-modal-radius-${props.radius}`,
    {
      'heroui-modal-content-open': props.isOpen
    }
  ];
});
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="isOpen" :class="backdropClasses" @click="handleBackdropClick">
         <div :class="wrapperClasses">
            <div :class="contentClasses" role="dialog" aria-modal="true" @click.stop>
                <button
                  v-if="!hideCloseButton"
                  class="heroui-modal-close-button"
                  @click="handleClose"
                  type="button"
                >
                    <slot name="closeButton">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="1em" height="1em">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </slot>
                </button>
                <slot></slot>
            </div>
         </div>
      </div>
    </transition>
  </Teleport>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-modal-backdrop
  position fixed
  inset 0
  z-index 50
  display flex
  justify-content center

  &-opaque
    background-color rgba(0,0,0,0.5)
  &-blur
    background-color rgba(0,0,0,0.1)
    backdrop-filter blur(10px)
  &-transparent
    background-color transparent

.heroui-modal-wrapper
  width 100%
  height 100%
  display flex
  pointer-events none // Allow clicking through to backdrop

  // Placements
  &-center
     align-items center
     justify-content center
  &-top
     align-items flex-start
     justify-content center
  &-top-center
     align-items flex-start
     justify-content center
     padding-top $spacing-8
  &-bottom
     align-items flex-end
     justify-content center
  &-bottom-center
     align-items flex-end
     justify-content center
     padding-bottom $spacing-8

  // Scroll Behavior
  &-inside
     overflow hidden
     .heroui-modal-content
        max-height calc(100% - 4rem)
        overflow-y auto

  &-outside
     overflow-y auto
     pointer-events auto // Need auto to scroll

.heroui-modal-content
  position relative
  width 100%
  margin $spacing-4
  background-color var(--heroui-background)
  color var(--heroui-foreground)
  box-shadow 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
  outline none
  display flex
  flex-direction column
  pointer-events auto
  box-sizing border-box

  // Sizes
  &-size-xs
     max-width 20rem
  &-size-sm
     max-width 24rem
  &-size-md
     max-width 28rem
  &-size-lg
     max-width 32rem
  &-size-xl
     max-width 36rem
  &-size-2xl
     max-width 42rem
  &-size-3xl
     max-width 48rem
  &-size-4xl
     max-width 56rem
  &-size-5xl
     max-width 64rem
  &-size-full
     max-width 100%
     margin 0
     height 100%
     border-radius 0 !important

  // Radius
  &-radius-sm
     border-radius $radius-small
  &-radius-md
     border-radius $radius-medium
  &-radius-lg
     border-radius $radius-large

  // Close Button
  .heroui-modal-close-button
     position absolute
     top $spacing-2
     right $spacing-2
     background transparent
     border none
     cursor pointer
     padding $spacing-1
     color var(--heroui-default-500)
     z-index 10
     border-radius 50%
     display flex
     &:hover
        background-color var(--heroui-default-100)
        color var(--heroui-default-800)

// Transitions
.modal-fade-enter-active,
.modal-fade-leave-active
  transition opacity 0.3s ease

.modal-fade-enter-from,
.modal-fade-leave-to
  opacity 0

.modal-fade-enter-active .heroui-modal-content
  animation modal-scale-in 0.3s ease

.modal-fade-leave-active .heroui-modal-content
  animation modal-scale-out 0.2s ease

@keyframes modal-scale-in
  from
    opacity 0
    transform scale(0.95)
  to
    opacity 1
    transform scale(1)

@keyframes modal-scale-out
  from
    opacity 1
    transform scale(1)
  to
    opacity 0
    transform scale(0.95)

</style>
