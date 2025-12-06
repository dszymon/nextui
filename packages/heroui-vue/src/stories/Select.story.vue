<script setup lang="ts">
import Select from '../components/select/Select.vue';
import SelectItem from '../components/select/SelectItem.vue';
</script>

<template>
  <Story title="Select">
    <Variant title="Default">
      <Select label="Favorite Animal" placeholder="Select an animal">
        <SelectItem key="cat">Cat</SelectItem>
        <SelectItem key="dog">Dog</SelectItem>
      </Select>
    </Variant>
  </Story>
</template>
