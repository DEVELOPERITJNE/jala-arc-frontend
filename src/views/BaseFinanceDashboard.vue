<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" md="12">
                <div class="text-center d-flex ga-5 py-5">
                    <v-select
                        v-model="selectedYear"
                        :items="availableYears"
                        label="Select Year"
                        variant="outlined"
                        density="compact"
                        style="max-width: 400px;"
                    ></v-select>
                    <v-btn variant="tonal" @click="applyFilter">Get</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-card width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Connote</span>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2>{{ formatNumber(gtCnoteVal) }}</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Gross Omset</span>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2>{{ formatCurrency(gtOmsetVal) }}</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="ms-auto" width="400">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Commision</span>
                    </v-card-title>
                    <v-card-text class="pt-4 text-center">
                        <h2>{{ formatCurrency(gtCommVal) }}</h2>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- chart tai -->
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title :style="gradientStyle2" class="gradient-box">
                        <h2>Total Cnote</h2>
                    </v-card-title>
                    <v-card-text>
                        <cnoteChart :chartData="totalCnoteData.monthlyConnote || []" :categories="totalCnoteData.months || []" :chartColors="['#806EE1']" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title class="gradient-box" :style="gradientStyle2">
                        <h2>Total Gross Omset</h2>
                    </v-card-title>
                    <v-card-text>
                        <grossOmsetChart :chartData="totalOmsetData.monthlyOmset || []" :categories="totalOmsetData.months || []" :chartColors="['#5A8EE9']" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title class="gradient-box" :style="gradientStyle2">
                        <h2>Total Commision</h2>
                    </v-card-title>
                    <v-card-text>
                        <commisionChart :chartData="totalCommision.monthlyCommision || []" :categories="totalCommision.months || []" :chartColors="['#F39AA5']" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- datatable -->
         <v-row>
            <v-col cols="12" md=12>
                <v-card>
                    <v-card-title class="gradient-box my-2" :style="gradientStyle2">
                        <h2>Summary</h2>
                    </v-card-title>
                    <v-card-text class="pa-0">
                        <DashboardDatatable :totalCnoteData="totalCnoteData" :totalOmsetData="totalOmsetData" :totalCommision="totalCnoteData" density="compact"/>
                    </v-card-text>
                </v-card>
            </v-col>
         </v-row>
        
    </v-container>
</template>

<style scoped>

</style>

<script>

import DashboardDatatable from '../components/DashboardDatatable.vue';
import cnoteChart from '../components/connoteChart.vue';
import grossOmsetChart from '../components/grossOmsetChart.vue'
import commisionChart from '../components/commisionChart.vue';

import { DASHBOARD_DATA } from '../stores/actions/reqApi'
import { mapActions, mapGetters } from 'vuex';

export default { 
    components: {
        cnoteChart,
        grossOmsetChart,
        commisionChart,
        DashboardDatatable
    },
    data() { 
        return {
            appliedYearFilter: null,
            selectedYear: 2025,
            dashboardData: {},
            loading: false,
        }
    },
    methods: {
        formatNumber(value) {
            return new Intl.NumberFormat('id-ID').format(value)
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(value)
        },
        ...mapActions({
            actDASHBOARD_DATA: 'dashboard/'+DASHBOARD_DATA
        }),
        applyFilter(){ 
            this.appliedYearFilter = this.selectedYear;
        },
        async dashboardGetlist() { 
            this.loading = true;
            try {
                await this.actDASHBOARD_DATA();
                this.dashboardData = this.getDASHBOARD_DATA.data;
                const years = Object.keys(this.dashboardData)
                if(years.length > 0) {
                    const firstYear = years[0]
                    this.selectedYear = firstYear
                    this.appliedYearFilter = firstYear
                }
            } catch (err) {
                console.error(err)
            } finally { 
                this.loading = false;
            }
        },
    },
    computed: {
        ...mapGetters({
            getDASHBOARD_DATA: 'dashboard/'+DASHBOARD_DATA
        }),
        availableYears() {
            return Object.keys(this.dashboardData || {})
        },
        currentYearData() {
            return this.dashboardData?.[this.appliedYearFilter] || {}
        },
        totalCnoteData() {
            return this.currentYearData.totalCnoteData || {}
        },
        totalOmsetData() {
            return this.currentYearData.totalOmsetData || {}
        },
        totalCommision() {
            return this.currentYearData.totalCommision || {}
        },
        gtCnoteVal() {
            const data = this.totalCnoteData?.monthlyConnote || []
            return data.reduce((sum,val) => sum + val,0)
        },
        gtCommVal(){
            const data = this.totalCommision?.monthlyCommision || []
            return data.reduce((sum,val) => sum + val,0)
        },
        gtOmsetVal(){
            const data = this.totalOmsetData?.monthlyOmset || []
            return data.reduce((sum,val) => sum + val,0)
        }
    },
    async mounted(){
        await this.dashboardGetlist();
    }
}
</script>