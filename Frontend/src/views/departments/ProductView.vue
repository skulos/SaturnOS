<template>
    <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" :color=colours.PRODUCT elevation="8" rounded="lg">
        <v-card-title class="text-h4 font-bold tw-mt-4">Product Metrics</v-card-title>
        <v-card-subtitle class="text-white tw-mb-2">
            Please fill in the details below
        </v-card-subtitle>
        <v-divider :thickness="2" color="black" style="background-color: black;" class="border-opacity-100"></v-divider>

        <v-spacer></v-spacer>

        <double-metrics-form :labels="BugFixesAndFeatures.labels" :collection="BugFixesAndFeatures.collection" :metric="BugFixesAndFeatures.metric"
            :formDataFields="BugFixesAndFeatures.formDataFields" />

        <metrics-form :collection="BacklogAgeData.collection" :metric="BacklogAgeData.metric"
            :formDataFields="BacklogAgeData.formDataFields" />

        <list-form :collection="ProductTopCustomers.collection" :metric="ProductTopCustomers.metric"
            :formDataFields="ProductTopCustomers.formDataFields" />

        <metrics-form :collection="ProductActivitarLoadTime.collection" :metric="ProductActivitarLoadTime.metric"
            :formDataFields="ProductActivitarLoadTime.formDataFields" />

        <metrics-form :collection="ProductActivitarErrorRate.collection" :metric="ProductActivitarErrorRate.metric"
            :formDataFields="ProductActivitarErrorRate.formDataFields" />

        <metrics-form :collection="ProductActivitarConversionMetrics.collection"
            :metric="ProductActivitarConversionMetrics.metric"
            :formDataFields="ProductActivitarConversionMetrics.formDataFields" />

        <metrics-form :collection="ProductActivitarOperationalMetrics.collection"
            :metric="ProductActivitarOperationalMetrics.metric"
            :formDataFields="ProductActivitarOperationalMetrics.formDataFields" />

        <metrics-form :collection="ProductActivitarConversionRates.collection"
            :metric="ProductActivitarConversionRates.metric"
            :formDataFields="ProductActivitarConversionRates.formDataFields" />

        <metrics-form :collection="ProductActivitarFailureRate.collection" :metric="ProductActivitarFailureRate.metric"
            :formDataFields="ProductActivitarFailureRate.formDataFields" />

    </v-card>
</template>


<script setup>
import colours from '@/utils/colours';
import MetricsForm from '@/components/MetricsForm.vue';
import ListForm from '@/components/ListForm.vue';
import DoubleMetricsForm from '@/components/DoubleMetricsForm.vue';

import BugFixesAndFeatures from '@/datafields/product/bugFixesAndFeatures';
import BacklogAgeData from '@/datafields/product/backlogAge';
import ProductTopCustomers from '@/datafields/product/productTopCustomers';
import ProductActivitarLoadTime from '@/datafields/product/productActivitarLoadtime';
import ProductActivitarErrorRate from '@/datafields/product/productActivitarErrorRate';
import ProductActivitarConversionMetrics from '@/datafields/product/productActivitarConversionMetrics';
import ProductActivitarOperationalMetrics from '@/datafields/product/productActivitarOperationalMetrics';
import ProductActivitarConversionRates from '@/datafields/product/productConversionRates';
import ProductActivitarFailureRate from '@/datafields/product/productFailureRates';


</script>