<template>
    <v-card class="text-white tw-mt-12 tw-mx-20 tw-mb-12" color="gray" elevation="8" rounded="lg">
        <v-card-title class="text-black text-h4 font-bold tw-mt-4">History Page of {{ name }}</v-card-title>
        <v-card-subtitle class="text-black tw-mb-2">
            See historical entries here:
        </v-card-subtitle>
        <v-divider :thickness="2" color="black" style="background-color: black;" class="border-opacity-100"></v-divider>
        <v-spacer></v-spacer>
    </v-card>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
    },
};
</script>