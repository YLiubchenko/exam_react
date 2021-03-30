export function typeOfOrObj(obj) {
    return typeof obj === "string" ? JSON.parse(obj) : obj;
}