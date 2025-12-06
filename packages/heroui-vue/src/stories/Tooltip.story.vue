<script setup lang="ts">
import Tooltip from '../components/tooltip/Tooltip.vue';
import Button from '../components/button/Button.vue';
</script>

<template>
  <Story title="Tooltip">
    <Variant title="Default">
      <Tooltip content="I am a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </Variant>

    <Variant title="Placements">
        <div class="flex gap-4 p-10">
            <Tooltip content="Top" placement="top">
                <Button>Top</Button>
            </Tooltip>
            <Tooltip content="Bottom" placement="bottom">
                <Button>Bottom</Button>
            </Tooltip>
            <Tooltip content="Left" placement="left">
                <Button>Left</Button>
            </Tooltip>
            <Tooltip content="Right" placement="right">
                <Button>Right</Button>
            </Tooltip>
        </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex { display: flex; }
.gap-4 { gap: 1rem; }
.p-10 { padding: 2.5rem; }
</style>
