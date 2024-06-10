<template>
    <money3 v-model.number="curreny" v-bind="config"></money3>
</template>

<script>
import { Money3Component } from 'v-money3'

export default {
    components: { money3: Money3Component },
    props: {
        amount: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            curreny: this.amount,
            config: {
                masked: false,
                prefix: 'R ',
                suffix: '',
                thousands: ' ',
                decimal: '.',
                precision: 2,
                disableNegative: true,
                disabled: true,
                min: null,
                max: null,
                allowBlank: false,
                minimumNumberOfCharacters: 0,
                shouldRound: true,
                focusOnRight: false,
            }
        }
    }
}
</script>