<template>
    <v-data-table
        :headers="headers"
        :items="tableItems"
        item-key="month"
    >
        <template #item.omset_implants="{ value }">
            Rp {{ formatCurrency(value) }}
        </template>

        <template #item.omset_utama="{ value }">
            Rp {{ formatCurrency(value) }}
        </template>

        <template #item.commission_implants="{ value }">
            Rp {{ formatCurrency(value) }}
        </template>

        <template #item.commission_utama="{ value }">
            Rp {{ formatCurrency(value) }}
        </template>
    </v-data-table>
</template>

<script>
import { dashboardTableHeaders } from '../tables/table.config'
import { mapDashboardTableData } from '../tables/table.mapper'

export default {
    name: 'DashboardTable',
    props: {
            totalCnoteData: Object,
            totalOmsetData: Object,
            totalCommision: Object
    },
    computed: {
        headers() {
            return dashboardTableHeaders
        },
        tableItems() {
            return mapDashboardTableData({
                totalCnoteData: this.totalCnoteData,
                totalOmsetData: this.totalOmsetData,
                totalCommision: this.totalCommision
            })
        }
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID').format(value)
        }
    }
}
</script>
