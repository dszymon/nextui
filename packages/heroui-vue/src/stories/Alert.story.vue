<script setup lang="ts">
import Alert from '../components/alert/Alert.vue';
</script>

<template>
  <Story title="Alert">
    <Variant title="Default">
      <Alert title="Alert Title" description="This is an alert description" />
    </Variant>

    <Variant title="Colors">
        <div class="flex-col">
            <Alert color="primary" title="Primary" />
            <Alert color="secondary" title="Secondary" />
            <Alert color="success" title="Success" />
            <Alert color="warning" title="Warning" />
            <Alert color="danger" title="Danger" />
        </div>
    </Variant>
  </Story>
</template>

<style scoped>
.flex-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
