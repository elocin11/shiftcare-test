<template>
  <div class="flex bg-[white] p-[30px] rounded">
    <img src="https://placehold.co/150" class="rounded-full h-[150px] w-[150px]" />
    <div class="ml-[30px]">
      <span class="block text-[1.5rem] font-semibold text-black">{{ data?.name }}</span>
      <span class="block font-light">Specialization: N/A</span>
      <span class="block font-light">Schedule: Monday, Tuesday </span>
      <span class="block font-light">Timezone: {{ data?.timezone }}</span>
      <router-link :to="`/doctors/${data?.name}`">
        <button
          class="py-[5px] text-[#3594e4] font-semibold mt-[10px] flex items-center flex-column border-b border-[#3594e4]"
        >
          Book an appointment
        </button>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type IDoctor, type IDoctorProfile } from '@/types/Doctor.ts'

export default defineComponent({
  props: {
    doctor: {
      type: Object as PropType<IDoctor | IDoctorProfile>,
      required: true,
    },
  },
  setup(props) {
    const { doctor } = props

    return { data: doctor }
  },
})
</script>
