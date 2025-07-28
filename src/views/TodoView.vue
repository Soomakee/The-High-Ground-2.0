<template>
  <div class="todo-view">
    <h1 class="page-title">To Do</h1>
    <div class="content-area">
      <p>Task management system coming soon...</p>
    </div>
  </div>
</template>

<style scoped>
.todo-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
}

.page-title {
  color: #10b981;
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 2rem;
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
  flex-shrink: 0;
}

.content-area {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  color: #888;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 