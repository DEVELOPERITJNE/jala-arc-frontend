export const dashboardTableHeaders = [
    { 
        title: 'Month', 
        key: 'month',
        headerProps:{class: 'header-purple'},
    },
    {
        title: 'Cnote',
        align: 'center',
        headerProps:{class: 'header-purple'},
        children: [
            { title: 'Implants', key: 'cnote_implants', headerProps:{class: 'header-purple'}, },
            { title: 'Utama', key: 'cnote_utama',headerProps:{class: 'header-purple'}, }
        ]
    },

    {
        title: 'Gross Omset',
        align: 'center',
        headerProps:{class: 'header-purple'},
        children: [
            { title: 'Implants', key: 'omset_implants', headerProps:{class: 'header-purple'}, },
            { title: 'Utama', key: 'omset_utama', headerProps:{class: 'header-purple'}, }
        ]
    },

    {
        title: 'Commission',
        align: 'center',
        headerProps:{class: 'header-purple'},
        children: [
            { title: 'Implants', key: 'commission_implants', headerProps:{class: 'header-purple'}, },
            { title: 'Utama', key: 'commission_utama', headerProps:{class: 'header-purple'}, }
        ]
    }
]
