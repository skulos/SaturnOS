<template>
    <v-card class="tw-mx-8 tw-mt-10 tw-mb-14" elevation="4" rounded="lg">
        <v-card-title class="text-xl font-bold tw-mb-2">{{ metric }}</v-card-title>
        <v-card-text class="p-6">
            <form @submit.prevent="submitForm" class="space-y-4 grid grid-cols-6 gap-4">
                <div class="timestamp tw-col-span-6">
                    <label for="timestamp"
                        class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">Timestamp:</label>
                    <input type="date" id="timestamp" v-model="formData.timestamp" required
                        class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
                </div>

                <div class="tw-flex tw-flex-col form-container tw-col-span-3">
                    <!-- Add labels over each input here -->
                    <label class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis"></label>
                    <label v-for="label in labels" :key="label"
                        class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">{{ label }}</label>
                </div>

                <!-- <div v-for="(field, index) in formDataFields" :key="index" -->
                <div v-for="(field, index) in formData.fields" :key="index"
                    class="tw-flex tw-flex-col form-container tw-col-span-3">
                    <label :for="field.id" class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">{{
                        field.label }}:</label>
                    <!-- <input :type="field.type" :id="field.id" v-model="formData[field.id]" -->
                    <input :type="field.type" v-model="field.value"
                        :min="field.type === 'number' ? 0 : ''" step="0.01" required
                        class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
                    <input :type="field.type" v-model="field.second" :min="field.type === 'number' ? 0 : ''" step="0.01" required
                        class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
                </div>

                <div class="flex tw-col-span-6 tw-mt-8 tw-text-end">
                    <v-spacer></v-spacer>
                    <v-btn color="red" rounded class="tw-px-4 tw-py-2 tw-mr-4" @click="clearForm">Clear</v-btn>
                    <v-btn color="green" rounded class="tw-px-4 tw-py-2" @click="submitForm">Submit</v-btn>
                </div>
            </form>
        </v-card-text>
    </v-card>
</template>

  
<script>
// import pb from '@/pocketbase/pocketbase';
import http from '@/utils/axios';

export default {
    props: {
        formDataFields: {
            type: Array,
            required: true
        },
        collection: {
            type: String,
            default: ''
        },
        metric: {
            type: String,
            default: ''
        },
        labels: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            // entries: [],
            formData: {
                timestamp: new Date().toISOString().slice(0, 10),
                fields: this.formDataFields,
            },
        };
    },
    methods: {
        clearForm() {

            console.log(this.formData)

            Object.keys(this.formData.fields).forEach(key => {
                console.log(key)
                console.log(this.formData.fields[key])

                if (this.formData.fields[key].type === 'string') {
                    this.formData.fields[key].value = '';
                    this.formData.fields[key].second = '';
                } else if (this.formData.fields[key].type === 'number') {
                    this.formData.fields[key].value = 0;
                    this.formData.fields[key].second = 0;
                }
            });

            this.formData.timestamp = new Date().toISOString().slice(0, 10);

        },
        async submitForm() {

            const data = {
                timestamp: this.formData.timestamp,
                ...Object.fromEntries(this.formData.fields.map(field => [field.id, { first: field.value, second: field.second }])),
            }

            console.log(data)

            await http.post('/submit', {
                collection: this.collection,
                data: data
            }).then(response => {
                // Handle successful response
                console.log(response.data);
            })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });

            this.clearForm();
        }
    }
};
</script>

<style scoped>
.timestamp {
    display: grid;
    grid-template-columns: max-content 1fr;
    /* grid-template-columns: 1fr 1fr; */
    gap: 16px;
    /* Adjust the gap between label and input field */
}

.timestamp label {
    display: flex;
    align-items: center;
}

.form-container {
    display: grid;
    /* grid-template-columns: max-content 1fr; */
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    /* Adjust the gap between label and input field */
}

.form-container label {
    /* margin-bottom: 0.5rem; */
    display: flex;
    align-items: center;
    /* margin-right: 10px; */
    margin-top: 16px;
}

label {
    text-align: left;
}

.form-container input {
    width: 100%;
    margin-top: 16px;
    padding: 10px;
}
</style>
  