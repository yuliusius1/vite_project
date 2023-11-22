<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})


const condition = ref('D')
const conditions = ref('A')
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      <!-- <p v-if="condition === 'A'"> 
        Kondisi A 
        <p v-if="conditions === 'A'"> Kondisi B </p>
        <p v-else> Kondisi C </p>
        </p>
      <p v-else> 
        Kondisi D 
        <p v-if="conditions === 'C'"> Kondisi E </p>
        <p v-else> Kondisi F </p>
      </p> -->

      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
