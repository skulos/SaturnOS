<template>
    <v-container fluid class="fill-height tw-bg-gray-200">
        <h1>Dashboard Page</h1>
    </v-container>


    <DownloadComponent />

</template>

<style scoped>
.outlined-btn {
    border: 1px solid black !important;
    color: black !important;
}

.custom-divider {
    background-color: black;
}

.minidenticon-svg {
    height: 60px;
    width: 60px;
    margin-right: 10px;
}
</style>

<script>
import DownloadComponent from '@/components/download/DownloadComponent.vue';

import dashboard from '@/assets/dashboard.png';

// TODO https://router.vuejs.org/guide/advanced/meta.html
// TODO https://router.vuejs.org/guide/essentials/nested-routes.html

export default {
    data: () => ({
        tab: null,
        logoImage: dashboard,
    }),
    components: {
        DownloadComponent,
    },
    //     mounted() {
    //     // Reference the image
    //     const image = document.getElementById('image');
    //     // Apply CSS filter to invert colors
    //     image.style.filter = 'invert(100%)';
    //   }
}
</script>
