<template>
  <div class="flex bg-[white] p-[30px] rounded">
    <img src="https://placehold.co/120" class="rounded-full h-[120px] w-[120px]" />
    <div class="ml-[30px] flex-1">
      <span class="block text-[1.5rem] font-semibold text-black">{{ data?.name }}</span>
      <span class="block font-light">Specialization: N/A</span>
      <span class="block font-light">Timezone: {{ data?.timezone }}</span>
      <div class="mb-3">
        <span class="font-light mb-2 block">Schedule: </span>
        <ul>
          <li
            v-for="schedule in data?.schedule"
            :key="`${schedule.day_of_week}-${schedule.available_at}-${schedule.available_until}`"
          >
            {{ schedule.day_of_week }}: {{ schedule.available_at }} - {{ schedule.available_until }}
          </li>
        </ul>
      </div>
    </div>
    <router-link :to="`/doctors/${data?.name}`" class="ml-auto">
      <button
        class="py-[5px] px-[10px] rounded text-[#3594e4] mt-[10px] flex items-center flex-column border border-[#3594e4]"
      >
        Book an appointment
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type IDoctorProfile } from '@/types/Doctor.ts'

export default defineComponent({
  props: {
    doctor: {
      type: Object as PropType<IDoctorProfile>,
      required: true,
    },
  },
  setup(props) {
    const { doctor } = props

    return { data: doctor }
  },
})
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}

ul > li {
  font-size: 14px;
  font-weight: light;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  color: #ffffff;
  background-color: #5fb587;
}
</style>
