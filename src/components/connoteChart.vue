<template>
    <apexchart
        type="bar"
        height="350"
        :options="chartOptions"
        :series="computedSeries"
    />
</template>

<script>
import { createBarChartOptions } from '../charts/barChart.config'

export default {
    name: 'cnoteChart',
    props: {
        chartColors:{
            type:Array,
            required:true
        },
        chartName: {
            type: String,
            required: true
        },
        chartData: {
            type: Array,
            required: true
        },
        categories: {
            type: Array,
            required: true
        }
    },

    computed: {
        chartOptions() {
            return createBarChartOptions({
                categories: this.categories, 
                chartColors: this.chartColors,
                formatter: (v) => new Intl.NumberFormat('id-ID').format(v)    
            })
        },
        computedSeries() {
            return [
                {
                    name: this.chartName,
                    data: this.chartData
                }
            ]
        }
    }
}
</script>
