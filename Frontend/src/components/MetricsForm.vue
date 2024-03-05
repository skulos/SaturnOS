<template>
    <v-card class="tw-mx-8 tw-mt-10 tw-mb-14" elevation="4" rounded="lg">
        <v-card-title class="text-xl font-bold tw-mb-2">{{ metric }}</v-card-title>
        <v-card-text class="p-6">
            <form @submit.prevent="submitForm" class="space-y-4 grid grid-cols-2 gap-4">
                <div class="timestamp tw-col-span-2">
                    <label for="timestamp" class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">Timestamp
                        :</label>
                    <input type="date" id="timestamp" v-model="formData.timestamp" required
                        class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
                </div>

                <div class="tw-mt-5 form-container">
                    <div v-for="(field, index) in formDataFields" :key="index" class="tw-flex tw-flex-col form-container">
                        <label :for="field.id" class="tw-flex tw-flex-row tw-text-subtitle-1 tw-text-medium-emphasis">{{
                            field.label }} :</label>
                        <input :type="field.type" :id="field.id" v-model="formData[field.id]"
                            :min="field.type === 'number' ? 0 : ''" step="0.01" required
                            class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
                        <!-- <input :type="field.type === 'time' ? 'text' : field.type" :id="field.id" v-model="formData[field.id]"
                            :min="field.type === 'number' ? 0 : ''" step="0.01" required
                            class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300"> -->
                    </div>
                </div>

                <div class="flex tw-mt-8 tw-text-end">
                    <v-spacer></v-spacer>
                    <v-btn color="red" rounded class="tw-px-4 tw-py-2 tw-mr-4" @click="clearForm">Clear</v-btn>
                    <v-btn color="green" rounded class="tw-px-4 tw-py-2" @click="submitForm">Submit</v-btn>
                </div>
            </form>
        </v-card-text>

        <!-- <SubmitModal :collection="this.collection" :data="dataFields" :dialog="this.dialog" /> -->
    </v-card>
</template>

<script>
// import pb from '@/pocketbase/pocketbase';
// import axios from 'axios';
import http from '@/utils/axios';
// import SubmitModal from './SubmitModal.vue';

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
        }
    },
    data() {
        return {
            formData: {
                timestamp: new Date().toISOString().slice(0, 10),
                ...Object.fromEntries(this.formDataFields.map(field => [field.id, field.value]))
            },
            dialog: false
        };
    },
    computed: {
        dataFields: function () {
            return {
                "timestamp": this.formData.timestamp + ' 00:00:00.000Z',
                ...Object.fromEntries(this.formDataFields.map(field => [field.id, this.formData[field.id]]))
            };
        },
    },
    methods: {
        clearForm() {

            Object.keys(this.formData).forEach(key => {

                if (this.formDataFields.find(field => field.id === key)) {
                    const fieldType = this.formDataFields.find(field => field.id === key).type;
                    if (fieldType === 'number') {
                        this.formData[key] = 0;
                    } else if (fieldType === 'string') {
                        this.formData[key] = '';
                    }
                } else {
                    this.formData[key] = '';
                }

            });
            this.formData.timestamp = new Date().toISOString().slice(0, 10);
        },
        async submitForm() {
            // console.log('Form submitted:', this.formData);

            const data = {
                "timestamp": this.formData.timestamp + ' 00:00:00.000Z',
                ...Object.fromEntries(this.formDataFields.map(field => [field.id, this.formData[field.id]]))
            };

            console.log(data);

            // const record = await pb.collection(this.collection).create(data);
            // console.log(record);

            // Send the form data to the server
            // await axios.post('/submit', {




            await http.post('/submit', {
                collection: this.collection,
                // metric: this.metric,
                data: data
            }).then(response => {
                // Handle successful response
                console.log(response.data);
            })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });

            this.dialog = true;


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
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    /* Adjust the gap between label and input field */
}

.form-container label {
    /* margin-bottom: 0.5rem; */
    display: flex;
    align-items: center;
    /* margin-right: 10px; */
}

label {
    text-align: left;
}

.form-container input {
    width: 100%;
    /* Inputs take up full width */
}
</style>
  