export function getGreeting(date = new Date()) {
    const hour = date.getHours();

    if (hour < 5) return "Boa madrugada";
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";

    return "Boa noite";
}
