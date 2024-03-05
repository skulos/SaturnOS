<template>
    <v-card class="tw-mx-8 tw-mt-10 tw-mb-14" elevation="4" rounded="lg">
        <v-card-title class="text-xl font-bold tw-mb-2">{{ metric }}</v-card-title>
        <v-card-text class="p-6">
            <form @submit.prevent="submitForm" class="space-y-4 grid grid-cols-2 gap-4">

                <div class="tw-mt-5">
                    <table class="tw-w-full">
                        <thead>
                            <tr>
                                <th class="tw-border tw-px-4 tw-py-2">Name</th>
                                <th class="tw-border tw-px-4 tw-py-2">Date</th>
                                <th class="tw-border tw-px-4 tw-py-2">Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(entry, index) in entries" :key="index">
                                <td class="tw-border tw-px-4 tw-py-2">{{ entry.name }}</td>
                                <td class="tw-border tw-px-4 tw-py-2">{{ entry.date }}</td>
                                <td class="tw-border tw-px-4 tw-py-2">{{ entry.number }}</td>
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
                    <div class="tw-flex tw-flex-col form-container">
                        <label for="nameInput" class="tw-text-subtitle-1 tw-text-medium-emphasis">Name:</label>
                        <input type="text" id="nameInput" v-model="name"
                            class="border tw-rounded-md tw-px-3 tw-py-2 focus:tw-outline-none focus:tw-ring focus:tw-border-blue-300">
                    </div>
                    
                    <div class="tw-flex tw-flex-col form-container">
                        <label for="numberInput" class="tw-text-subtitle-1 tw-text-medium-emphasis">Number:</label>
                        <input type="number" id="numberInput" v-model="number"
                            class="border tw-rounded-md tw-px-3 tw-py-2 focus:outline-none focus:ring focus:border-blue-300">
                    </div>

                    <div class="tw-flex tw-flex-col form-container">
                        <label for="dateInput" class="tw-text-subtitle-1 tw-text-medium-emphasis">Date:</label>
                        <input type="date" id="dateInput" v-model="date"
                            class="border tw-rounded-md tw-px-3 tw-py-2 focus:outline-none focus:ring focus:border-blue-300">
                    </div>

                    <div class="flex tw-mt-4 tw-text-end">
                        <v-btn color="red" rounded class="tw-px-4 tw-py-2 tw-mr-4" @click.prevent="clearEntries">Clear
                        Entries</v-btn>
                    <v-btn color="primary" rounded class="tw-px-4 tw-py-2" @click.prevent="addEntry">Add Entry</v-btn>
                </div>

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
export default {
    props: {
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
            },
            name: '',
            date: new Date().toISOString().slice(0, 10),
            number: 0,
            entries: []
        };
    },
    methods: {
        deleteEntry(index) {
            this.entries.splice(index, 1);
        },
        clearForm() {
            this.formData.timestamp = new Date().toISOString().slice(0, 10);
            this.name = '';
            this.date = '';
            this.number = '';
        },
        async submitForm() {
            // Process the form submission here
            console.log('Form submitted:', this.entries);

            // Clear the form after submission
            this.clearForm();
        },
        addEntry() {
            if (this.name.trim() !== '' && this.date.trim() !== '' && this.number !== '') {
                this.entries.push({
                    name: this.name.trim(),
                    date: this.date,
                    number: parseInt(this.number)
                });
                // Clear input fields after adding the entry
                this.name = '';
                this.date =  new Date().toISOString().slice(0, 10);
                this.number = 0;
            }
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