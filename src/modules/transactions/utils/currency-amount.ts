const MAX_DIGITS = 11;

const amountFormatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function appendAmountDigits(current: string, raw: string) {
    const next = `${current}${raw}`.replace(/\D/g, "").replace(/^0+/, "");
    return next.slice(0, MAX_DIGITS);
}

export function removeAmountDigit(current: string) {
    return current.slice(0, -1);
}

export function formatAmountDigits(digits: string) {
    return amountFormatter.format(digitsToAmount(digits));
}

export function digitsToAmount(digits: string) {
    return Number(digits || "0") / 100;
}

export function amountToDigits(amount: number) {
    if (!Number.isFinite(amount) || amount <= 0) return "";
    return String(Math.round(amount * 100)).replace(/^0+/, "").slice(0, MAX_DIGITS);
}
