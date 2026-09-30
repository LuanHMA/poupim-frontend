/**
 * Data local no formato `YYYY-MM-DD`, usada pelo input de data e para agrupar a listagem.
 */
export function toDateInputValue(date: string | Date): string {
    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

    const value = typeof date === "string" ? new Date(date) : date;

    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

/**
 * Junta a data escolhida no formulário (`YYYY-MM-DD`) com um horário e devolve um ISO completo,
 * já que o formulário não coleta hora. Por padrão usa o horário atual.
 */
export function buildTransactionDate(date: string, time: Date = new Date()): string {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(
        year,
        month - 1,
        day,
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds(),
    ).toISOString();
}
