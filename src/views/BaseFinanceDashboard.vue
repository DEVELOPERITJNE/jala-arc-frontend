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

.gradient-box {
    position: relative;
    overflow: hidden;
}

.gradient-box::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;

    background-image: url('../assets/imgs/noise.jpg');
    background-repeat: repeat;
    opacity: 0.6;
    mix-blend-mode: soft-light;
}

</style>

<script>

import DashboardDatatable from '../components/DashboardDatatable.vue';
import cnoteChart from '../components/connoteChart.vue';
import grossOmsetChart from '../components/grossOmsetChart.vue'
import commisionChart from '../components/commisionChart.vue';

import {useTheme} from 'vuetify'
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
            theme: useTheme(),
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
        hexToRgba(hex, o){
            const r = parseInt(hex.slice(1,3), 16)
            const g = parseInt(hex.slice(3,5), 16)
            const b = parseInt(hex.slice(5,7), 16)

            return `rgba(${r}, ${g}, ${b}, ${o})`
        }
    },
    computed: {
        gradientStyle2() { 
            const colors = this.theme.current.colors
            return {
                background: `linear-gradient(
                    90deg,
                    ${this.hexToRgba(colors.arcPurple, 0.2)},
                    ${this.hexToRgba(colors.arcBlue, 0.2)},
                    ${this.hexToRgba(colors.arcYellow, 0.2)}
                )`
            }
        },
        ...mapGetters({
            getDASHBOARD_DATA: 'dashboard/'+DASHBOARD_DATA
        }),
        gradientStyle2() { 
            const colors = this.theme.current.colors
            return {
                background: `linear-gradient(
                    90deg,
                    ${this.hexToRgba(colors.arcPurple, 0.2)},
                    ${this.hexToRgba(colors.arcBlue, 0.2)},
                    ${this.hexToRgba(colors.arcYellow, 0.2)}
                )`
            }
        },
        gradientStyle2() { 
            const colors = this.theme.current.colors
            return {
                background: `linear-gradient(
                    90deg,
                    ${this.hexToRgba(colors.arcPurple, 0.2)},
                    ${this.hexToRgba(colors.arcBlue, 0.2)},
                    ${this.hexToRgba(colors.arcYellow, 0.2)}
                )`
            }
        },
        gradientStyle() { 
            const colors = this.theme.current.colors
            return {
                background: `linear-gradient(
                    90deg,
                    ${this.hexToRgba(colors.arcPurple, 0.75)},
                    ${this.hexToRgba(colors.arcBlue, 0.75)},
                    ${this.hexToRgba(colors.arcYellow, 0.75)}
                )`
            }
        },
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
        // setTimeout(async() => {
        //     await this.dashboardGetlist();
        // }, 5000);
    }
}
</script>