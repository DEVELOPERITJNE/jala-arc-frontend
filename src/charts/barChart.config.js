
export function createBarChartOptions({
    categories = [], 
    chartColors,
    formatter = (v) => v
    } = {}) { 
        return {
            chart: {
                type: 'bar',
                toolbar: { show: false }
            },
            colors: chartColors,
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        position: 'top'
                    },
                    borderRadius: 6,
                    columnWidth: '50%'
                }
            },
    
            grid: {
                padding: { top: 30 }
            },
    
            dataLabels: {
                enabled: true,
                offsetY: -15,
                style: { colors: ['#000'] },
                formatter
            },
    
            xaxis: {
                categories
            },
    
            legend: {
                position: 'top'
            },
    
            fill: {
                opacity: 1
            }
        }
    }
