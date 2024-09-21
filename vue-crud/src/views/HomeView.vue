<template>
  <div class="q-pa-md">
    <div class="q-py-md">
      <q-btn icon="add" @click="onCreateCustomer" />
    </div>
    <q-table
      title="Treats"
      :rows="customerRows"
      :columns="customerColumns"
      row-key="customer_id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" @click="onEditCustomer(props.row.customer_id)" />
          <q-btn icon="delete" @click="onDeleteCustomer(props.row.customer_id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'

const customerColumns = [
  { name: 'customer_id', align: 'center', label: 'Customer ID', field: 'customer_id', sortable: true },
  { name: 'first_name', align: 'center', label: 'First Name', field: 'first_name', sortable: true },
  { name: 'last_name', align: 'center', label: 'Last Name', field: 'last_name', sortable: true },
  { name: 'email', align: 'center', label: 'Email', field: 'email', sortable: true },
  { name: 'address', align: 'center', label: 'Address', field: 'address', sortable: true },
  { name: 'phone_number', align: 'center', label: 'Phone Number', field: 'phone_number', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
]

const customerRows = ref([])

// Fetch Customers
const fetchCustomers = () => {
  fetch('http://localhost:8800/api/v1/customers')
    .then(res => res.json())
    .then(result => {
      customerRows.value = result
    })
}
fetchCustomers()

const onEditCustomer = (id) => {
  router.push('/update/' + id)
}

const onDeleteCustomer = (id) => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  }

  fetch(`http://localhost:8800/api/v1/customers/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result.message)
      if (result.status === 'ok') {
        fetchCustomers() // Refresh customer list after deletion
      }
    })
    .catch((error) => console.error('Error', error))
}

const onCreateCustomer = () => {
  router.push('/create')
}
</script>
