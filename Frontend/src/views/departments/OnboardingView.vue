<template>
  <!-- <v-container fluid class="fill-height tw-bg-gray-200"> -->
  <!-- <v-tabs fixed-tabs v-model="tab" align-tabs="center">
    <v-tab value="metrics">Metrics</v-tab>
    <v-tab value="history">History</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item value="history">
      <history-view name="Onboarding"></history-view>
    </v-window-item> -->

    <!-- <v-window-item value="metrics"> -->
      <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" :color=colours.ONBOARDING elevation="8" rounded="lg">
        <v-card-title class="text-h4 font-bold tw-mt-4">Onboarding Metrics</v-card-title>
        <v-card-subtitle class="text-white tw-mb-2">
          Please fill in the details below
        </v-card-subtitle>
        <v-divider :thickness="2" color="black" style="background-color: black;" class="border-opacity-100"></v-divider>
        <v-spacer></v-spacer>


        <metrics-form :collection="OnboardingData.collection" :metric="OnboardingData.metric"
          :formDataFields="OnboardingData.formDataFields" />

        <metrics-form :collection="TimeToOnboarding.collection" :metric="TimeToOnboarding.metric"
          :formDataFields="TimeToOnboarding.formDataFields" />

        <metrics-form :collection="OnboardingTaskDays.collection" :metric="OnboardingTaskDays.metric"
          :formDataFields="OnboardingTaskDays.formDataFields" />

        <list-form :collection="OnboardingCompaniesLive.collection" :metric="OnboardingCompaniesLive.metric"
          :formDataFields="OnboardingCompaniesLive.formDataFields"></list-form>

        <list-form :collection="OnboardingCompaniesInOnboarding.collection"
          :metric="OnboardingCompaniesInOnboarding.metric"
          :formDataFields="OnboardingCompaniesInOnboarding.formDataFields"></list-form>

        <list-form :collection="OnboardingCompaniesCancelled.collection" :metric="OnboardingCompaniesCancelled.metric"
          :formDataFields="OnboardingCompaniesCancelled.formDataFields"></list-form>

      </v-card>
    <!-- </v-window-item> -->
  <!-- </v-window> -->

  <!-- </v-container> -->
</template>

<script setup>
import colours from '@/utils/colours';
import MetricsForm from '@/components/MetricsForm.vue';
import ListForm from '@/components/ListForm.vue';

import OnboardingData from '@/datafields/onboarding/onboardingData'
import TimeToOnboarding from '@/datafields/onboarding/timeToOnboarding';
import OnboardingTaskDays from '@/datafields/onboarding/onboardingTaskDays';
import OnboardingCompaniesLive from '@/datafields/onboarding/onboardingCompaniesLive';
import OnboardingCompaniesCancelled from '@/datafields/onboarding/onboardingCompaniesCancelled';
import OnboardingCompaniesInOnboarding from '@/datafields/onboarding/onboardingCompaniesInOnboarding';

// import { ref } from 'vue';
// import HistoryView from '../HistoryView.vue';
// const tab = ref('metrics');

</script>


<!-- <style>
.form-container {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 16px;
  /* Adjust the gap between label and input field */
}

.form-container label {
  display: flex;
  align-items: center;
}

