<template>

    <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" :color=colours.MARKETING elevation="8" rounded="lg">
        <v-card-title class="text-h4 font-bold tw-mt-4">Marketing Metrics</v-card-title>
        <v-card-subtitle class="text-white tw-mb-2">
            Please fill in the details below
        </v-card-subtitle>
        <v-divider :thickness="2" color="black" style="background-color: black;" class="border-opacity-100"></v-divider>
        <v-spacer></v-spacer>

        <marketing-matrix-form :collection="MarketingBrandAwareness.collection" :metric="MarketingBrandAwareness.metric"
            :formDataFields="MarketingBrandAwareness.formDataFields" />

        <double-metrics-form :collection="MarketingTrafficGeneration.collection" :labels="MarketingTrafficGeneration.labels"
            :metric="MarketingTrafficGeneration.metric" :formDataFields="MarketingTrafficGeneration.formDataFields" />

        <double-metrics-form :collection="MarketingLeadGeneration.collection" :labels="MarketingLeadGeneration.labels"
            :metric="MarketingLeadGeneration.metric" :formDataFields="MarketingLeadGeneration.formDataFields" />

        <double-metrics-form :collection="MarketingThoughtLeadership.collection" :labels="MarketingThoughtLeadership.labels"
            :metric="MarketingThoughtLeadership.metric" :formDataFields="MarketingThoughtLeadership.formDataFields" />

    </v-card>
    
</template>


<script setup>
import colours from '@/utils/colours';
import DoubleMetricsForm from '@/components/DoubleMetricsForm.vue';

import MarketingMatrixForm from '@/components/MarketingMatrixForm.vue';
import MarketingBrandAwareness from '@/datafields/marketing/marketingBrandAwareness'
import MarketingTrafficGeneration from '@/datafields/marketing/marketingTrafficGeneration'
import MarketingLeadGeneration from '@/datafields/marketing/marketingLeadGeneration'
import MarketingThoughtLeadership from '@/datafields/marketing/marketingThroughLeadship'

</script>