let months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

export function convertDate(date) {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}