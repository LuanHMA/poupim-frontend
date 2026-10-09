export const statisticsChartColors = {
    primary: "var(--color-background-accent)",
    primarySecondary: "var(--color-background-accent-secondary)",
    secondary: "var(--color-brd-strong)",
    secondaryBackground: "var(--color-background-elevated)",
    positive: "var(--color-content-success)",
    negative: "var(--color-content-danger)",
} as const;

export const statisticsChartTooltipStyles = {
    contentStyle: {
        background: "var(--color-background-elevated)",
        border: "1px solid var(--color-brd-default)",
        borderRadius: "0.75rem",
        color: "var(--color-content-primary)",
    },
    labelStyle: {
        color: "var(--color-content-primary)",
        fontWeight: 600,
    },
    itemStyle: {
        color: "var(--color-content-primary)",
    },
    cursor: {
        fill: "var(--color-background-elevated)",
        opacity: 0.45,
    },
} as const;
