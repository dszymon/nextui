<script setup lang="ts">
import { computed } from 'vue';

type KbdKey =
  | "command" | "shift" | "ctrl" | "option" | "enter" | "delete" | "escape" | "tab" | "capslock"
  | "up" | "right" | "down" | "left" | "pageup" | "pagedown" | "home" | "end" | "help" | "space"
  | "fn" | "win" | "alt";

interface Props {
  keys?: KbdKey | KbdKey[];
}

const props = withDefaults(defineProps<Props>(), {
  keys: () => []
});

const kbdKeysMap: Record<KbdKey, string> = {
  command: "⌘",
  shift: "⇧",
  ctrl: "⌃",
  option: "⌥",
  enter: "↵",
  delete: "⌫",
  escape: "⎋",
  tab: "⇥",
  capslock: "⇪",
  up: "↑",
  right: "→",
  down: "↓",
  left: "←",
  pageup: "⇞",
  pagedown: "⇟",
  home: "↖",
  end: "↘",
  help: "?",
  space: "␣",
  fn: "Fn",
  win: "⌘",
  alt: "⌥",
};

const keysToRender = computed(() => {
  const keys = Array.isArray(props.keys) ? props.keys : [props.keys];
  return keys.map(k => ({ key: k, char: kbdKeysMap[k] }));
});
</script>

<template>
  <kbd class="heroui-kbd">
    <span v-for="k in keysToRender" :key="k.key" class="heroui-kbd-key">{{ k.char }}</span>
    <span class="heroui-kbd-content"><slot></slot></span>
  </kbd>
</template>

<style lang="stylus" scoped>
@import '../../styles/mixins'

.heroui-kbd
  display inline-flex
  align-items center
  justify-content center
  box-shadow inset 0 -1px 0 0 rgba(0,0,0,0.1)
  background-color var(--heroui-default-100)
  border-radius $radius-small
  padding 0 4px
  min-width 20px
  min-height 20px
  font-family monospace
  font-size $font-small
  line-height normal
  color var(--heroui-default-foreground)
  gap 2px

  &-key
    font-size inherit

  &-content
    font-size inherit

</style>
