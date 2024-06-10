<template>
    <div class="delta-container" :class="{ 'delta-up': isPositive, 'delta-down': !isPositive }">
        <div class="triangle" :class="triangleClass"></div>
        <span class="delta-text" :class="textClass">{{ number }}</span>
    </div>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            required: true
        }
    },
    computed: {
        isPositive() {
            return this.number >= 0;
        },
        triangleClass() {
            return this.isPositive ? 'triangle-up' : 'triangle-down';
        },
        textClass() {
            return this.isPositive ? 'text-green' : 'text-red';
        }
    }
};
</script>

<style scoped>
.delta-container {
    display: flex;
    align-items: center;
}

.triangle {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
}

.triangle-up {
    border-bottom: 10px solid green;
}

.triangle-down {
    border-top: 10px solid red;
}

.text-green {
    color: green;
    margin-left: 5px;
}

.text-red {
    color: red;
    margin-left: 5px;
}
</style>
