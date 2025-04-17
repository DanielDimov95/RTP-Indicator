import Image from "next/image";
import TournamentTable from "./components/TournamentTable";
import { useEffect, useState } from "react";
import { ITournament } from "./models/Tournament";
import TournamentBoxImage from "../../../public/images/tournament-view/TournamentBoxImage.png";
import OperatorLogo from "../../../public/images/tournament-view/OperatorLogo.jpg";
import ProviderLogo from "../../../public/images/tournament-view/ProviderLogo.png";
import StarBurstThumbnail from "../../../public/images/tournament-view/StarBurstThumbnail.png";

const mockData = [
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 94.5,
        srp: 100.9,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 86.5,
        srp: 96.5,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 96.5,
        srp: 94.5,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 96.5,
        srp: 86.5,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 94.5,
        srp: 96.5,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 86.5,
        srp: 96.5,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 80.5,
        srp: 96.5,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 96.5,
        srp: 94.5,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 96.5,
        srp: 86.5,
        rtp: 0,
    },
    {
        operatorLogo: OperatorLogo,
        providerLogo: ProviderLogo,
        thumbnail: StarBurstThumbnail,
        gameRtp: 98.5,
        srp: 86.5,
        rtp: 0,
    }
];

const fetchTournaments = (): Promise<ITournament[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const tournaments = mockData.map(tournament => {
                const rtp = tournament.gameRtp - tournament.srp;
                return {
                    ...tournament,
                    rtp: rtp > 10 ? 10 : rtp < -10 ? -10 : rtp,
                };
            });
            resolve(tournaments);
        }, 1000); 
    });
};

const TournamentView = () => {
    const [tournaments, setTournaments] = useState<ITournament[]>([]);
    const [screenType, setScreenType] = useState<'mobile' | 'desktop'>('desktop');

    useEffect(() => {
        const getTournaments = async () => {
            const data = await fetchTournaments();
            setTournaments(data);
        };
        
        getTournaments();
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
    
        const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
            setScreenType(e.matches ? 'mobile' : 'desktop');
        };

        handleResize(mediaQuery);

        mediaQuery.addEventListener('change', handleResize);

        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);
    
    return (
        <div className="bg-white">
            <div className="bg-[#021024] text-center pt-[66px] pb-[91px] font-inter">
                <p className="text-[#36FCF0] text-[40px] leading-[60px] tracking-[20%]">THE</p>
                <p className="text-white text-[60px] leading-[60px]  sm:text-[100px] font-extrabold">Hot or Cold Box</p>
            </div>
            <div className="w-full h-[218px] relative bg-transparent">
                <Image 
                    src={TournamentBoxImage}
                    alt="Hot or Cold Box"
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover -mt-[17px]"
                />
            </div>
            <TournamentTable tournaments={tournaments} variant={screenType} />
        </div>
    )
}

export default TournamentView;