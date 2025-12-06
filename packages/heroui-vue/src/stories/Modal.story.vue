<script setup lang="ts">
import Modal from '../components/modal/Modal.vue';
import ModalHeader from '../components/modal/ModalHeader.vue';
import ModalBody from '../components/modal/ModalBody.vue';
import ModalFooter from '../components/modal/ModalFooter.vue';
import Button from '../components/button/Button.vue';
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <Story title="Modal">
    <Variant title="Default">
      <Button @click="isOpen = true">Open Modal</Button>
      <Modal v-model:isOpen="isOpen">
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>Nullam pulvinar risus non risus hendrerit venenatis.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" @click="isOpen = false">Close</Button>
          <Button color="primary" @click="isOpen = false">Action</Button>
        </ModalFooter>
      </Modal>
    </Variant>
  </Story>
</template>
