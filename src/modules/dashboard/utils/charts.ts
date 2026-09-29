export function segmentPaddingPieChart(segmentCount: number, radius: number, lineWidth: number) {
    const stroke = radius * (lineWidth / 100)
    const pathRadius = radius - stroke / 2
    const gapAfterCaps = ((stroke + 4) / pathRadius) * (180 / Math.PI)
    const maxShare = segmentCount > 0 ? (360 / segmentCount) * 0.42 : gapAfterCaps

    return Math.min(gapAfterCaps, maxShare)
}