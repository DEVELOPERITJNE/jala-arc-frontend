<template>
    <v-container fluid>
        <v-row class="align-center">
            <v-col cols="12" md="6">
                <div class="text-center d-flex ga-4 flex-wrap">
                    <BaseDateRangePicker v-model="datepickers" />
                    <v-btn variant="tonal" @click="getBtn">Get</v-btn>
                    <v-btn variant="flat" color="success">
                        <v-icon class="px-5">mdi mdi-tray-arrow-down</v-icon>
                        Download
                    </v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-card width="400">
                    <v-card-title :style="gradientStyle" class="d-flex">
                        <v-icon class="px-5" color="warning">mdi mdi-crown</v-icon>
                        <span class="font-weight-black">Top Agent</span>
                        <v-icon class="ms-auto">mdi mdi-home-analytics</v-icon>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2>{{ topAgen('agen')?.nama_agen }}</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" width="400">
                    <v-card-title :style="gradientStyle" class="d-flex">
                        <v-icon class="px-5" color="warning">mdi mdi-crown</v-icon>
                        <span class="font-weight-black">Top Implant</span>
                        <v-icon class="ms-auto">mdi mdi-home-analytics</v-icon>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2>{{ topAgen('implant')?.nama_agen }}</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="ms-auto" width="400">
                    <v-card-title :style="gradientStyle" class="d-flex">
                        <v-icon class="px-5" color="warning">mdi mdi-crown</v-icon>
                        <span class="font-weight-black">Top Marketplace</span>
                        <v-icon class="ms-auto">mdi mdi-home-analytics</v-icon>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h4>{{ topAgen('mp')?.id_agen }}</h4>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <!-- <v-data-table :items="items" :headers="headers" item-key="id_agen"/> -->
                <v-card>
                    <v-card-title class="gradient-box" :style="gradientStyle2">
                        <h2>TOP 10 CASHLESS AGEN</h2>
                    </v-card-title>
                    <v-card-text class="px-0">
                        <v-data-table density="compact" :items="dtGetlist('agen')" :headers="headers" :loading="dtLoading" item-value="id_agen">
                            <template v-for="col in cols" :key="col.key" #[`item.${col.key}`]="{ value }">
                                {{ formatCell(value, col.type) }}
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title class="gradient-box" :style="gradientStyle2">
                        <h2>TOP 10 CASHLESS IMPLANT</h2>
                    </v-card-title>
                    <v-card-text class="px-0">
                        <v-data-table density="compact" :items="dtGetlist('implant')" :headers="headers" :loading="dtLoading" item-value="id_agen">
                            <template v-for="col in cols" :key="col.key" #[`item.${col.key}`]="{ value }">
                                {{ formatCell(value, col.type) }}
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title class="gradient-box" :style="gradientStyle2">
                        <h2>TOP 10 MARKETPLACE CONTRIBUTION</h2>
                    </v-card-title>
                    <v-card-text class="px-0">
                        <v-data-table density="compact" :items="dtGetlist('mp')" :headers="headers" :loading="dtLoading" item-value="id_agen">
                            <template v-for="col in cols" :key="col.key" #[`item.${col.key}`]="{ value }">
                                {{ formatCell(value, col.type) }}
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>

</style>

<script>
import { createColumn, buildHeaders, columnTypes } from '../tables/table.config';
import { TOP_TEN } from '../stores/actions/reqApi'
import { mapActions, mapGetters } from 'vuex';
import BaseDateRangePicker from '../components/BaseDateRangePicker.vue';

const cols = [
    createColumn({key: 'id_agen', title: 'ID Agen'}),
    createColumn({key: 'nama_agen', title: 'Nama Agen'}),
    createColumn({key: 'total_cnote', title: 'Total Connote', type:'number'}),
    createColumn({key: 'total_gross_omset', title: 'Total Omset', type: 'currency' }),
    createColumn({key: 'total_commission', title: 'Total Commision', type: 'currency'}),
]

// formatter
const formatCellBacod = (value, type) => {
    const formatter = columnTypes[type] || columnTypes.default
    return formatter.format(value)
}

export default { 
    name:'BaseTopTenView',
    components: {
        BaseDateRangePicker
    },
    data() { 
        return { 
            dtLoading: false,
            datepickers: [],
            dates: [],
            menu: {
                start: false,
                end: false
            },
            dateVal : {
                start: null,
                end: null,
            }
        }
    },
    computed: {
        formatCell() { 
            return formatCellBacod
        },
        cols() { 
            return cols
        },
        headers() {
            return buildHeaders(this.cols)
        },
        ...mapGetters({
            getTOP_TEN: 'datatop/'+TOP_TEN
        }),
    },
    methods: {
        getBtn(){
            console.log('date payload', this.datepickers);
        },
        dtGetlist(type){
            return (this.getTOP_TEN?.data ?? []).filter(i => i.cashless_type === type)
        },
        topAgen(type) {
            const data = this.getTOP_TEN?.data ?? []
            const f = data.filter(item => item.cashless_type === type)
            if (!f.length) return null
            return f.reduce((max, i) => i.total_cnote > max.total_cnote ? i : max)
        },
        ...mapActions({
            actTOP_TEN: 'datatop/'+TOP_TEN
        }),
    },
    async mounted() {
        try {
            this.dtLoading = true;
            await this.actTOP_TEN()
        } catch (error) {
            console.log('error ', error)
        } finally { 
            this.dtLoading = false;
        }
    },
    watch: {
        datepickers(val){
            console.log('dates ', val)
        }
    }
}
</script>