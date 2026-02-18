<template>
    <v-menu v-model="menu" :close-on-content-click="false">
        <template #activator="{ props }">
            <v-text-field
                v-bind="props"
                :model-value="formattedDates"
                :label="label"
                readonly
                density="compact"
                variant="outlined"
                max-width="300"
            />
        </template>
        <v-date-picker
            v-model="tempDates"
            multiple="range"
            elevation="24"
        >
            <template #actions>
                <v-btn
                    variant="text"
                    @click="clear"
                    :disabled="!tempDates?.length"
                >
                Clear
                </v-btn>

                <v-btn
                    variant="flat"
                    color="primary"
                    @click="apply"
                >
                    Apply
                </v-btn>
            </template>
        </v-date-picker>
    </v-menu>
</template>

<script>
export default {
    name: 'BaseDateRangePicker',
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        label:{
            type: String,
            default: 'Select Date'
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            menu: false,
            tempDates: [...this.modelValue]
        }
    },
    computed: {
        formattedDates() {
            if (!this.modelValue || this.modelValue.length < 2) return ''
            const [start, end] = this.modelValue
            return (new Date(start).toLocaleDateString('id-ID') +' - ' +new Date(end).toLocaleDateString('id-ID'))
        }
    },

    methods: {
        apply() {
            if (!Array.isArray(this.tempDates) || !this.tempDates.length) return

            const sorted = [...this.tempDates].sort(
                (a, b) => new Date(a) - new Date(b)
            )
            const start = sorted[0]
            const end = sorted[sorted.length - 1]
            this.$emit('update:modelValue', [this.$moment(start).format('YYYY-MM-DD'), this.$moment(end).format('YYYY-MM-DD')])
            const formatted = [
                this.$moment(start).format('YYYY-MM-DD'),
                this.$moment(end).format('YYYY-MM-DD')
            ]

            this.$emit('apply', formatted)
            this.menu = false
        },
        clear() {
            this.tempDates = []
            this.$emit('update:modelValue', [])
        }
    }
}
</script>
