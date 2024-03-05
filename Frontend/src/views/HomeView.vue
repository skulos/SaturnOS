<template>
    <v-container fluid class="fill-height tw-bg-gray-200">
        <h1>Home Page</h1>
    </v-container>
    
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
    /* border-radius: 100%; */
    height: 60px;
    width: 60px;
    margin-right: 10px;
}
</style>
  
<script>

// import Appbar from '@/components/ApplicationBar.vue';

// TODO https://router.vuejs.org/guide/advanced/meta.html
// TODO https://router.vuejs.org/guide/essentials/nested-routes.html

export default {
    data: () => ({
        tab: null,
    }),
}
</script>

<!-- .non-selectable {
    -webkit-user-select: none;
    /* Safari, Chrome, Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer, Edge */
    -o-user-select: none;
    /* Opera */
    user-select: none;
    /* Standard syntax */
} -->