<template>
    <v-container fluid>
        <v-row class="align-center">
            <!-- dua datepicker -->
            <!-- <v-col cols="12" md="3">
                <div class="text-center d-flex ga-5 py-5">
                    <v-menu v-model="menu.start" :close-on-content-click="false">
                        <template #activator="{props}">
                            <v-text-field v-bind="props" v-model="formattedDateS" label="Start Date" readonly />
                        </template>

                        <v-date-picker v-model="dateVal.start" @update:model-value="menu.start = false" />
                    </v-menu>
                </div>
            </v-col>
            <v-col cols="12" md="3">
                <div class="text-center d-flex ga-5 py-5">
                    <v-menu v-model="menu.end" :close-on-content-click="false">
                        <template #activator="{props}">
                            <v-text-field v-bind="props" v-model="formattedDateE" label="End Date" readonly />
                        </template>

                        <v-date-picker v-model="dateVal.end" @update:model-value="menu.end = false" />
                    </v-menu>
                </div>
            </v-col> -->

            <!-- 1 datepicker range -->
            <v-col cols="12" md="6">
                <div class="text-center d-flex ga-4 flex-wrap">
                    <v-menu v-model="datepickers" :close-on-content-click="false">
                        <template #activator="{props}">
                            <v-text-field variant="outlined" v-bind="props" v-model="formattedDates" label="Select Dates" readonly density="compact" max-width="300" />
                        </template>
                        <v-date-picker v-model="tempDates" multiple="range" elevation="24">>
                            <template #actions>
                                <v-btn variant="text" @click="onCancel" :disabled="!tempDates?.length">Clear</v-btn>
                                <v-btn variant="flat" color="primary" @click="onApply">
                                    Apply
                                </v-btn>
                            </template>
                        </v-date-picker>
                    </v-menu>
                    <v-btn variant="tonal">Get</v-btn>
                    <v-btn variant="flat" color="success">Download</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-card width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Top Agent</span>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2>{{ topAgen('agen')?.nama_agen }}</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Top Implant</span>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2>{{ topAgen('implant')?.nama_agen }}</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="ms-auto" width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Top Marketplace</span>
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
    data() { 
        return { 
            dtLoading: false,
            datepickers: false,
            tempDates: [],
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
        formattedDates(){
            if (!this.dates || this.dates.length < 2) return ;
            const [start,end] = this.dates
            return (
                new Date(start).toLocaleDateString('id-ID')+'-'+new Date(end).toLocaleDateString('id-ID')
            )
        },
        formattedDateS() { 
            if(!this.dateVal.start) return '';
            return new Date(this.dateVal.start).toLocaleDateString('id-ID')
        },
        formattedDateE() { 
            if(!this.dateVal.end) return '';
            return new Date(this.dateVal.end).toLocaleDateString('id-ID')
        }
    },
    methods: {
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
        onApply() {
            if (!this.tempDates?.length) return
            if (this.tempDates.length === 1) {
                this.dates = [this.tempDates[0], this.tempDates[0]]
            } else {
                this.dates = this.tempDates
            }

            this.datepickers = false
        },
        onCancel() {
            this.tempDates = []
            this.dates = []
        }
    },
    async mounted() {
        try {
            this.dtLoading = true;
            await this.actTOP_TEN()
            console.log('data nya ', this.getTOP_TEN?.data)
            console.log('buatan gua coba ', this.dtGetlist('mp'))
        } catch (error) {
            console.log('error ', error)
        } finally { 
            this.dtLoading = false;
        }
    },
    watch: {

    }
}
</script>