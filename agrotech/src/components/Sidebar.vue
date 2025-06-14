<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <h2>🌱 AgroTech</h2>
    </div>
    <ul class="nav-links">
      <li>
        <RouterLink to="/">
          <span class="icon">📊</span> Dashboard
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/manutencao">
          <span class="icon">🔧</span> Manutenção
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--color-surface);
  position: fixed;
  top: 0;
  left: 0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.sidebar-header h2 {
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
}

.nav-links {
  list-style: none;
  padding: 0;
}

.nav-links li a {
  display: flex;
  align-items: center;
  padding: 1rem;
  color: var(--color-text);
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-links li a:hover,
.nav-links li a.router-link-exact-active {
  background-color: var(--color-primary);
  color: white;
}

.icon {
  margin-right: 1rem;
  font-size: 1.2rem;
}
</style>