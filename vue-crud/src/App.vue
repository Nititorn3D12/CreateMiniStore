<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          MiniStore
        </q-toolbar-title>
        <q-tabs>
          <q-route-tab to="/" label="Customer" />
          <q-route-tab to="/products" label="Products" /> 
          <q-route-tab to="/about" label="About" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
