<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
})

const getIconPath = (icon) => {
  const icons = {
    people: "M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V15h-1.5v-3.74L9.01 9C8.54 8.37 7.8 8 7 8H5.46c-.8 0-1.54.37-2.01 1L.96 16.37A1.5 1.5 0 0 0 2.5 18H5v6h2v-6h1v6h2v-6h1v6h2z",
    box: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"
  }
  return icons[icon] || icons.box
}

const handleClick = () => {
  router.push(props.route)
}
</script>

<template>
  <button class="quick-access-btn" @click="handleClick">
    <svg class="quick-icon" viewBox="0 0 24 24" fill="currentColor">
      <path :d="getIconPath(icon)" />
    </svg>
    <span>{{ title }}</span>
  </button>
</template>

<style scoped>
.quick-access-btn {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  color: #e0e0e0;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  justify-content: center;
}

.quick-access-btn:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: #8b5cf6;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  transform: translateY(-4px);
}

.quick-icon {
  width: 32px;
  height: 32px;
  color: #666;
  transition: all 0.3s ease;
}

.quick-access-btn:hover .quick-icon {
  color: #8b5cf6;
  transform: scale(1.1);
}
</style> 