import { config } from "config";

export const generateRandomCode = (length: number) => {
    return Math.round(Math.random()*Math.pow(10, length));
}

export const getFutureTime = (date: number, periodMinutes: number) => {
    return date + periodMinutes*60*1000;
} 