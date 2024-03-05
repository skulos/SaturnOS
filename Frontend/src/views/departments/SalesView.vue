<template>
    
        <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" :color=colours.SALES elevation="8" rounded="lg">
        <v-card-title class="text-h4 font-bold tw-mt-4">Sales Metrics</v-card-title>
        <v-card-subtitle class="text-white tw-mb-2">
            Please fill in the details below
        </v-card-subtitle>
        <v-divider :thickness="2" color="black" style="background-color: black;" class="border-opacity-100"></v-divider>
        <v-spacer></v-spacer>

        <metrics-form :collection="SalesData.collection" :metric="SalesData.metric" :formDataFields="SalesData.formDataFields" />
        <metrics-form :collection="LeadGenerationAndSales.collection" :metric="LeadGenerationAndSales.metric" :formDataFields="LeadGenerationAndSales.formDataFields" />

        <list-form :collection="SalesAgreements.collection" :metric="SalesAgreements.metric"
          :formDataFields="SalesAgreements.formDataFields"></list-form>

    </v-card>
    
</template>


<script setup>
import colours from '@/utils/colours';
import MetricsForm from '@/components/MetricsForm.vue';
import ListForm from '@/components/ListForm.vue';

//
import SalesData from '@/datafields/sales/salesData';
import LeadGenerationAndSales from '@/datafields/sales/leadGenerationAndSales';
import SalesAgreements from '@/datafields/sales/salesAgreements';

</script>