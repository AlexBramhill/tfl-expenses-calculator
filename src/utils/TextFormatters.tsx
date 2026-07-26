export const formatDate = (date: Date) =>
    date.toLocaleString("en-GB", {
        weekday: "short",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
export const formatCharge = (amount: number) => `£${amount.toFixed(2)}`;

export const maxLength = (strings: string[]) =>
    Math.max(0, ...strings.map((s) => s.length));