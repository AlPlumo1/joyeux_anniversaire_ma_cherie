<template>
  <div class="confirmation-page">

    <!-- Bouton retour -->
    <button class="back-button" @click="goBack">
      ← Voir les autres destinations
    </button>
    <!-- Section 1: Hero mystérieux -->
    <section class="hero-section" ref="heroSection">
      <div class="hero-content">
        <!-- Texte initial (disparaît après 5s) -->
        <div v-if="!isReady" class="initial-content">
          <h1 class="hero-title">Préparation de votre voyage...</h1>
          <div class="loading-animation">
            <div class="spinner"></div>
          </div>
        </div>
        
        <!-- Texte final (apparaît après 5s) -->
        <div v-if="isReady" class="ready-content">
          <h1 class="hero-title">Votre voyage est prêt</h1>
          <p class="scroll-hint">Scrollez pour le découvrir</p>
          <div class="arrow-down" @click="scrollToDestination">
            <span class="arrow">↓</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Révélation destination -->
    <section class="destination-reveal" ref="destinationSection">
      <div class="reveal-content fade-in">
        <h2 class="destination-name">{{ trip?.destination }}</h2>
        <img :src="trip?.image" :alt="trip?.destination" class="destination-image" />
        <p class="destination-description">{{ trip?.description }}</p>
      </div>
    </section>

    <!-- Section 3: Détails pratiques -->
    <section class="details-section" ref="detailsSection">
      <div class="details-container fade-in">
        <h3 class="section-title">Les détails de votre voyage</h3>
        
        <div class="detail-cards">
          <div class="detail-card">
            <div class="icon">📅</div>
            <div class="detail-info">
              <h4>Dates</h4>
              <p>{{ trip?.departureDate }}</p>
              <p>{{ trip?.returnDate }}</p>
            </div>
          </div>

          <div class="detail-card">
            <div class="icon">🚉</div>
            <div class="detail-info">
              <h4>Départ</h4>
              <p>{{ trip?.departure }}</p>
            </div>
          </div>

          <div class="detail-card">
            <div class="icon">⏱️</div>
            <div class="detail-info">
              <h4>Durée</h4>
              <p>{{ trip?.duration }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Highlights -->
    <section class="highlights-section" ref="highlightsSection">
      <div class="highlights-container fade-in">
        <h3 class="section-title">Au programme</h3>
        <div class="highlights-grid">
          <div 
            v-for="(highlight, index) in trip?.highlights" 
            :key="index"
            class="highlight-item"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <span class="highlight-icon">✨</span>
            <span class="highlight-text">{{ highlight }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: SURPRISE FINALE -->
    <section class="surprise-section" ref="surpriseSection">
      <div class="surprise-container fade-in">
        <div class="confetti">🎉</div>
        <h2 class="surprise-title">Ce voyage est pour toi !</h2>
        <p class="surprise-message">
          Joyeux anniversaire ma chérie ! ❤️<br>
          Prépare ta valise, on part à {{ trip?.destination }} !
        </p>
        <button class="download-button" @click="downloadTicket">
          Télécharger mon billet
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import tripsData from '../data/trips.json'

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

const route = useRoute()
const router = useRouter()
const trip = ref<Trip | null>(null)
  


// Refs pour les sections
const heroSection = ref<HTMLElement | null>(null)
const destinationSection = ref<HTMLElement | null>(null)
const detailsSection = ref<HTMLElement | null>(null)
const highlightsSection = ref<HTMLElement | null>(null)
const surpriseSection = ref<HTMLElement | null>(null)
const isReady = ref(false)

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  const tripId = parseInt(route.params.id as string)
  trip.value = tripsData.trips.find(t => t.id === tripId) || null

  // Observer pour les animations au scroll
  setupScrollAnimations()
  
  // 👇 Timer de 5 secondes
  setTimeout(() => {
    isReady.value = true
  }, 5000)
})

