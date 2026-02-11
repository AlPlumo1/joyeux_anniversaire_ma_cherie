<template>
  <div class="home">
    <header class="header">
      <h1 class="header-title">Réserve ton voyage de rêve dès maintenant</h1>
      <p class="subtitle">Choisis la destination où tu veux aller ! </p>
    </header>

    <!-- Section destinations -->
    <div class="destinations-section">
      <h2 class="section-title">Toutes les destinations proposées pour votre cadeau</h2>
      
      <!-- Grid des cartes -->
      <div class="trips-grid">
        <TripCard 
          v-for="trip in trips" 
          :key="trip.id" 
          :trip="trip" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TripCard from '../components/TripCard.vue'
import tripsData from '../data/trips.json'

// Type pour un voyage
interface Trip {
  id: number
  destination: string
  departure: string
  departureDate: string
  returnDate: string
  duration: string
  image: string
  description: string
  highlights: string[]
}

// Import des voyages depuis le JSON
const trips = ref<Trip[]>(tripsData.trips)
</script>


<style scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
}

/* Header SNCF */
.header {
  background: #0c131f;
  padding: 3rem 2rem;
  text-align: center;
}

.header-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 400;
  margin: 0 0 2rem 0;
}

.subtitle {
  color: white;
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0 0 2rem 0;
}

/* Section destinations */
.destinations-section {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.section-title {
  text-align: center;
  font-size: 1.5rem;
  color: #2c2c2c;
  font-weight: 500;
  margin-bottom: 2rem;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid #e0e0e0;
}

.tab {
  background: none;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  position: relative;
  transition: color 0.3s;
}

.tab.active {
  color: #0088ce;
  font-weight: 600;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 3px;
  background: #0088ce;
}

/* Grid 4 colonnes */
.trips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

@media (min-width: 1200px) {
  .trips-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .trips-grid {
    grid-template-columns: 1fr;
  }
  
  .sncf-header {
    padding: 2rem 1rem;
  }
  
  .header-title {
    font-size: 1.4rem;
  }
}
</style>