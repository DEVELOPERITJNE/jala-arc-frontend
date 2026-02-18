<template>
    <v-container fluid>
        <v-sheet elevation="0">
            <v-tabs v-model="datamanagementtab" color="primary" slider-color="teal-darken-2" class="mb-3">
                <v-tab value="cashless">Cashless</v-tab>
                <v-tab value="claim">Hutang / Claim</v-tab>
            </v-tabs>
            <v-divider class="mb-3"></v-divider>
            <v-tabs-window v-model="datamanagementtab">
                <v-tabs-window-item value="cashless">
                    <v-row>
                        <v-col cols="12" md="6">
                            <div class="text-center d-flex ga-4 flex-wrap">
                                <BaseDateRangePicker v-model="dpCashless" />
                                <v-btn variant="tonal">Get</v-btn>
                                <v-btn variant="flat" color="success" @click="cashlessDialog = true">
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
                                </v-card-title>
                                <v-card-text class="px-0">
                                    <v-data-table density="compact" :items="filteredItems" :headers="headersDT" item-key="id">
                                        <template v-for="col in dataManagementDT" :key="col.key" #[`item.${col.key}`]="{ item, value, index }">
                                            <span v-if="col.type === 'index'">{{ index + 1 }}</span>
                                            <span v-else-if="col.key !== 'action'">
                                                {{ formatCell(value, col.type) }}
                                            </span>
                                            <div class="d-flex ga-2 align-center" v-else>
                                                <v-btn variant="tonal" class="my-1" color="danger" @click="handleDelete(item)"><v-icon>mdi mdi-delete</v-icon></v-btn>
                                                <v-btn variant="tonal" class="my-1" color="success" @click="handleEdit(item)"><v-icon>mdi mdi-square-edit-outline</v-icon></v-btn>
                                            </div>
                                        </template>
                                    </v-data-table>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tabs-window-item>
                <v-tabs-window-item value="claim">
                    <v-row>
                        <v-col cols="12" md="6">
                            <div class="text-center d-flex ga-4 flex-wrap">
                                <BaseDateRangePicker v-model="dpClaim" />
                                <v-btn variant="tonal">Get</v-btn>
                                <v-btn variant="flat" color="success" @click="uplDialogClaim = true">
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
                                </v-card-title>
                                <v-card-text class="px-0">
                                    <v-data-table density="compact" :items="filteredItems" :headers="headersDT" item-key="id">
                                        <template v-for="col in dataManagementDT" :key="col.key" #[`item.${col.key}`]="{ item, value, index }">
                                            <span v-if="col.type === 'index'">{{ index + 1 }}</span>
                                            <span v-else-if="col.key !== 'action'">
                                                {{ formatCell(value, col.type) }}
                                            </span>
                                            <div class="d-flex ga-2 align-center" v-else>
                                                <v-btn variant="tonal" class="my-1" color="danger" @click="handleDelete(item)"><v-icon>mdi mdi-delete</v-icon></v-btn>
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
        
        <v-dialog v-model="dtEditDialog" max-width="500">
            <v-card>
                <v-card-title>{{ dtEditData.id }}</v-card-title>

                <v-card-text v-if="dtEditData">
                    <v-text-field label="User" v-model="dtEditData.user" readonly variant="outlined" />
                    <v-text-field label="Periode" v-model="dtEditData.periode" readonly variant="outlined" />
                    <v-text-field label="Upload Date" v-model="dtEditData.date_upload" readonly variant="outlined" />
                    <v-text-field label="Core File" v-model="dtEditData.core_file" readonly variant="outlined" />
                    <v-text-field label="Apex File" v-model="dtEditData.apex_file" readonly variant="outlined" />
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dtDelDialog" max-width="600" persistent>
            <v-card>
                <v-card-text v-if="dtDelData">
                    <div class="text-center">
                        <h3>{{ dtDelData.core_file }}</h3>
                        Are You sure to delete this data ?
                    </div>
                </v-card-text>
                <template v-slot:actions>
                    <v-btn variant="tonal" @click="handleDialogBtn('N')">no</v-btn>
                    <v-btn variant="tonal" color="danger" @click="handleDialogBtn('Y')">Yes</v-btn>
                </template>
            </v-card>
        </v-dialog>

        <v-dialog v-model="cashlessDialog" max-width="600" persistent>
            <v-card>
                <v-card-title class="bg-arcPurple">
                    <div class="d-flex justify-space-between">
                        <h3>Upload</h3>
                        <v-btn @click="cashlessDialog = false" variant="tonal"><v-icon>mdi mdi-close</v-icon></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <h3 class="my-3 text-arcPurple">Periode</h3>
                    <BaseDateRangePicker v-model="cashlessDialogDatePicker" :label="'Select Periode'"/>
                    <div class="d-flex flex-wrap justify-space-between mb-3 align-center">
                        <h3 class="text-arcPurple">Core File</h3>
                        <v-btn variant="tonal" color="success"><v-icon color="success" class="px-5">mdi mdi-microsoft-excel</v-icon>Template</v-btn>
                    </div>
                    <v-file-upload v-model="fileClaimsCore" density="compact" accept=".xlsx,.xls,.csv" clearable show-size></v-file-upload>
                    <div class="d-flex flex-wrap justify-space-between my-3 align-center">
                        <h3 class="text-arcPurple">Apex File</h3>
                        <v-btn variant="tonal" color="success"><v-icon color="success" class="px-5">mdi mdi-microsoft-excel</v-icon>Template</v-btn>
                    </div>
                    <v-file-upload v-model="fileClaimsApx" density="compact" accept=".xlsx,.xls,.csv" clearable show-size></v-file-upload>
                    <div class="d-flex justify-end mt-5">
                        <v-btn color="arcPurple" @click="cashlessDialog = false">Submit<v-icon color="ligthCustom" class="ps-5">mdi mdi-send-variant</v-icon></v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="uplDialogClaim" max-width="600" persistent>
            <v-card>
                <v-card-title class="bg-arcPurple">
                    <div class="d-flex justify-space-between">
                        <h3>Upload</h3>
                        <v-btn @click="uplDialogClaim = false" variant="tonal"><v-icon>mdi mdi-close</v-icon></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <h3 class="text-arcPurple my-3">Periode</h3>
                    <BaseDateRangePicker v-model="uplDialogDatePicker" :label="'Select Periode'"/>
                    <div class="d-flex flex-wrap justify-space-between align-center mb-3">
                        <h3 class="text-arcPurple">Hutang / Claim File</h3>
                        <v-btn variant="tonal" color="success"><v-icon color="success" class="px-5">mdi mdi-microsoft-excel</v-icon>Template</v-btn>
                    </div>
                    <v-file-upload v-model="fileClaims" density="compact" accept=".xlsx,.xls,.csv" clearable show-size></v-file-upload>
                    <div class="d-flex justify-end mt-5">
                        <v-btn color="arcPurple" @click="uplDialogClaim = false">Submit<v-icon color="ligthCustom" class="ps-5">mdi mdi-send-variant</v-icon></v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>

