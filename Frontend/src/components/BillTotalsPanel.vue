<template>
    <v-row>
        <v-col cols="12">
          Amount: R {{ this.amount }}
        </v-col>
        <v-col cols="12">
          VAT: R {{ this.vatAmount }}
        </v-col>
        <v-col cols="12">
          Total: R {{ this.totalAmount }}
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        amount: {
            type: Number,
            required: true
        },
        inclusive: {
            type: Boolean,
            required: true
        }
    },
    data: () => ({
        vatInclusive: this.inclusive,
        total: 0.00,
        vat: 0.00,
        // amount: 0.00
    }),
    computed: {
      vatAmount() {
        return  (this.amount * 0.15).toFixed(2)
      },
      totalAmount() {
        return (this.vatAmount + this.amount).toFixed(2)
      }
    },
    methods: {
      
    },
};
</script>

<!-- npm install vue-currency-input -->
<!-- <script setup lang="ts">
import { useCurrencyInput } from 'vue-currency-input';
import { watch } from 'vue';

const props = defineProps({ modelValue: Number });

const { inputRef, formattedValue, numberValue, setValue } = useCurrencyInput({
  currency: 'ZAR',
  hideCurrencySymbolOnFocus: false,
  hideGroupingSeparatorOnFocus: false,
  precision: 2,
  valueRange: { min: 0 },
});

watch(
  () => props.modelValue,
  (value) => {
    setValue(value);
  }
);
</script>

<template>
  <VTextField
    v-model="formattedValue"
    density="compact"
    variant="solo"
    ref="inputRef"
  >
  </VTextField>
</template> -->