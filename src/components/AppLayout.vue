<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppLogo from './icons/AppLogo.vue'
</script>
<template>
  <!-- app header -->
  <header class="h-[70px] w-full bg-[white] fixed top-[0] px-[15px]">
    <div class="h-full w-full lg:w-[1000px] m-auto flex justify-between items-center">
      <router-link to="/"><AppLogo alt="ShiftCare" /></router-link>
      <nav>
        <ul class="p-0 flex">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/doctors">Find a Doctor</RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <!-- app content -->
  <main class="w-full lg:w-[1000px] mx-auto pt-[90px] px-[15px] lg:px-[0]">
    <slot></slot>
  </main>
  <!-- app footer -->
  <footer class="border-t p-[15px] mt-auto">
    <div class="w-full lg:w-[1000px] m-auto flex justify-between items-center">
      <span class="text-sm">© 2025 ShiftCare. All rights reserved.</span>
    </div>
  </footer>
</template>

<style scoped>
ul > li > a {
  padding: 15px;
  color: #5f5f5f;
}

ul > li > a:hover {
  color: #000000;
}
</style>
