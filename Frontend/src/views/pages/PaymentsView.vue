<template>
    <v-container fluid class="fill-height tw-bg-gray-200">
        <h1 class="tw-text-center">Payments Page</h1>
    </v-container>
    <v-row>
        <v-col>
            <v-row>
                <v-col>
                    <v-card rounded height="170" class="tw-mt-4 tw-mb-4" elevation="6" color="#1f2937">
                        <v-card-title class="text-h5">Bills Unpaid</v-card-title>
                        <v-divider></v-divider>

                        <v-card-text class="tw-mt-4 tw-text-center">
                            <div class="tw-text-5xl">6</div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card rounded height="170" class="tw-mt-4 tw-mb-4" elevation="6" color="#1f2937">
                        <v-card-title class="text-h5">Total Bill Amount Due</v-card-title>
                        <v-divider></v-divider>

                        <v-card-text class="tw-mt-4 tw-text-center">
                            <div class="tw-text-5xl">R 1000.00</div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card rounded height="170" class="tw-mt-4 tw-mb-4" elevation="6" color="#1f2937">
                        <v-card-title class="text-h5">Expenses Loaded</v-card-title>
                        <v-divider></v-divider>

                        <v-card-text class="tw-mt-4 tw-text-center">
                            <div class="tw-text-5xl">6</div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card rounded height="170" class="tw-mt-4 tw-mb-4" elevation="6" color="#1f2937">
                        <v-card-title class="text-h5">Total Expenses Payable</v-card-title>
                        <v-divider></v-divider>

                        <v-card-text class="tw-text-center">
                            <div class="tw-mt-4 tw-text-5xl">R 1000.00</div>
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>
        </v-col>

        <v-col cols="2">
            <v-row>

                <!-- <v-col cols="12" class="tw-mt-6 text-center">
                    <v-btn elevation="6" width="250" height="50" color="#1f2937">Pay A Bill</v-btn>
                </v-col> -->

                <!-- <v-col cols="12" class="text-center">
                    <v-btn elevation="6" width="250" height="50" color="#1f2937">Pay Expense</v-btn>
                </v-col> -->

                <!-- Blue -->
                <!-- <v-col cols="12" class="tw-mt-6 text-center tw-text-black">
                    <v-btn elevation="6" width="250" height="50" color="#3C91E6" class="text-black">Pay A Bill</v-btn>
                </v-col> -->

                <v-col cols="12" class="tw-mt-6 text-center tw-text-black">
                    <v-btn elevation="6" width="250" height="50" color="#3A3E3B">Pay A Bill</v-btn>
                </v-col>
                
                <!-- Orange -->
                <!-- <v-col cols="12" class="text-center">
                    <v-btn elevation="6" width="250" height="50" color="#FA824C" class="text-black">Pay Expense</v-btn>
                </v-col> -->

                <!-- <v-col cols="12" class="text-center">
                    <v-btn elevation="6" width="250" height="50" color="#8A95A5" class="text-black">Pay Expense</v-btn>
                </v-col> -->

                <v-col cols="12" class="text-center">
                    <v-btn elevation="6" width="250" height="50" color="#820933">Pay Expense</v-btn>
                </v-col>

            </v-row>
        </v-col>

    </v-row>

    <data-table />

</template>


<script setup>
import DataTable from '@/components/table/PaymentsTable.vue';
</script>