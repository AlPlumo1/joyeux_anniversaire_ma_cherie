<!-- Dans TripCard.vue -->
<template>
  <div class="trip-card" @click="selectTrip">
    <div class="image-container">
      <!-- 👇 Changé ici -->
      <img :src="trip.destinationImages[0]" :alt="trip.destination" class="trip-image" />
    </div>
    
    <div class="trip-info">
      <h3 class="destination">{{ trip.destination }}</h3>
      <p class="region">{{ trip.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface TripStep {
  order: number
  city: string
  images: string[]
}

interface Trip {
  id: number
  destination: string
  departure: string
  departureDate: string
  returnDate: string
  duration: string
  destinationImages: string[]  // 👈 Changé
  description: string
  highlights: string[]
  steps: TripStep[]  // 👈 Ajouté
}

const props = defineProps<{
  trip: Trip
}>()

const router = useRouter()

const selectTrip = () => {
  router.push(`/trip/${props.trip.id}`)
}
</script>

<!-- Le reste du style reste pareil -->
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