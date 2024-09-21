<template>
  <div class="q-pa-md">
    <div class="q-py-md">
      <q-btn icon="add" @click="onCreateProduct" />
    </div>
    <q-table
      title="Products"
      :rows="productRows"
      :columns="productColumns"
      row-key="product_id"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="edit" @click="onEditProduct(props.row.product_id)" />
          <q-btn icon="delete" @click="onDeleteProduct(props.row.product_id)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router'

const productColumns = [
  { name: 'product_id', align: 'center', label: 'Product ID', field: 'product_id', sortable: true },
  { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
  { name: 'description', align: 'center', label: 'Description', field: 'description', sortable: true },
  { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
  { name: 'category', align: 'center', label: 'Category', field: 'category', sortable: true },
  { name: 'image_url', align: 'center', label: 'Image URL', field: 'image_url', sortable: true },
  { name: 'actions', align: 'center', label: 'Actions', field: 'actions' }
]

const productRows = ref([])

const fetchProducts = () => {
  fetch('http://localhost:8800/api/prod/products/')
    .then(res => res.json())
    .then(result => {
      productRows.value = result
    })
}
fetchProducts()

const onEditProduct = (id) => {
  router.push('/update-product/' + id)
}

const onDeleteProduct = (id) => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  }

  fetch(`http://localhost:8800/api/prod/products/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result.message)
      if (result.status === 'ok') {
        fetchProducts() // Refresh product list after deletion
      }
    })
    .catch((error) => console.error('Error', error))
}

const onCreateProduct = () => {
  router.push('/create-product')
}
</script>
