import { ApodData } from "../types";

const url = import.meta.env.VITE_API_URL || "";

export const fetchApodData = async (date: Date | null): Promise<ApodData> => {
  let query = `${url}/api/apod/data`;

  if (date) {
    query = `${query}?date=${date.toDateString()}`;
  }

  const response = await fetch(query);

  if (!response.ok) {
    throw new Error("Failed to fetch the APOD data from the server");
  }

  return response.json();
};
