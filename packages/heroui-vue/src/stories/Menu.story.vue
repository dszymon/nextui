<script setup lang="ts">
import Menu from '../components/menu/Menu.vue';
import MenuItem from '../components/menu/MenuItem.vue';
</script>

<template>
  <Story title="Menu">
    <Variant title="Default">
      <Menu>
        <MenuItem key="new">New file</MenuItem>
        <MenuItem key="copy">Copy link</MenuItem>
        <MenuItem key="edit">Edit file</MenuItem>
        <MenuItem key="delete" class="text-danger" color="danger">Delete file</MenuItem>
      </Menu>
    </Variant>
  </Story>
</template>
