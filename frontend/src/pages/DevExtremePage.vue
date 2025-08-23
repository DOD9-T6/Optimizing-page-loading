<template>
  <DxDataGrid
    :data-source="clientsStore.users"
    show-borders="true"
  >
    <DxSearchPanel 
      :visible="true" 
      placeholder="Search..." 
      highlight-case-sensitive="false" 
    />
    <DxColumn data-field="id" caption="ID" />
    <DxColumn data-field="name" caption="Name" />
    <DxColumn data-field="surname" caption="Surname" />
    <DxColumn data-field="dob" caption="dob" />
    <DxColumn data-field="fee" caption="fee" />
    <DxColumn data-field="debt" caption="debt" />
    <DxColumn data-field="notes" caption="notes" />
    <DxColumn
      data-field="provider"
      caption="Provider"
      :calculate-display-value="providerDisplay"
    />
    <DxColumn data-field="type_of_payment" caption="type_of_payment" />
    <DxColumn data-field="date_pay" caption="date_pay" />
    <DxColumn data-field="date_end_pay" caption="date_end_pay" />
    <DxPaging :default-page-size="5" />
    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5,10,20]" :show-info="true"/>
  </DxDataGrid>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUsersStore } from '../stores/usersStore.js'
import { DxDataGrid, DxColumn, DxPaging, DxPager, DxSearchPanel} from 'devextreme-vue/data-grid'


const clientsStore = useUsersStore()

onMounted(async () => {
  await clientsStore.getUsers()
})


</script>

<style scoped>

</style>