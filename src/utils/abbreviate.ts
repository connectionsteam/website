export default function abbreviateNumber(number: number) {
    if (number < 1000) return number;
    const unitys = ["", "k", "M", "B", "T"];
    const index = Math.floor(Math.log10(number) / 3);
    let abbreviate = (number / Math.pow(1000, index)).toFixed(1);
    
    if (abbreviate.endsWith(".0")) {
        abbreviate = abbreviate.slice(0, -2);
    }
    
    return abbreviate + unitys[index];
}