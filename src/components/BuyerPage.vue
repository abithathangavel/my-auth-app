<template>
    <div class="home-layout">
      <NavBar />
      <router-view />
      <div class="container">
        <div class="left-cont">
        <div class="property-container">
          <h2>Hi, You can select properties according to your preference..!</h2>
          <h2>Available Properties</h2>
          <div class="inner-property">
            <div class="properties-list">
                <div v-for="property in properties" :key="property._id" class="property-item" @click="viewProperty(property)">
                    <h3>{{ property.title }}</h3>
                    <p>{{ property.location }}</p>
                    <button @click="likeProperty(property._id)">Like</button>
                </div>
            </div>
          </div>
        </div>
  
        <div class="property-details" v-if="selectedProperty">
          <h2>Property Details</h2>
          <h3>{{ selectedProperty.title }}</h3>
          <p>{{ selectedProperty.description }}</p>
          <p>{{ selectedProperty.location }}</p>
          <p>{{ selectedProperty.area }} sq ft</p>
          <p>{{ selectedProperty.bedrooms }} Bedrooms, {{ selectedProperty.bathrooms }} Bathrooms</p>
          <p>Nearby Hospitals: {{ selectedProperty.nearbyHospitals.join(', ') }}</p>
          <p>Nearby Colleges: {{ selectedProperty.nearbyColleges.join(', ') }}</p>
          <div class="button-comp">
            <button @click="expressInterest(selectedProperty._id)">I'm Interested</button>
            <button @click="selectedProperty = null">Close</button>
          </div>
        </div>
    </div>
    
        <div class="interests-list">
          <h2>Your Interests</h2>
          <div class="interests-grid">
            <div v-for="property in interests" :key="property._id" class="interest-item">
              <h3>{{ property.title }}</h3>
              <p>{{ property.location }}</p>
              <div class="btn-inst">
              <button @click="viewSellerDetails(property.postedBy)">View Seller Details</button>
              <button @click="removeInterest(property._id)">Remove Interest</button>
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
        interests: [],
        isEditMode: false,
        editPropertyId: null,
        showPropertyForm: false,
        selectedProperty: null
      };
    },
    methods: {
      async fetchProperties() {
        try {
          const response = await axios.get('http://localhost:3000/properties');
          this.properties = response.data;
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      },
  
      async fetchInterests() {
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          const response = await axios.get(`http://localhost:3000/users/${user._id}/interests`);
          this.interests = response.data;
        } catch (error) {
          console.error('Error fetching interests:', error);
        }
      },
  
      viewProperty(property) {
        this.selectedProperty = property;
      },
  
      async expressInterest(propertyId) {
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          if (user.role === 'buyer') {
            await axios.post(`http://localhost:3000/properties/${propertyId}/interest`, { userId: user._id });
            alert('Expressed interest in property successfully');
            this.fetchInterests(); // Refresh interests list
          }
        } catch (error) {
          console.error('Error expressing interest in property:', error);
        }
      },
  
      removeInterest(propertyId) {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            axios
            .post(`http://localhost:3000/properties/${propertyId}/interest`, { userId: user._id })
            .then(() => {
                // Remove the property from the interests array in the frontend
                const index = this.interests.findIndex(interest => interest._id === propertyId);
                if (index !== -1) {
                this.interests.splice(index, 1);
                alert('Removed property from interests');
                }
            })
            .catch(error => {
                console.error('Error removing property from interests:', error);
            });
        } catch (error) {
            console.error('Error removing property from interests:', error);
        }
        },

  
        viewSellerDetails(sellerId) {
        try {
            axios.get(`http://localhost:3000/users/${sellerId}`)
            .then(response => {
                const sellerDetails = response.data;
                // Display the seller's details (you can show them in a modal or another component)
                alert(`Seller Name: ${sellerDetails.firstName} ${sellerDetails.lastName}\nSeller Phone Number: ${sellerDetails.phoneNumber}\nSeller Email: ${sellerDetails.email}`);
            })
            .catch(error => {
                console.error('Error fetching seller details:', error);
                alert('Error fetching seller details. Please try again later.');
            });
        } catch (error) {
            console.error('Error fetching seller details:', error);
            alert('Error fetching seller details. Please try again later.');
        }
        },
        likeProperty(propertyId) {
            try {
            axios.post(`http://localhost:3000/properties/${propertyId}/like`)
                .then(response => {
                const { message, likes } = response.data;
                alert(`${message}. Likes: ${likes}`);
                })
                .catch(error => {
                console.error('Error liking property:', error);
                alert('Error liking property. Please try again later.');
                });
            } catch (error) {
            console.error('Error liking property:', error);
            alert('Error liking property. Please try again later.');
            }
        }

    },
    mounted() {
      this.fetchProperties();
      this.fetchInterests();
    }
  };
  </script>
  
  <style>
  .container {
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  .left-cont{
    width: 70%;
  }
  .property-container {
    display: flex;
    flex-direction: column;
  }
  
  .inner-property {
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
  
  .button-comp {
    display: flex;
    gap: 20px;
  }
  
  .interests-list {
    margin-top: 20px;
  }
  
  .interests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 10px;
  }
  
  .interest-item {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .interest-item h3 {
    margin-bottom: 5px;
  }
  .btn-inst{
    display: flex;
    flex-direction: column;
  }
  .interest-item button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #0bb6a5;
    color: white;
    border: none;
    border-radius: 4px;
  }
  
  .interest-item button:hover {
    background-color: #040009;
  }
  </style>
  