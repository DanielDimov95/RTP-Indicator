import { StaticImageData } from "next/image";

export interface ITournament {
    operatorLogo: StaticImageData;
    providerLogo: StaticImageData;
    thumbnail: StaticImageData;
    rtp: number;
    srp: number;
    gameRtp: number;
}
