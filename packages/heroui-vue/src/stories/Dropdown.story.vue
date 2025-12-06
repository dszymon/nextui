<script setup lang="ts">
import Dropdown from '../components/dropdown/Dropdown.vue';
import Menu from '../components/menu/Menu.vue';
import MenuItem from '../components/menu/MenuItem.vue';
import Button from '../components/button/Button.vue';
</script>

<template>
  <Story title="Dropdown">
    <Variant title="Default">
      <Dropdown>
        <template #trigger>
            <Button>Open Menu</Button>
        </template>
        <template #menu>
            <Menu>
                <MenuItem key="new">New file</MenuItem>
                <MenuItem key="copy">Copy link</MenuItem>
                <MenuItem key="edit">Edit file</MenuItem>
                <MenuItem key="delete" class="text-danger" color="danger">Delete file</MenuItem>
            </Menu>
        </template>
      </Dropdown>
    </Variant>
  </Story>
</template>