// Récupérer le voyage
onMounted(() => {
  const tripId = parseInt(route.params.id as string)
  trip.value = tripsData.trips.find(t => t.id === tripId) || null

  // Observer pour les animations au scroll
  setupScrollAnimations()
})

// Intersection Observer pour animations
const setupScrollAnimations = () => {
  const options = {
    threshold: 0.3,
    rootMargin: '0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, options)

  // Observer toutes les sections
  const sections = [
    destinationSection.value,
    detailsSection.value,
    highlightsSection.value,
    surpriseSection.value
  ]

  sections.forEach(section => {
    if (section) observer.observe(section)
  })
}

// Fonction pour télécharger le billet (à implémenter plus tard)
const downloadTicket = () => {
  alert('Téléchargement du billet... (à venir !)')
}
</script>

<style scoped>
.confirmation-page {
  background: #f5f5f5;
}

.back-button {
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: rgba(255, 255, 255, 0.95);
  color: #082548;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

/* Section 1: Hero */
.hero-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-content {
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease;
}

.loading-animation {
  margin-top: 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Section 2: Destination reveal */
.destination-reveal {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: white;
}

.reveal-content {
  max-width: 800px;
  text-align: center;
}

.destination-name {
  font-size: 4rem;
  color: #082548;
  margin-bottom: 2rem;
  font-weight: 700;
}

.destination-image {
  width: 100%;
  max-width: 700px;
  height: 400px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.destination-description {
  font-size: 1.5rem;
  color: #666;
}

/* Section 3: Détails */
.details-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: #f9f9f9;
}

.details-container {
  max-width: 1000px;
  width: 100%;
}

.section-title {
  font-size: 2rem;
  color: #082548;
  text-align: center;
  margin-bottom: 3rem;
}

.detail-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.detail-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.icon {
  font-size: 3rem;
}

.detail-info h4 {
  font-size: 1.2rem;
  color: #082548;
  margin: 0 0 0.5rem 0;
}

.detail-info p {
  margin: 0.25rem 0;
  color: #666;
}

/* Section 4: Highlights */
.highlights-section {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: white;
}

.highlights-container {
  max-width: 800px;
  width: 100%;
}

.highlights-grid {
  display: grid;
  gap: 1.5rem;
}

.highlight-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  animation: slideInLeft 0.6s ease both;
}

.highlight-icon {
  font-size: 2rem;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Section 5: Surprise */
.surprise-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  position: relative;
  overflow: hidden;
}

.surprise-container {
  text-align: center;
  color: white;
  z-index: 2;
}

.confetti {
  font-size: 5rem;
  margin-bottom: 2rem;
  animation: bounce 1s ease infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.surprise-title {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}

.surprise-message {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  line-height: 1.8;
}

.download-button {
  background: white;
  color: #f5576c;
  border: none;
  padding: 1.5rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.download-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
}

/* Animation des sections au scroll */
.fade-in {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

section.visible .fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title,
  .destination-name,
  .surprise-title {
    font-size: 2rem;
  }

  .detail-cards {
    grid-template-columns: 1fr;
  }
}

/* Section 1: Hero */
.hero-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0073ae 0%, #8de8fe 100%);
  color: white;
  position: relative;
}

.hero-content {
  text-align: center;
  width: 100%;
}

/* Contenu initial et final */
.initial-content,
.ready-content {
  animation: fadeInUp 0.8s ease;
}

.hero-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
}

.loading-animation {
  margin-top: 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Contenu "ready" */
.scroll-hint {
  font-size: 1.2rem;
  margin-top: 1rem;
  opacity: 0.9;
}

/* Flèche animée */
.arrow-down {
  margin-top: 3rem;
}

.arrow {
  font-size: 4rem;
  display: inline-block;
  animation: bounceArrow 2s ease infinite;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.arrow:hover {
  transform: scale(1.2);
}

@keyframes bounceArrow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(20px);
  }
}
</style>