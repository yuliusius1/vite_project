<template>
    <div>
      <h1>{{ title }}</h1>
      <ul>
        <li v-for="item in items" :key="item.id">
            <b v-if="validation(item.url)" > {{ item.name }} </b>
            <i v-else > {{ item.name }} </i>
            <!-- {{ item.name }}  -->
            </li>
        </ul>
    </div>
  </template>
  
  <script setup>

  import { ref, onMounted } from 'vue';
  
  // Define reactive variables
  const title = ref('Fetching Data Example');
  const items = ref([]);
  
  // Define a function to fetch data
  const fetchData = async () => {
    try {
    // http://10.68.97.242:3000/auth/user => URL to Fetch
      const response = await fetch('https://pokeapi.co/api/v2/pokemon');
      if (response.ok) {
        const data = await response.json();
        items.value = data.results;
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    
  };

  const validation = (item) => {
    try {
        console.log(item.split("/"))
        if(Number.parseInt(item.split("/")[6]) % 2 == 1){
            return true
        }
        return false
    } catch(error){
        console.log(error)
    }
  }

  
  // Call fetchData when the component is mounted
  onMounted(fetchData);
  </script>