label {
  text-align: right;
}
</style> -->
<!-- // const formData = ref({
  //   timestamp: new Date().toISOString().slice(0, 10),
  //   number_of_companies_in_onboarding_at_start_of_period: 0,
  //   number_of_new_companies_received_in_period: 0,
  //   number_of_companies_that_went_live_in_period: 0,
  //   number_of_companies_remaining_in_onboarding_at_the_end_of_the_period: 0,
  //   number_of_consultants: 0,
  //   number_of_companies_live_per_consultant: 0,
  // });
  
  
  // const dialog = ref(false);
  // const formDataFields = [
  //   // { id: 'timestamp', label: 'Timestamp', type: 'date', value: new Date().toISOString().slice(0, 10) },
  //   { id: 'number_of_consultants', label: 'Number of Consultants', type: 'number', value: 0 },
  //   { id: 'number_of_companies_in_onboarding_at_start_of_period', label: 'Number of Companies in Onboarding at Start of Period', type: 'number', value: 0 },
  //   { id: 'number_of_companies_that_went_live_in_period', label: 'Number of Companies that Went Live in Period', type: 'number', value: 0 },
  //   { id: 'number_of_new_companies_received_in_period', label: 'Number of New Companies Received in Period', type: 'number', value: 0 },
  //   { id: 'number_of_companies_live_per_consultant', label: 'Number of Companies Live per Consultant', type: 'number', value: 0 },
  //   { id: 'number_of_companies_remaining_in_onboarding_at_the_end_of_the_period', label: 'Number of Companies Remaining in Onboarding at the End of the Period', type: 'number', value: 0 },
  // ];
  
  // const onboardingTimeToOnboardingRef = ref({
  //   timestamp: new Date().toISOString().slice(0, 10),
  // });
  
  
  // // const dialog = ref(false);
  // const onboardingTimeToOnboardingFields = [
  
  //   { id: 'number_of_consultants', label: 'Number of Consultants', type: 'number', value: 0 },
  // ];
  
  
  
  // const submitForm = async () => {
  //   // Implement your submit logic here
  //   console.log('Form submitted:', formData.value);
  
  //   const data = {
  //     "timestamp": formData.value.timestamp + ' 00:00:00.000Z',
  //     "number_of_companies_in_onboarding_at_start_of_period": formData.value.number_of_companies_in_onboarding_at_start_of_period,
  //     "number_of_new_companies_received_in_period": formData.value.number_of_new_companies_received_in_period,
  //     "number_of_companies_that_went_live_in_period": formData.value.number_of_companies_that_went_live_in_period,
  //     "number_of_companies_remaining_in_onboarding_at_the_end_of_the_period": formData.value.number_of_companies_remaining_in_onboarding_at_the_end_of_the_period,
  //     "number_of_consultants": formData.value.number_of_consultants,
  //     "number_of_companies_live_per_consultant": formData.value.number_of_companies_live_per_consultant
  //   };
  
  //   const record = await pb.collection('onboarding_data').create(data);
  
  //   console.log(record);
  
  //   this.clearForm();
  // };
  
  // const clearForm = () => {
  //   // Clear the form data
  //   formData.value = {
  //     // time: '',
  //     // metric: '',
  //     // previous: null,
  //     // current: null,
  //     // change: null
  
  //     timestamp: new Date().toISOString().slice(0, 10),
  //     number_of_companies_in_onboarding_at_start_of_period: 0,
  //     number_of_new_companies_received_in_period: 0,
  //     number_of_companies_that_went_live_in_period: 0,
  //     number_of_companies_remaining_in_onboarding_at_the_end_of_the_period: 0,
  //     number_of_consultants: 0,
  //     number_of_companies_live_per_consultant: 0,
  //   };
  // }; -->

