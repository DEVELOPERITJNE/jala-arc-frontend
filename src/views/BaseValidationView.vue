<template>
    <v-container fluid>
        <v-sheet elevation="0">
            <v-tabs v-model="validationtab" color="primary" slider-color="teal-darken-2" class="mb-3">
                <v-tab value="recondata">Reconciliation Data</v-tab>
                <v-tab value="import_recon">Import Reconciliation</v-tab>
            </v-tabs>
            <v-divider class="mb-3"></v-divider>
            <v-tabs-window v-model="validationtab">
                <v-tabs-window-item value="recondata">
                    <v-row>
                        <v-col cols="12" md="12">
                            <div class="text-center d-flex ga-4 flex-wrap">
                                <BaseDateRangePicker v-model="dpValidation" />
                                <v-btn variant="tonal">Get</v-btn>
                                <v-btn variant="flat" color="success">
                                    <v-icon class="px-5">mdi mdi-tray-arrow-up</v-icon>
                                    Upload
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-card elevation="0">
                                <v-card-title class="px-0">
                                    <div class="d-flex justify-space-between">
                                        <v-text-field
                                            v-model="dtSearch"
                                            label="Search"
                                            prepend-inner-icon="mdi-magnify"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            clearable
                                            max-width="300"
                                        >
                                        </v-text-field>
                                        <div class="d-flex ga-3">
                                            <v-btn color="success">Approved</v-btn>
                                            <v-btn color="danger">Rejected</v-btn>
                                            <v-btn color="success">Complete</v-btn>
                                        </div>
                                    </div>
                                </v-card-title>
                                <v-card-text class="px-0">
                                    <v-data-table density="compact" :items="filteredItems" :headers="headersDT" item-key="id" class="_custom_sticky_table">
                                        <template v-for="col in reconDT" :key="col.key" #[`item.${col.key}`]="{ item, value, index }">
                                            <span v-if="col.type === 'index'">{{ index + 1 }}</span>
                                            <span v-else-if="col.key !== 'action'">
                                                {{ formatCell(value, col.type) }}
                                            </span>
                                            <div class="d-flex ga-2 align-center" v-else>
                                                <v-btn variant="tonal" class="my-1" color="success" @click="handleEdit(item)"><v-icon>mdi mdi-square-edit-outline</v-icon></v-btn>
                                            </div>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-sheet>
    </v-container>
</template>

<style>

</style>

<script>

import { createColumn, buildHeaders, columnTypes } from '../tables/table.config';
import { mapActions, mapGetters } from 'vuex';
import { VALIDATION_RECON_GETLIST } from '../stores/actions/reqApi'
import BaseDateRangePicker from '../components/BaseDateRangePicker.vue'

const reconGetHeader = [
    createColumn({key: 'index', title: 'No', type: 'index'}),
    createColumn({key: 'awb', title: 'AWB'}),
    createColumn({key: 'id_agen', title: 'ID Agen'}),
    createColumn({key: 'nama_agen', title: 'Nama Agen'}),
    createColumn({key: 'recon_date', title: 'Recon Date'}),
    createColumn({key: 'service', title: 'Service' }),
    createColumn({key: 'destination', title: 'Destination'}),
    createColumn({key: 'weight', title: 'Weight' }),
    createColumn({key: 'commision', title: 'Commission', type:'number'}),
    createColumn({key: 'action', title: 'Action'})
]

const formatCellBacod = (value, type) => {
    const formatter = columnTypes[type] || columnTypes.default
    return formatter.format(value)
}

export default {
    name:'BaseValidationView',
    components: {
        BaseDateRangePicker,
    },
    data() {
        return { 
            dtSearch: null,
            dpValidation:[] ,
            validationtab: 'recondata',
        }
    },
    computed: {
        ...mapGetters({
            getVALIDATION_RECON_GETLIST: 'financepanel/'+VALIDATION_RECON_GETLIST
        }),
        formatCell() { 
            return formatCellBacod
        },
        reconDT(){
            return reconGetHeader
        },
        headersDT() {
            return buildHeaders(this.reconDT)
        },
        filteredItems() {
            const items = this.recon_dt_getlist()
            if (!this.dtSearch) return items
            const keyword = this.dtSearch.toLowerCase()
            return items.filter(row =>
                this.reconDT.some(col => {
                    const value = row[col.key]
                    return value?.toString().toLowerCase().includes(keyword)
                })
            )
        }
    },
    methods: {
        ...mapActions({
            actVALIDATION_RECON_GETLIST: 'financepanel/'+VALIDATION_RECON_GETLIST
        }),
        recon_dt_getlist(){
            return this.getVALIDATION_RECON_GETLIST?.data ?? []
        }
    },
    async mounted(){
        try {
            await this.actVALIDATION_RECON_GETLIST()
        } catch (error) {
            console.error('error ', error)
        }
    },
    watch:{
        async validationtab(val){
            if(val === 'recondata'){
                try {
                    await this.actVALIDATION_RECON_GETLIST()
                } catch (error) {
                    console.error('error ', error)
                }
            } else { 
                console.log('bacod')
            }
        }
    }
}
</script>