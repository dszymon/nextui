<script setup lang="ts">
import Autocomplete from '../components/autocomplete/Autocomplete.vue';
import AutocompleteItem from '../components/autocomplete/AutocompleteItem.vue';
</script>

<template>
  <Story title="Autocomplete">
    <Variant title="Default">
      <Autocomplete label="Select an animal" placeholder="Search an animal">
        <AutocompleteItem key="cat">Cat</AutocompleteItem>
        <AutocompleteItem key="dog">Dog</AutocompleteItem>
        <AutocompleteItem key="bird">Bird</AutocompleteItem>
      </Autocomplete>
    </Variant>
  </Story>
</template>
