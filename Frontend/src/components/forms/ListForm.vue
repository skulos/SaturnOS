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

                <div class="tw-mt-5">
                    <table class="tw-w-full">
                        <thead>
                            <tr>
                                <th v-for="(field, index) in formDataFields" :key="index" class="tw-border tw-px-4 tw-py-2">
                                    {{ field.label }}</th>
                                <th class="tw-border tw-px-4 tw-py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, index) in entries" :key="index">
                                <td v-for="(field, index) in formDataFields" :key="index" class="tw-border tw-px-4 tw-py-2">
                                    {{ entry[field.id] }}</td>
                                <td class="tw-border tw-px-4 tw-py-2">
                                    <span @click="deleteEntry(index)" style="cursor: pointer; color: red;">
                                        <v-icon small>mdi-close</v-icon>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>

                <v-divider :thickness="2" color="black" style="background-color: black;"
                    class="custom-divider tw-mt-5 border-opacity-100"></v-divider>

                <div class="tw-mt-5 form-container">
                    <div v-for="(field, index) in formDataFields" :key="index" class="tw-flex tw-flex-col form-container">
                        <label :for="field.id" class="tw-text-subtitle-1 tw-text-medium-emphasis">{{ field.label }}:</label>
                        <input :type="field.type" :id="field.id" v-model="formData[field.id]"
                            :min="field.type === 'number' ? 0 : ''" required
                            class="border tw-rounded-md tw-px-3 tw-py-2 focus:outline-none focus:ring focus:border-blue-300">
                    </div>
                </div>

                <div class="flex tw-mt-4 tw-text-end">
                    <v-btn color="red" rounded class="tw-px-4 tw-py-2 tw-mr-4" @click.prevent="clearEntries">Clear
                        Entries</v-btn>
                    <v-btn color="primary" rounded class="tw-px-4 tw-py-2" @click.prevent="addEntry">Add Entry</v-btn>
                </div>

                <div class="flex tw-mt-10 tw-text-end">
                    <v-spacer></v-spacer>
                    <v-btn color="red" rounded class="tw-px-4 tw-py-2 tw-mr-4" @click="clearForm">Clear</v-btn>
                    <v-btn color="green" rounded class="tw-px-4 tw-py-2" @click="submitForm">Submit</v-btn>
                </div>
            </form>
        </v-card-text>
    </v-card>
</template>

<script>
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
        }
    },
    data() {
        return {
            // formData: Object.fromEntries(this.formDataFields.map(field => [field.id, field.value])),
            entries: [],
            formData: {
                timestamp: new Date().toISOString().slice(0, 10),
                ...Object.fromEntries(this.formDataFields.map(field => [field.id, field.value]))
            }
        };
    },
    methods: {
        clear() {
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
        deleteEntry(index) {
            this.entries.splice(index, 1);
        },
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
            this.entries = [];
        },
        async submitForm() {
            // TODO: Submit data
            // console.log('Form submitted:', this.entries);
            // console.log('Form data:', this.formData);

            const data = {
                "timestamp": this.formData.timestamp + ' 00:00:00.000Z',
                // ...Object.fromEntries(this.formDataFields.map(field => [field.id, this.formData[field.id]]))
                "data": this.entries
            };

            // console.log('Data')
            console.log(data)

            // console.log('Entries')
            // console.log(this.entries)

            await http.post('/submit', {
                collection: this.collection,
                // metric: this.metric,
                data: data
            }).then(response => {
                // Handle successful response
                console.log(response.data);
            })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });


            this.clearForm();
        },
        addEntry() {
            const entry = {};
            for (const field of this.formDataFields) {
                entry[field.id] = this.formData[field.id];
            }
            this.entries.push(entry);
            this.clear();
        },
        clearEntries() {
            this.entries = [];
        }
    }
};
</script>

<style scoped>
.custom-divider {
    background-color: black;
}

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


<!-- // import pb from '@/pocketbase/pocketbase';

// export default {
//     props: {
//         collection: {
//             type: String,
//             default: ''
//         },
//         metric: {
//             type: String,
//             default: ''
//         }
//     },
//     data() {
//         return {
//             name: '',
//             date: '',
//             number: '',
//             entries: []
//         };
//     },
//     methods: {
//         clearForm() {

//         },
//         async submitForm() {


//             this.clearForm();
//         },
//         addName() {
//             if (this.name.trim() !== '') {
//                 this.names.push(this.name.trim());
//                 this.name = '';
//             }
//         },
//         clearNames() {
//             this.names = [];
//         }
//     }
// }; -->