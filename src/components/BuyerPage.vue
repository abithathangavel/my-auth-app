<template>
    <div class="home-layout">
      <NavBar />
      <router-view />
      <div class="container">
  
        <div v-if="selectedProperty" class="property-details">
          <h2>Property Details</h2>
          <h3>{{ selectedProperty.title }}</h3>
          <p>{{ selectedProperty.description }}</p>
          <p>{{ selectedProperty.location }}</p>
          <p>{{ selectedProperty.area }} sq ft</p>
          <p>{{ selectedProperty.bedrooms }} Bedrooms, {{ selectedProperty.bathrooms }} Bathrooms</p>
          <p>Nearby Hospitals: {{ selectedProperty.nearbyHospitals.join(', ') }}</p>
          <p>Nearby Colleges: {{ selectedProperty.nearbyColleges.join(', ') }}</p>
          <div class="button-comp">
            <button  @click="expressInterest(selectedProperty._id)">Express Interest</button>
            <button @click="selectedProperty = null">Close</button>
        </div>
        </div>
        <div class="property-container">
            <h2>Available Properties</h2>
            <div class="inner-property">
        <div class="properties-list">
          <div v-for="property in properties" :key="property._id" class="property-item" @click="viewProperty(property)">
            <h3>{{ property.title }}</h3>
            <p>{{ property.location }}</p>
          </div>
        </div>
    </div>
    </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      newProperty: {
        title: '',
        description: '',
        location: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        nearbyHospitals: '',
        nearbyColleges: ''
      },
      properties: [],
      isEditMode: false,
      editPropertyId: null,
      showPropertyForm: false,
      selectedProperty: null
    };
  },
  methods: {
    async submitProperty() {
      try {
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const propertyData = {
          title: this.newProperty.title,
          description: this.newProperty.description,
          location: this.newProperty.location,
          area: this.newProperty.area,
          bedrooms: this.newProperty.bedrooms,
          bathrooms: this.newProperty.bathrooms,
          nearbyHospitals: this.newProperty.nearbyHospitals.split(','),
          nearbyColleges: this.newProperty.nearbyColleges.split(','),
          userId: userId
        };

        if (this.isEditMode) {
          // Update existing property
          await axios.put(`http://localhost:3000/properties/${this.editPropertyId}`, propertyData);
          alert('Property updated successfully');
        } else {
          // Add new property
          await axios.post('http://localhost:3000/properties', propertyData);
          alert('Property added successfully');
        }

        this.resetForm();
        this.fetchProperties(); // Refresh properties list
      } catch (error) {
        console.error('Error adding/updating property:', error);
      }
    },

    async fetchProperties() {
      try {
        const response = await axios.get('http://localhost:3000/properties');
        this.properties = response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    },

    viewProperty(property) {
      this.selectedProperty = property;
    },
    async expressInterest(propertyId) {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user.role === 'buyer') {
        await axios.post(`http://localhost:3000/properties/${propertyId}/interest`, { buyerId: user._id });
        alert('Expressed interest in property successfully');
        }
    } catch (error) {
        console.error('Error expressing interest in property:', error);
    }
    }

  },
  mounted() {
    this.fetchProperties();
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.form {
  background-color: white;
}

.property-form {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fbf9f9;
  width:50%;
}

.property-details {
    margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 40%;
}
.property-container{
    display: flex;
    flex-direction: column;
}
.inner-property{
    display: flex;
    flex-direction: column;
}
.properties-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.property-item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.property-item h3,
.property-item p {
  margin: 5px 0;
}
button {
  padding: 10px;
  margin-top: 10px;
  border: none;
  background-color: #0bb6a5;
  color: white;
  border-radius: 4px;
}

button:hover{
  background-color: #040009;
  color: white;
  border: none;
  box-shadow: 0 0 10px rgba(93, 92, 92, 0.1);
}

.button-comp{
    display: flex;
    gap: 20px;
}
</style>
