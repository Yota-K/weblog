interface MediaQuery {
    laptop: string;
    mobileM: string;
    mobileS: string;
}

const size:MediaQuery = {
    laptop: '1024px',
    mobileM: '600px',
    mobileS: '420px',
}

export const device:MediaQuery = {
    laptop: `@media (max-width: ${size.laptop})`,
    mobileM: `@media (max-width: ${size.mobileM})`,
    mobileS: `@media (max-width: ${size.mobileS})`,
}
