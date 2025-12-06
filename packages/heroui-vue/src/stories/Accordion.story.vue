<script setup lang="ts">
import Accordion from '../components/accordion/Accordion.vue';
import AccordionItem from '../components/accordion/AccordionItem.vue';
</script>

<template>
  <Story title="Accordion">
    <Variant title="Default">
      <Accordion>
        <AccordionItem title="Accordion 1" value="1">
          Content 1
        </AccordionItem>
        <AccordionItem title="Accordion 2" value="2">
          Content 2
        </AccordionItem>
        <AccordionItem title="Accordion 3" value="3">
          Content 3
        </AccordionItem>
      </Accordion>
    </Variant>

    <Variant title="Splitted">
      <Accordion variant="splitted">
        <AccordionItem title="Accordion 1" value="1">
          Content 1
        </AccordionItem>
        <AccordionItem title="Accordion 2" value="2">
          Content 2
        </AccordionItem>
      </Accordion>
    </Variant>
  </Story>
</template>
