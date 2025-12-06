<script setup lang="ts">
import Table from '../components/table/Table.vue';
import TableHeader from '../components/table/TableHeader.vue';
import TableBody from '../components/table/TableBody.vue';
import TableColumn from '../components/table/TableColumn.vue';
import TableRow from '../components/table/TableRow.vue';
import TableCell from '../components/table/TableCell.vue';
</script>

<template>
  <Story title="Table">
    <Variant title="Default">
      <Table>
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Variant>
  </Story>
</template>
