<script setup lang="ts">
import IconSupport from '../components/icons/IconSupport.vue'
</script>
<template>
  <div class="m-auto grid grid-cols-[45%,55%] gap-4">
    <div class="flex items-center">
      <div class="pr-15">
        <h1 class="text-[2.5rem] font-semibold text-black">Welcome to ShiftCare</h1>
        <p class="mt-5 text-[1.2rem] font-light text-[#5f5f5f]">
          Find your healthcare professional now and get the expert care you deserve, right at your
          fingertips.
        </p>
        <router-link to="/doctors">
          <button
            class="px-[20px] py-[15px] text-[white] bg-[#fdbb46] rounded-full mt-5 flex items-center flex-column text-lg"
          >
            Try it now
            <IconSupport class="ml-[8px]" />
          </button>
        </router-link>
      </div>
    </div>
    <img src="@/assets/images/healthcare-vector.jpg" />
  </div>
</template>
