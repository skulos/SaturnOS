<template>
    <!-- <v-tabs fixed-tabs v-model="tab" align-tabs="center">
        <v-tab value="metrics">Metrics</v-tab>
        <v-tab value="history">History</v-tab>
    </v-tabs>

    <v-window v-model="tab">
        <v-window-item value="history">
            <history-view name="Billing & Revenue"></history-view>
        </v-window-item> -->

        <!-- <v-window-item value="metrics"> -->
            <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" :color=colours.BILLINGREVENUE elevation="8" rounded="lg">
                <v-card-title class="text-h4 font-bold tw-mt-4">Billing & Revenue Metrics</v-card-title>
                <v-card-subtitle class="text-white tw-mb-2">
                    Please fill in the details below
                </v-card-subtitle>
                <v-divider :thickness="2" color="black" style="background-color: black;"
                    class="border-opacity-100"></v-divider>
                <v-spacer></v-spacer>

                <!-- <metrics-form :collection="OnboardingTaskDays.collection" :metric="OnboardingTaskDays.metric" :formDataFields="OnboardingTaskDays.formDataFields" /> -->

                <!-- <list-form :collection="OnboardingCompaniesLive.collection" :metric="OnboardingCompaniesLive.metric" :formDataFields="OnboardingCompaniesLive.formDataFields" ></list-form> -->
                <metrics-form :collection="RevenueCollection.collection" :metric="RevenueCollection.metric" :formDataFields="RevenueCollection.formDataFields" />

                <metrics-form :collection="RevenueBillingLineItem.collection" :metric="RevenueBillingLineItem.metric" :formDataFields="RevenueBillingLineItem.formDataFields" />

            </v-card>
        <!-- </v-window-item>
    </v-window> -->
</template>


<script setup>
// import { ref } from 'vue';
import colours from '@/utils/colours';
import MetricsForm from '@/components/MetricsForm.vue';
import RevenueCollection from '@/datafields/billingrevenue/revenueCollection'
import RevenueBillingLineItem from '@/datafields/billingrevenue/revenueBillingLineItems'

</script>