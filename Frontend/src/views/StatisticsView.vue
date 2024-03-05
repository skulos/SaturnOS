<template>
    <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" :style="{ backgroundColor: 'rgba(25, 47, 89, 0.8)' }" elevation="8" rounded="lg">
                <v-card-title class="text-h4 font-bold tw-mt-4">Statistics Test</v-card-title>
                <v-card-subtitle class="text-white tw-mb-2">
                    Please fill in the details below
                </v-card-subtitle>
                <v-divider :thickness="2" color="black" style="background-color: black;"
                    class="border-opacity-100"></v-divider>
                <v-spacer></v-spacer>

                <metrics-form :collection="MetricsTest.collection" :metric="MetricsTest.metric" :formDataFields="MetricsTest.formDataFields"/>

                <list-form :collection="ListTest.collection" :metric="ListTest.metric" :formDataFields="ListTest.formDataFields" />

                <double-metrics-form :collection="DoubleTest.collection" :metric="DoubleTest.metric" :formDataFields="DoubleTest.formDataFields" :labels="DoubleTest.labels"/>

                <marketing-matrix-form :collection="MatrixTest.collection" :metric="MatrixTest.metric" :formDataFields="MatrixTest.formDataFields" />

    </v-card>

</template>

<script setup>
import MetricsForm from '@/components/MetricsForm.vue';
import ListForm from '@/components/ListForm.vue';
import DoubleMetricsForm from '@/components/DoubleMetricsForm.vue';
import MarketingMatrixForm from '@/components/MarketingMatrixForm.vue';

import MetricsTest from '@/datafields/test/metricsTest';
import ListTest from '@/datafields/test/listTest';
import DoubleTest from '@/datafields/test/doubleTest'
import MatrixTest from '@/datafields/test/matrixTest'


</script>

  
