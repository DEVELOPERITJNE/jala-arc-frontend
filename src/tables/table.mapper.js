export function mapDashboardTableData({
    totalCnoteData,
    totalOmsetData,
    totalCommision
}){
    const months = totalCnoteData.months || []
    return months.map((month, i) => ({
        month,
        cnote_implants: totalCnoteData.implants[i] || 0,
        cnote_utama: totalCnoteData.utama[i] || 0,

        omset_implants: totalOmsetData.implants[i] || 0,
        omset_utama: totalOmsetData.utama[i] || 0,

        commission_implants: totalCommision.implants[i] || 0,
        commission_utama: totalCommision.utama[i] || 0
    }))
}
