<template>
    <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" :color=colours.SUPPORT elevation="8" rounded="lg">
        <v-card-title class="text-h4 font-bold tw-mt-4">Support Metrics</v-card-title>
        <v-card-subtitle class="text-white tw-mb-2">
            Please fill in the details below
        </v-card-subtitle>
        <v-divider :thickness="2" color="black" style="background-color: black;" class="border-opacity-100"></v-divider>
        <v-spacer></v-spacer>


        <metrics-form :collection="SupportEffectiveness.collection" :metric="SupportEffectiveness.metric"
            :formDataFields="SupportEffectiveness.formDataFields" />

        <metrics-form :collection="SupportNumberOfTickets.collection" :metric="SupportNumberOfTickets.metric"
            :formDataFields="SupportNumberOfTickets.formDataFields" />

        <metrics-form :collection="SupportCustomerSatisfaction.collection" :metric="SupportCustomerSatisfaction.metric"
            :formDataFields="SupportCustomerSatisfaction.formDataFields" />

        <list-form :collection="SupportCustomerNeediness.collection" :metric="SupportCustomerNeediness.metric"
            :formDataFields="SupportCustomerNeediness.formDataFields" />

        <list-form :collection="SupportFunctionalAreasInDepth.collection" :metric="SupportFunctionalAreasInDepth.metric"
            :formDataFields="SupportFunctionalAreasInDepth.formDataFields" />

        <list-form :collection="SupportFunctionalAreasMedium.collection" :metric="SupportFunctionalAreasMedium.metric"
            :formDataFields="SupportFunctionalAreasMedium.formDataFields" />

        <list-form :collection="SupportFunctionalAreasEffort.collection" :metric="SupportFunctionalAreasEffort.metric"
            :formDataFields="SupportFunctionalAreasEffort.formDataFields" />

        <list-form :collection="SupportFunctionalAreasBasic.collection" :metric="SupportFunctionalAreasBasic.metric"
            :formDataFields="SupportFunctionalAreasBasic.formDataFields" />

    </v-card>
</template>


<script setup>
import colours from '@/utils/colours';
import MetricsForm from '@/components/MetricsForm.vue';
import ListForm from '@/components/ListForm.vue';

//
import SupportEffectiveness from '@/datafields/support/supportEffectiveness'
import SupportNumberOfTickets from '@/datafields/support/supportNumberOfTickets';
import SupportCustomerNeediness from '@/datafields/support/supportCustomerNeediness';
import SupportCustomerSatisfaction from '@/datafields/support/supportCustomerSatisfaction';
import SupportFunctionalAreasMedium from '@/datafields/support/supportMedium';
import SupportFunctionalAreasBasic from '@/datafields/support/supportBasic';
import SupportFunctionalAreasEffort from '@/datafields/support/supportEffort';
import SupportFunctionalAreasInDepth from '@/datafields/support/supportInDepth';


</script>