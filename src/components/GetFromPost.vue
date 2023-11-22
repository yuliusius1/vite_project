<template>
    <div>
      <h1>{{ title }}</h1>
      <ul>
        <li v-for="item in items" :key="item.id">
            {{ item.name }} 
            </li>
        </ul>
    </div>
  </template>
  
  <script setup>

  import { ref, onMounted } from 'vue';
  
  // Define reactive variables
  const title = ref('Hasil Get Post');
  const items = ref([]);
  
  // Define a function to fetch data
  const fetchData = async () => {
    try {
    // http://10.68.97.242:3000/auth/user => URL to Fetch
      const response = await fetch('https://6557178bbd4bcef8b61208ce.mockapi.io/article/article');
      if (response.ok) {
        const data = await response.json();
        items.value = data;
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    
  };
  
  // Call fetchData when the component is mounted
  onMounted(fetchData);
  </script>