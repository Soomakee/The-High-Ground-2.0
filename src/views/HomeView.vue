<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import OverviewCard from '../components/OverviewCard.vue'
import QuickAccessButton from '../components/QuickAccessButton.vue'

const authStore = useAuthStore()

const currentTime = ref('00:00:04')
const activeMembers = ref(32)
const inventoryItems = ref(8)
const systemStatus = ref('OPTIMAL')

// Computed properties
const accountName = computed(() => {
  return authStore.user?.username || 'Toji'
})

// Update time every second
setInterval(() => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  currentTime.value = `${hours}:${minutes}:${seconds}`
}, 1000)
</script>

<template>
  <div class="home-view">
    <!-- Top Header Section -->
    <div class="header-section">
      <div class="status-indicator">
        <div class="status-dot"></div>
        <span class="status-text">• ONLINE</span>
      </div>
      <div class="welcome-text">
        <h1>WELCOME BACK, <span class="highlight">{{ accountName }}</span></h1>
        <p class="version-text">GUILD TERMINAL V2.0.1</p>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Guild Overview Section -->
        <div class="section">
          <h2 class="section-title">GUILD OVERVIEW</h2>
          <div class="overview-grid">
            <OverviewCard 
              title="ACTIVE MEMBERS" 
              :value="activeMembers" 
              icon="people"
            />
            <OverviewCard 
              title="INVENTORY ITEMS" 
              :value="inventoryItems" 
              icon="box"
            />
            <OverviewCard 
              title="SESSION TIME" 
              :value="currentTime" 
              icon="clock"
            />
            <OverviewCard 
              title="SYSTEM STATUS" 
              :value="systemStatus" 
              icon="lightning"
            />
          </div>
        </div>

        <!-- Quick Access Section -->
        <div class="section">
          <h2 class="section-title">QUICK ACCESS</h2>
          <div class="quick-access-grid">
            <QuickAccessButton 
              v-if="authStore.canManageMembers"
              title="MEMBER LIST" 
              icon="people"
              route="/members"
            />
            <QuickAccessButton 
              v-if="authStore.canAccessInventory"
              title="INVENTORY" 
              icon="box"
              route="/inventory"
            />
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="right-column">
        <!-- System Log Section -->
        <div class="section">
          <h2 class="section-title">SYSTEM LOG</h2>
          <div class="system-log">
            <div class="log-entry">[00:23:30] quick access modules ready</div>
            <div class="log-entry">[00:37:44] Home terminal activated</div>
            <div class="log-entry">[00:42:15] Guild overview loaded</div>
            <div class="log-entry">[00:45:22] System status optimal</div>
            <div class="log-entry">[00:48:33] User session established</div>
            <div class="log-entry">[00:51:47] Terminal ready for commands</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
}

/* Header Section */
.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #333;
  flex-shrink: 0;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.welcome-text h1 {
  color: #e0e0e0;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.highlight {
  color: #8b5cf6;
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
}

.version-text {
  color: #888;
  font-size: 0.875rem;
  margin: 0.5rem 0 0;
  font-family: 'Courier New', monospace;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  flex: 1;
  min-height: 0;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.right-column {
  display: flex;
  flex-direction: column;
}

/* Section Styling */
.section {
  display: flex;
  flex-direction: column;
}

.section-title {
  color: #8b5cf6;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #8b5cf6;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
  flex-shrink: 0;
}

/* Overview Grid */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
}

/* Quick Access */
.quick-access-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  flex: 1;
}

/* System Log */
.system-log {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.75rem;
  color: #888;
  line-height: 1.4;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.log-entry {
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
}

.log-entry:hover {
  color: #a0a0a0;
}

.log-entry:last-child {
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .overview-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .quick-access-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .home-view {
    padding: 1rem;
  }
  
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .welcome-text h1 {
    font-size: 1.5rem;
  }
  
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-access-grid {
    grid-template-columns: 1fr;
  }
}
</style>