<!-- <script>
export default {
    props: {
        formDataFields: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            formData: {
                timestamp: new Date().toISOString().slice(0, 10),
                ...Object.fromEntries(this.formDataFields.map(field => [field.id, field.value]))
            }
        };
    },
    methods: {
        clearForm() {
            Object.keys(this.formData).forEach(key => {
                this.formData[key] = '';
            });
        },
        submitForm() {
            console.log('Form submitted:', this.formData);
        }
    }
};
</script> -->

    <!-- <v-card class="tw-mx-8 tw-mt-10 tw-mb-14" elevation="4" rounded="lg">


      <v-card-title class="text-xl font-bold tw-mb-2">Onboarding Data</v-card-title>
      <v-card-text class="p-6">
        <form @submit.prevent="submitForm" class="space-y-4 grid grid-cols-2 gap-4">

          <div class="form-container tw-col-span-2">
            <label :for="timestamp" class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">Timestamp
              :</label>
            <input type="date" :id="timestamp" v-model="formData.timestamp" required
              class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
          </div>

          <div class="tw-mt-5 form-container">
            <div v-for="(field, index) in formDataFields" :key="index" class="tw-flex tw-flex-col form-container">
              <label :for="field.id" class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">{{ field.label
              }} :</label>
              <input :type="field.type" :id="field.id" v-model="formData[field.id]"
                :min="field.type === 'number' ? 0 : null" required
                class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
            </div>
          </div>

          <div class="flex tw-mt-4 tw-text-end">
            <v-spacer></v-spacer>
            <v-btn color="red" rounded class="tw-px-4 tw-py-2 tw-mr-4" @click="clearForm">Clear</v-btn>

            <v-btn color="green" rounded class="tw-px-4 tw-py-2" @click="submitForm">Submit</v-btn>
          </div>
        </form>

      </v-card-text>
    </v-card> -->

    <!-- <v-card class="tw-mx-8 tw-mt-10 tw-mb-14" elevation="4" rounded="lg">


      <v-card-title class="text-xl font-bold tw-mb-2">Onboarding Data</v-card-title>
      <v-card-text class="p-6">
        <form @submit.prevent="submitForm" class="space-y-4 grid grid-cols-2 gap-4">

          <div class="form-container tw-col-span-2">
            <label :for="timestamp" class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">Timestamp
              :</label>
            <input type="date" :id="timestamp" v-model="formData.timestamp" required
              class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
          </div>

          <div class="tw-mt-5 form-container">
            <div v-for="(field, index) in formDataFields" :key="index" class="tw-flex tw-flex-col form-container">
              <label :for="field.id" class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">{{ field.label
              }} :</label>
              <input :type="field.type" :id="field.id" v-model="formData[field.id]"
                :min="field.type === 'number' ? 0 : null" required
                class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
            </div>
          </div>

          <div class="flex tw-mt-4 tw-text-end">
            <v-spacer></v-spacer>
            <v-btn color="red" rounded class="tw-px-4 tw-py-2 tw-mr-4" @click="clearForm">Clear</v-btn>

            <v-btn color="green" rounded class="tw-px-4 tw-py-2" @click="submitForm">Submit</v-btn>
          </div>
        </form>

      </v-card-text>
    </v-card> -->


      <!-- <v-card-text class="p-6">
        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="flex flex-col">
            <label for="time" class="text-subtitle-1 text-medium-emphasis">Time:</label>
            <input type="datetime-local" id="time" v-model="formData.time" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex flex-col">
            <label for="metric" class="text-subtitle-1 text-medium-emphasis">Metric:</label>
            <input type="text" id="metric" v-model="formData.metric" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex flex-col">
            <label for="previous" class="text-subtitle-1 text-medium-emphasis">Previous:</label>
            <input type="number" id="previous" v-model.number="formData.previous" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex flex-col">
            <label for="current" class="text-subtitle-1 text-medium-emphasis">Current:</label>
            <input type="number" id="current" v-model.number="formData.current" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex flex-col">
            <label for="change" class="text-subtitle-1 text-medium-emphasis">Change:</label>
            <input type="number" id="change" step="0.01" v-model.number="formData.change" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex justify-between">
            <button type="submit"
              class="bg-blue-500 hover:bg-blue-600 tw-text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <button type="button"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </v-card-text> -->

            <!-- <label for="time" class="text-subtitle-1 text-medium-emphasis">Timestamp :</label>
            <input type="date" id="time" v-model="formData.timestamp" required
              class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">

            <label for="metric"
              class="text-subtitle-1 text-medium-emphasis">number_of_companies_in_onboarding_at_start_of_period :</label>
            <input type="text" id="metric" v-model="formData.metric" required
              class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300"> -->

