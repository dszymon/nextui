<script setup lang="ts">
import Pagination from '../components/pagination/Pagination.vue';
import { ref } from 'vue';

const page = ref(1);
</script>

<template>
  <Story title="Pagination">
    <Variant title="Default">
      <Pagination :total="10" v-model:page="page" />
    </Variant>
  </Story>
</template>
