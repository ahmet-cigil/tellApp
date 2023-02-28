import { KEY } from "./pages/appkey.js";

const options = {
    method: "POST",
    headers: {
        "X-RapidAPI-Key": KEY,
        "X-RapidAPI-Host": "sameer-kumar-aztro-v1.p.rapidapi.com",
    },
};

const SIGNS = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
];

export { options, SIGNS };
