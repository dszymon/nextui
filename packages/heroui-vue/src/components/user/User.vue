<script setup lang="ts">
import { computed } from 'vue';
import Avatar from '../avatar/Avatar.vue';

interface Props {
  name: string;
  description?: string;
  avatarProps?: Record<string, any>;
  isFocusable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isFocusable: false
});

const classes = computed(() => {
  return [
    'heroui-user',
    {
      'heroui-user-focusable': props.isFocusable
    }
  ];
});
</script>

<template>
  <div :class="classes" :tabindex="isFocusable ? 0 : undefined">
    <Avatar :name="name" v-bind="avatarProps">
        <template v-if="$slots.avatarIcon" #icon>
            <slot name="avatarIcon"></slot>
        </template>
    </Avatar>
    <div class="heroui-user-details">
      <span class="heroui-user-name">{{ name }}</span>
      <span v-if="description || $slots.description" class="heroui-user-desc">
        <slot name="description">{{ description }}</slot>
      </span>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-user
  display inline-flex
  align-items center
  gap $spacing-2
  border-radius $radius-small
  outline none

  &-focusable
    &:focus-visible
      outline 2px solid var(--heroui-focus)
      outline-offset 2px

  &-details
    display flex
    flex-direction column
    line-height 1.2

  &-name
    font-size $font-small
    font-weight 600
    color var(--heroui-foreground)

  &-desc
    font-size $font-tiny
    color var(--heroui-default-500)

</style>
