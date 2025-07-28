<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

const getIconPath = (icon) => {
  const icons = {
    people: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V15h-1.5v-3.74L9.01 9C8.54 8.37 7.8 8 7 8H5.46c-.8 0-1.54.37-2.01 1L.96 16.37A1.5 1.5 0 0 0 2.5 18H5v6h2v-6h1v6h2v-6h1v6h2z",
    box: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z",
    clock: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    lightning: "M7 2v11h3v9l7-12h-4l4-8z"
  }
  return icons[icon] || icons.box
}
</script>

<template>
  <div class="overview-card">
    <h3 class="card-title">{{ title }}</h3>
    <div class="card-content">
      <svg class="card-icon" viewBox="0 0 24 24" fill="currentColor">
        <path :d="getIconPath(icon)" />
      </svg>
      <span class="card-value">{{ value }}</span>
    </div>
  </div>
</template>

<style scoped>
.overview-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.overview-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: #8b5cf6;
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.1);
  transform: translateY(-2px);
}

.card-title {
  color: #888;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-icon {
  width: 24px;
  height: 24px;
  color: #666;
  flex-shrink: 0;
}

.card-value {
  color: #e0e0e0;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Courier New', monospace;
}
</style> 