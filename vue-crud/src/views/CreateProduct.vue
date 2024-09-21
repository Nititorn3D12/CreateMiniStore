<template>
  <div>
    <q-form @submit.prevent="onSubmit">
      <q-input v-model="name" label="Product Name" />
      <q-input v-model="description" label="Description" />
      <q-input v-model="price" type="number" label="Price" />
      <q-input v-model="category" label="Category" />
      <q-input v-model="image_url" label="Image URL" />
      <q-btn type="submit" label="Create" color="primary" />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const description = ref('')
const price = ref(0)
const category = ref('')
const image_url = ref('')

const onSubmit = () => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    name: name.value,
    description: description.value,
    price: price.value,
    category: category.value,
    image_url: image_url.value,
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  }

  fetch('http://localhost:8800/api/prod/products', requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result.message)
      if (result.status === 'ok') {
        router.push('/products') // เปลี่ยนเส้นทางไปยังหน้าผลิตภัณฑ์
      }
    })
    .catch(error => {
      console.error('Error creating product:', error)
      alert(`Error: ${error.message}`)
    })
}
</script>
