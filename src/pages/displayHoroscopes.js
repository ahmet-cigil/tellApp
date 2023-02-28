import { SIGNS } from "../constants.js";
import { options } from "../constants.js";

export async function displayHoroscopes() {
    let horoscopesBySign = await fetchHoroscopes();
    for (let sign in horoscopesBySign) {
        const { div, aTag } = createHoroscopeCard(sign, horoscopesBySign[sign]);
        aTag.addEventListener("click", (event) => {
            event.preventDefault();
            const allCards = document.querySelectorAll(".card");
            allCards.forEach((card) => {
                if (card === div) {
                    const dateRange = card.querySelector(".date-range");
                    const horoscopeText = card.querySelector(
                        ".sign-daily-horoscope-text"
                    );
                    dateRange.style.display = "block";
                    horoscopeText.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
        document.querySelector("#signs").appendChild(div);
    }
}

async function fetchHoroscopes() {
    try {
        const arrayOfSigns = await Promise.all(
            SIGNS.map((sign) =>
                fetch(
                    `https://sameer-kumar-aztro-v1.p.rapidapi.com/?day=today&sign=${sign}`,
                    options
                )
                    .then((response) => response.json())
                    .then((data) => [data.date_range, data.description])
            )
        );
        const result = {};
        for (let i = 0; i < SIGNS.length; i++) {
            result[SIGNS[i]] = [arrayOfSigns[i][0], arrayOfSigns[i][1]];
        }
        return result;
    } catch (error) {
        document.querySelector("#error-message").innerHTML = String.raw`
        <h1>Something went very wrong... Sorry!</h1>
        <p>Here is the cryptic error message for the geeks 😎:</p>
        <p>" ${error.message}! "</p>`;
        //return {}; // returns an empty object to avoid breaking the rest of the code
    }
}

function createHoroscopeCard(sign, horoscopeBySign) {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = String.raw`
        <img
            src="./public/images/${sign.toLowerCase()}.jpg"
            alt="image-${sign.toLowerCase()}"
            class="sign-daily-horoscope-image"
        />
        <div class="card-body">
            <a href="#" class="sign-daily-horoscope-link">
                <h3 class="sign-daily-horoscope-title">
                    ${sign} Daily Horoscope
                </h3>
            </a>
            <p class="date-range" style="display: none;">${
                horoscopeBySign[0]
            }</p>
            <p class="sign-daily-horoscope-text" style="display: none;">${
                horoscopeBySign[1]
            }</p>
        </div>
    `;
    const aTag = div.querySelector(".sign-daily-horoscope-link");
    return { div, aTag };
}
