import { ApodData } from "../types";

const url = import.meta.env.VITE_API_URL || '';

export const fetchApodData = async (): Promise<ApodData> => {
    const response = await fetch(`${url}/api/apod/data`);

    if (!response.ok) {
        throw new Error("Failed to fetch the APOD data from the server");
    }

    return response.json();
};