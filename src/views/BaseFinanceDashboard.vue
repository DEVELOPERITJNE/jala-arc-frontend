<template>
    <v-container fluid>
        <h2>Finance dashboard</h2>
        <v-row>
            <v-col cols="12" md="12">
                <div class="d-flex">

                </div>
                <v-btn variant="tonal">Get</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" width="300">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Connote</span>
                    </v-card-title>
                    <v-card-text class="bg-surface-light pt-4 text-center">
                        <h2>26,157,702</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" width="300">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Gross Omset</span>
                    </v-card-title>
                    <v-card-text class="bg-surface-light pt-4 text-center">
                        <h2>Rp. 1,002,927,618,450</h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card class="mx-auto" width="300">
                    <v-card-title :style="gradientStyle">
                        <span class="font-weight-black">Commision</span>
                    </v-card-title>
                    <v-card-text class="bg-surface-light pt-4 text-center">
                        <h2>Rp. 33,236,359,774</h2>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- chart tai -->
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h2>Total Cnote</h2>
                    </v-card-title>
                    <v-card-text>
                        <cnoteChart :chartData="totalCnoteData.monthlyConnote" :categories="totalCnoteData.months" :chartColors="['#806EE1']" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h2>Total Gross Omset</h2>
                    </v-card-title>
                    <v-card-text>
                        <grossOmsetChart :chartData="totalOmsetData.monthlyOmset" :categories="totalOmsetData.months" :chartColors="['#5A8EE9']" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-card>
                    <v-card-title>
                        <h2>Total Commision</h2>
                    </v-card-title>
                    <v-card-text>
                        <commisionChart :chartData="totalCommision.monthlyCommision" :categories="totalCommision.months" :chartColors="['#F39AA5']" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- datatable -->
         <v-row>
            <v-col cols="12" md=12>
                <v-card>
                    <v-card-title>
                        <h2>Summary</h2>
                    </v-card-title>
                    <v-card-text>
                        <DashboardDatatable :totalCnoteData="totalCnoteData" :totalOmsetData="totalOmsetData" :totalCommision="totalCnoteData" density="compact"/>
                    </v-card-text>
                </v-card>
            </v-col>
         </v-row>
        
    </v-container>
</template>

<style>

</style>

<script>

import DashboardDatatable from '../components/DashboardDatatable.vue';
import cnoteChart from '../components/connoteChart.vue';
import grossOmsetChart from '../components/grossOmsetChart.vue'
import commisionChart from '../components/commisionChart.vue';

import {useTheme} from 'vuetify'

export default { 
    components: {
        cnoteChart,
        grossOmsetChart,
        commisionChart,
        DashboardDatatable
    },
    data() { 
        return { 
            theme: useTheme(),
            totalCnoteData: {
                months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                implants: [372717,319354,612080,703764,715873,729117,799285,595673,608830,550744,0,0],
                utama: [2155698,1960576,2137182,2021293,2143381,1950684,2171237,1701798,1967273,1941143,0,0],
                monthlyConnote: [
                    2528415,
                    2279930,
                    2749262,
                    2725057,
                    2859254,
                    2679801,
                    2970522,
                    2297471,
                    2576103,
                    2491887,
                    0,
                    0
                ]
            },
            totalOmsetData: {
                months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                implants: [20259322420, 18190107000, 30884157570, 31312234505, 33772588000, 39167684900, 33402424560, 23352305000, 26830286280, 27468347600,0,0],
                utama: [66670961785,63640086785,75202351690,67818570135,76027470640,82385199300,80020173100,59747608120,70080897360,76694842700,0,0],
                monthlyOmset: [
                    86930284205,
                    81830193785,
                    106086509260,
                    99130804640,
                    109800058640,
                    121552884200,
                    113422597660,
                    83099913120,
                    96911183640,
                    104163190300,
                    0,
                    0
                ]
            },
            totalCommision: {
                months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                implants: [ 816929131, 716665595, 998375762, 1069841043, 1068631315, 1214793995, 1098186573, 798002730, 960574764, 1025569882,0,0],
                utama: [ 2199013860, 2110030029, 2345785639, 2175829646, 2390120217, 2539348507, 2611268104, 1996010418, 2416203805, 2685178759,0,0],
                monthlyCommision: [
                    3015942991,
                    2826695624 ,
                    3344161401,
                    3245670689,
                    3458751532,
                    3754142502,
                    3709454677,
                    2794013148,
                    3376778569,
                    3710748641,
                    0,
                    0
                ]
            }
        }
    },
    methods: {
        hexToRgba(hex, o){
            const r = parseInt(hex.slice(1,3), 16)
            const g = parseInt(hex.slice(3,5), 16)
            const b = parseInt(hex.slice(5,7), 16)

            return `rgba(${r}, ${g}, ${b}, ${o})`
        }
    },
    computed: {
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
        }
    },
    mounted(){
        console.log('c ', this.gradientStyle)
    }
}
</script>