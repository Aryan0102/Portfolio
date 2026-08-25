const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const spreadsheetId = import.meta.env.VITE_SPREADSHEET_ID;

const cache = new Map();

const fetchSheet = async (sheetName) => {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`
        );
        const data = await response.json();

        if (!data.values) {
            console.error('No data found or sheet is empty.');
            return [];
        }

        const [header, ...rows] = data.values; // Header is tags "name, date, etc"

        const events = [];
        rows.map((row) => {
            const event = {};
            header.forEach((key, index) => {
                event[key.trim().toLowerCase()] = row[index];
            });
            events.push(event);
        });

        return events;
    } catch (err) {
        console.error('Error fetching Google Sheet:', err);
        cache.delete(sheetName);
        return [];
    }
};

export const getInformation = (sheetName) => {
    if (!cache.has(sheetName)) {
        cache.set(sheetName, fetchSheet(sheetName));
    }

    return cache.get(sheetName);
};