<!-- POP UP CODE -->
<!-- <template>
  <v-sheet
    class="position-relative"
    min-height="450"
  >
    <div class="position-absolute d-flex align-center justify-center w-100 h-100">
      <v-btn
        size="x-large"
        color="deep-purple-darken-2"
        @click="dialog = !dialog"
      >
        Open Dialog
      </v-btn>
    </div>

    <v-fade-transition hide-on-leave>
      <v-card
        v-if="dialog"
        append-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="500"
        title="Send a receipt"
      >
        <template v-slot:append>
          <v-btn icon="$close" variant="text" @click="dialog = false"></v-btn>
        </template>

        <v-divider></v-divider>

        <div class="py-12 text-center">
          <v-icon
            class="mb-6"
            color="success"
            icon="mdi-check-circle-outline"
            size="128"
          ></v-icon>

          <div class="text-h4 font-weight-bold">This receipt was sent</div>
        </div>

        <v-divider></v-divider>

        <div class="pa-4 text-end">
          <v-btn
            class="text-none"
            color="medium-emphasis"
            min-width="92"
            rounded
            variant="outlined"
            @click="dialog = false"
          >
            Close
          </v-btn>
        </div>
      </v-card>
    </v-fade-transition>
  </v-sheet>
</template> -->

<!-- // example create data
const data = {
    "timestamp": "2022-01-01 10:00:00.123Z",
    "number_of_companies_in_onboarding_at_start_of_period": 123,
    "number_of_new_companies_received_in_period": 123,
    "number_of_companies_that_went_live_in_period": 123,
    "number_of_companies_remaining_in_onboarding_at_the_end_of_the_period": 123,
    "number_of_consultants": 123,
    "number_of_companies_live_per_consultant": 123
};

const record = await pb.collection('onboarding_data').create(data); -->



<!-- <template>
    <v-card class="mx-auto mt-12" elevation="8" max-width="448" rounded="lg">
      <v-card-title class="text-xl font-bold">Onboarding Data</v-card-title>
      <v-card-text class="p-6">
        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="flex flex-col">
            <label for="time" class="text-subtitle-1 text-medium-emphasis">Time:</label>
            <input type="datetime-local" id="time" v-model="formData.time" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex flex-col">
            <label for="metric" class="text-subtitle-1 text-medium-emphasis">Metric:</label>
            <input type="text" id="metric" v-model="formData.metric" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex flex-col">
            <label for="previous" class="text-subtitle-1 text-medium-emphasis">Previous:</label>
            <input type="number" id="previous" v-model.number="formData.previous" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex flex-col">
            <label for="current" class="text-subtitle-1 text-medium-emphasis">Current:</label>
            <input type="number" id="current" v-model.number="formData.current" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex flex-col">
            <label for="change" class="text-subtitle-1 text-medium-emphasis">Change:</label>
            <input type="number" id="change" step="0.01" v-model.number="formData.change" required
              class="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          </div>
          <div class="flex justify-between">
            <button type="submit"
              class="bg-blue-500 hover:bg-blue-600 tw-text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
            <button type="button"
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </template> -->
  


<!-- <template>
    <div>
      <h2>Onboarding Data Form</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="time">Time:</label>
          <input type="datetime-local" id="time" v-model="formData.time" required>
        </div>
        <div>
          <label for="metric">Metric:</label>
          <input type="text" id="metric" v-model="formData.metric" required>
        </div>
        <div>
          <label for="previous">Previous:</label>
          <input type="number" id="previous" v-model.number="formData.previous" required>
        </div>
        <div>
          <label for="current">Current:</label>
          <input type="number" id="current" v-model.number="formData.current" required>
        </div>
        <div>
          <label for="change">Change:</label>
          <input type="number" id="change" step="0.01" v-model.number="formData.change" required>
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" @click="clearForm">Clear</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const formData = ref({
    time: '',
    metric: '',
    previous: null,
    current: null,
    change: null
  });
  
  const submitForm = () => {
    // Implement your submit logic here
    console.log('Form submitted:', formData.value);
  };
  
  const clearForm = () => {
    // Clear the form data
    formData.value = {
      time: '',
      metric: '',
      previous: null,
      current: null,
      change: null
    };
  };
  </script> -->
  <!-- @/utils/colours -->