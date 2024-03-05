<template>
    <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" :color=colours.DISTRIBUTION elevation="8" rounded="lg">
        <v-card-title class="text-h4 font-bold tw-mt-4">Distribution Metrics</v-card-title>
        <v-card-subtitle class="text-white tw-mb-2">
            Please fill in the details below
        </v-card-subtitle>
        <v-divider :thickness="2" color="black" style="background-color: black;" class="border-opacity-100"></v-divider>
        <v-spacer></v-spacer>

        <metrics-form :labels="OTA.labels" :collection="OTA.collection" :metric="OTA.metric"
            :formDataFields="OTA.formDataFields" />

        <metrics-form :labels="SENDistribution.labels" :collection="SENDistribution.collection"
            :metric="SENDistribution.metric" :formDataFields="SENDistribution.formDataFields" />

        <metrics-form :collection="SENParticipation.collection" :metric="SENParticipation.metric"
            :formDataFields="SENParticipation.formDataFields" />

    </v-card>
</template>


<script setup>
import colours from '@/utils/colours';
import MetricsForm from '@/components/MetricsForm.vue';

import OTA from '@/datafields/distribution/distribution_ota'
import SENDistribution from '@/datafields/distribution/distribution_sen_distribution'
import SENParticipation from '@/datafields/distribution/distribution_sen_participation'

</script>