import { createColumn, buildHeaders, columnTypes } from '../tables/table.config';
import { mapActions, mapGetters } from 'vuex';
import { DT_MANAGEMENT } from '../stores/actions/reqApi'
import BaseDateRangePicker from '../components/BaseDateRangePicker.vue'

const dataManagementCols = [
    createColumn({key: 'index', title: 'No', type: 'index'}),
    createColumn({key: 'user', title: 'User'}),
    createColumn({key: 'date_upload', title: 'Date Upload'}),
    createColumn({key: 'periode', title: 'Periode'}),
    createColumn({key: 'core_file', title: 'Core File'}),
    createColumn({key: 'apex_file', title: 'Apex File' }),
    createColumn({key: 'action', title: 'Action'})
]

const formatCellBacod = (value, type) => {
    const formatter = columnTypes[type] || columnTypes.default
    return formatter.format(value)
}

export default { 
    name: 'BaseDataManagementView',
    components: {
        BaseDateRangePicker,
    },
    data() { 
        return { 
            datamanagementtab: 'cashless',
            dpCashless: [],
            dpClaim: [],
            uplDialogDatePicker: [],
            cashlessDialogDatePicker: [],
            tempDates: [],
            dates: [],
            dtSearch: null,
            dtEditDialog: false,
            dtEditData: null,
            dtDelDialog: false,
            dtDelData: null,
            uplDialogClaim:false,
            cashlessDialog:false,
            fileClaimsCore: null,
            fileClaimsApx: null
        }
    },
    computed: {
        ...mapGetters({
            getDT_MANAGEMENT: 'financepanel/'+DT_MANAGEMENT
        }),
        formatCell() { 
            return formatCellBacod
        },
        dataManagementDT(){
            return dataManagementCols
        },
        headersDT() {
            return buildHeaders(this.dataManagementDT)
        },
        filteredItems() {
            const items = this.management_dt_getlist()
            if (!this.dtSearch) return items
            const keyword = this.dtSearch.toLowerCase()
            return items.filter(row =>
                this.dataManagementDT.some(col => {
                    const value = row[col.key]
                    return value?.toString().toLowerCase().includes(keyword)
                })
            )
        }
    },
    methods: {
        handleDialogBtn(val){
            if (val === 'Y'){
                this.dtDelDialog = false        
            } else {
                this.dtDelDialog = false
            }
        },
        handleDelete(row){
            this.dtDelData = {...row}
            this.dtDelDialog = true
        },
        handleEdit(row) {
            // console.log('edit', row)
            this.dtEditData = {...row}
            this.dtEditDialog = true
        },
        ...mapActions({
            actDT_MANAGEMENT: 'financepanel/'+DT_MANAGEMENT
        }),
        management_dt_getlist() {
            return this.getDT_MANAGEMENT?.data ?? []
        }
    },
    async mounted(){
        try {
            await this.actDT_MANAGEMENT()
        } catch (error) {
            console.error('Error ',error)
        }
    },
    watch: {
        fileClaimsCore(newFile){
            if(!newFile) return
            const allowed = ['xlsx', 'xls', 'csv']
            const ext = newFile.name.split('.').pop().toLowerCase()

            if(!allowed.includes(ext)) {
                alert('File is not valid')
                this.fileClaimsCore = null
            }
        },
        cashlessDialog(val){
            if(!val){
                this.fileClaimsCore = null
                this.fileClaimsApx = null
                this.cashlessDialogDatePicker = []
            }
        },
        async datamanagementtab(val) {
            if(val === 'cashless') {
                try {
                    await this.actDT_MANAGEMENT()
                } catch (error) {
                    console.error("Error", error)
                }
            }
        }
    }
}

</script>