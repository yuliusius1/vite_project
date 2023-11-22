<template>
    <div class="card">
        <p>Data Added : {{ isAdded }}</p>
        <p>Data updated: {{ isUpdated }}</p>
        <p>Data deleted: {{ isDeleted }}</p>
        
        <button @click="addData">Add Data</button>
        <button @click="readData">Read Data</button>
        <button @click="updateData">Update Data</button>
        <button @click="deleteData">Delete Data</button>
          <ul>
            <li v-for="p in people" :key="p.id" style="list-style-type:none">
              <img :src="p.image" >
               <p> {{ p.name }} - {{ p.location }} </p>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

// Data
const namaDB = "IndexedDBCustom";
const namaSubDB = "people"


const isAdded = ref(null);
const people = ref([]);
const isUpdated = ref(null);
const isDeleted = ref(null);
const keyToUpdate = "u077608";
const keyToDelete = "u077608";


const toBlob = (url, callback) => {
  var xhr = new XMLHttpRequest();
  // xhr.onerror = function() {reject("Network error.")};
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
    console.log("sampai sini" + xhr.response)
  };  
  xhr.open("GET", url);
  xhr.responseType = "blob";
  console.log("sampai sini" + xhr.response)
  xhr.send();
}

const addData = () => {
  toBlob("/apple-touch-icon-180x180.png", function(response){
    const dataDb = {
        id          : "u077608",
        name        : "Yulius",
        location    : "Wisma BCA Foresta",
        image       : response
    };
    const request = indexedDB.open(namaDB,2);
    request.onerror = (event) => {
        console.error("Error found : " + event.target.error);
    }

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore(namaSubDB, {keyPath: "id"});
        objectStore.createIndex("name", "name", {unique: false});
        objectStore.createIndex("location", "location", {unique: false});
        objectStore.createIndex("image", "image", {unique: false});
    }

    request.onsuccess = (event) => {
        const db = event.target.result;
        const addTransaction = db.transaction(namaSubDB, "readwrite");
        const peopleObjectStore = addTransaction.objectStore(namaSubDB);

        const addRequest = peopleObjectStore.add(dataDb);

        addRequest.onsuccess = (event) => {
            console.log("Data added successfully");
            isAdded.value = "Yes";
        };

        addRequest.onerror = (event) => {
            console.error("Error adding data", event.target.error);
            isAdded.value = "No";
        };

        addTransaction.oncomplete = () => {
            console.log("Add transaction completed");
            db.close();
        };
    };
  });
};

// View
const readData = () => {
  const request = indexedDB.open(namaDB, 2);

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const readTransaction = db.transaction(namaSubDB, "readonly");
    const customerObjectStore = readTransaction.objectStore(namaSubDB);

    const customersCursor = customerObjectStore.openCursor();

    customersCursor.onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        people.value.splice(cursor.value.index, 1, cursor.value);
        cursor.continue();
      } else {
        console.log("Data read successfully");
        db.close();
      }
    };

    customersCursor.onerror = (event) => {
      console.error("Error reading data", event.target.error);
      db.close();
    };
  };
};



const updateData = () => {
  toBlob("/pwa-192x192.png", function(response){
    
    const request = indexedDB.open(namaDB,2);
    request.onerror = (event) => {
        console.error("Error found : " + event.target.error);
    }

    const dataUpdateDb = {
        id          : "u077608",
        name        : "Yulius Ius",
        location    : "Wisma BCA",
        image       : response
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const updateTransaction = db.transaction(namaSubDB, "readwrite");
        const peopleObjectStore = updateTransaction.objectStore(namaSubDB);

        const updateRequest = peopleObjectStore.put(dataUpdateDb);

        updateRequest.onsuccess = (event) => {
            console.log("Data updating successfully");
            isUpdated.value = "Yes";
        };

        updateRequest.onerror = (event) => {
            console.error("Error updating data", event.target.error);
            isUpdated.value = "No";
        };

        updateTransaction.oncomplete = () => {
            console.log("Add transaction completed");
            db.close();
        };
    };
  });
};

const deleteData = () => {
  const request = indexedDB.open(namaDB,2);
    request.onerror = (event) => {
        console.error("Error found : " + event.target.error);
    }

    request.onsuccess = (event) => {
        const db = event.target.result;
        const deleteTransaction = db.transaction(namaSubDB, "readwrite");
        const peopleObjectStore = deleteTransaction.objectStore(namaSubDB);

        const deleteRequest = peopleObjectStore.delete(keyToDelete);

        deleteRequest.onsuccess = (event) => {
            console.log("Data deleting successfully");
            isDeleted.value = "Yes";
        };

        deleteRequest.onerror = (event) => {
            console.error("Error deleting data", event.target.error);
            isDeleted.value = "No";
        };

        deleteTransaction.oncomplete = () => {
            console.log("Delete transaction completed");
            db.close();
        };
    };
};

</script>