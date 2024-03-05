<template>
    <div class="text-center pa-4">
        <v-dialog v-model="dialogValue" width="auto">
            <v-card max-width="600" title="Are you sure you want to submit?"
                text="Edit functionality will be put in eventually. Ping me if you make a mistake.">
                <template v-slot:actions>
                    <v-btn class="ms-auto" text="Ok" @click="dialogValue = false"></v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import http from '@/utils/axios';

export default {
    props: {
        collection: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
        },
        dialog: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    data() {
        return {
            dialogValue: this.dialog,
        };
    },
    methods: {
        async sendData() {
            await http.post('/submit', {
                collection: this.collection,
                data: this.data
            }).then(response => {
                // Handle successful response
                console.log(response.data);
            })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
        },
    }
}

</script>