<template>
  <div class="mt-[20px] mb-[30px]">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <DoctorProfileCard :doctor="doctor" />
      <div class="flex flex-col bg-[white] p-[30px] mt-3 rounded">
        <form>
          <h1 class="block text-[1.3rem] text-black">Select appointment schedule</h1>
          <div class="flex flex-col mt-[30px]">
            <label class="block text-[1rem] text-black mb-[10px]">Available Days</label>
            <ul>
              <li v-for="day in days" :key="day">{{ day }}</li>
            </ul>
          </div>
          <div class="flex flex-col mt-[30px]">
            <label class="block text-[1rem] text-black mb-[10px]">Available Time Slots</label>
            <ul>
              <li v-for="slot in slots" :key="slot">{{ slot }}</li>
            </ul>
          </div>
          <div class="flex flex-col mt-[30px]">
            <label class="block text-[1rem] text-black mb-[10px]">Chief Complaint</label>
            <textarea class="border h-[100px] p-[15px]"></textarea>
          </div>
          <button
            class="px-[15px] py-[10px] text-[white] bg-[#fdbb46] rounded-full mt-5 text-md ml-auto"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DoctorProfileCard from '@/components/DoctorProfileCard.vue'
import type { IDoctorSchedule } from '@/types/Doctor'
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    DoctorProfileCard,
  },
  setup() {
    const store = useStore()
    const route = useRoute()

    const loading = computed(() => store.state.doctorStore.loading)
    const error = computed(() => store.state.doctorStore.error)
    const doctor = computed(() => store.state.doctorStore.doctorProfile)
    const days = computed(() => doctor.value?.schedule?.map((s: IDoctorSchedule) => s?.day_of_week))
    const slots = computed(() =>
      doctor.value?.schedule?.map((s: IDoctorSchedule) => s?.day_of_week),
    )

    onMounted(() => {
      store.dispatch('doctorStore/fetchDoctorProfile', route?.params?.name)
      console.log('mounted')
    })

    console.log(slots, 'slots')

    return { doctor, loading, error, days, slots }
  },
})
</script>

<style scoped>
ul {
  display: flex;
}

ul > li {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
