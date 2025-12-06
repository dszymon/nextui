<script setup lang="ts">
import Listbox from '../components/listbox/Listbox.vue';
import ListboxItem from '../components/listbox/ListboxItem.vue';
</script>

<template>
  <Story title="Listbox">
    <Variant title="Default">
      <div class="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox>
          <ListboxItem key="new">New file</ListboxItem>
          <ListboxItem key="copy">Copy link</ListboxItem>
          <ListboxItem key="edit">Edit file</ListboxItem>
          <ListboxItem key="delete" class="text-danger" color="danger">Delete file</ListboxItem>
        </Listbox>
      </div>
    </Variant>
  </Story>
</template>
