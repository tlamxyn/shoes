export function generateSKU(id: string, producttype: string) {
    let date = new Date();
    return producttype.slice(0,3).toUpperCase().trim() + "-" + 
    id.split("-").join("") +  "-" +
    `${date.getDate()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getFullYear()}`;
}