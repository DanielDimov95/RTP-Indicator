import Image, { StaticImageData } from "next/image";
import Snowflake from "../../../../public/images/tournament-view/Snowflake.png";
import Fire from "../../../../public/images/tournament-view/Fire.png";
import CommonInformationIcon from "@/features/common/icons/InformationIcon";

interface  TournamentCardProps {
    operatorLogo: StaticImageData;
    providerLogo: StaticImageData;
    thumbnail: StaticImageData;
    rtp: number;
    srp: number;
    gameRtp: number;
}

interface ProgressBarProps {
    rtp: number;
}

const ProgressBar = ({rtp}: ProgressBarProps) => {
    const percentage = Math.abs(rtp) * 10;
    const radius = 64;
    const visibleArcDegrees = 240;
    const startAngle = 150;
    const angle = startAngle + (percentage / 100) * visibleArcDegrees;
    const angleInRadians = (angle * Math.PI) / 180;

    const strokeValue = (percentage / 100) * 75;
    const gapValue = 150 - strokeValue;
    const strokeDashArray = `${strokeValue}, ${gapValue}`;

    const x = radius * Math.cos(angleInRadians);
    const y = radius * Math.sin(angleInRadians);

    return (
        <div className="relative w-full flex justify-center items-center">
            <svg 
                className="w-[171px] h-[145px] -rotate-[218deg]" 
                style={{ strokeLinecap: "round" }} 
                viewBox="2 -3 28 37" 
                xmlns="http://www.w3.org/2000/svg"
            >
                {rtp >= 0 ? ( 
                    <linearGradient id="hotGradient">
                        <stop offset="0%" stopColor="#FF952B"/>
                        <stop offset="100%" stopColor="#FF4D4D"/>
                    </linearGradient>
                ) : (
                    <linearGradient id="coldGradient">
                        <stop offset="0.08" stopColor="#36FAF1"/>
                        <stop offset="0.28" stopColor="#0100FF"/>
                        <stop offset="0.51" stopColor="#0100C8"/>
                        <stop offset="0.6" stopColor="#0100C7"/>
                    <stop offset="0.75" stopColor="#0100FF"/>
                    <stop offset="0.96" stopColor="#59F5E2"/>
                    <stop offset="1" stopColor="#5EFACB"/>
                    </linearGradient>
                )}
                <circle 
                    className="fill-none stroke-[3px] stroke-white/10 [stroke-dasharray:75,75]"  
                    r="17" 
                    cx="17" 
                    cy="15"
                />
                <circle 
                    className="fill-none stroke-[3px]"
                    style={{ 
                        stroke: rtp >= 0 ? "url(#hotGradient)" : "url(#coldGradient)",
                        strokeDasharray: strokeDashArray,
                    }} 
                    r="17" 
                    cx="17" 
                    cy="15" 
                />
            </svg>
            
            {rtp >= 0 ?
            <div 
            className="absolute z-20"
            style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%)`
            }}
        >
            <Image 
                src={Fire} 
                alt="Fire" 
                width={45} 
                height={50} 
                className="object-contain"
            />
        </div>
             : <div 
             className="absolute z-20"
             style={{
                 left: `calc(50% + ${x}px)`,
                 top: `calc(50% + ${y}px)`,
                 transform: `translate(-50%, -50%)`
             }}
         >
             <Image 
                 src={Snowflake} 
                 alt="Snowflake" 
                 width={35} 
                 height={40} 
                 className="object-contain"
             />
         </div>}
        </div>
    );
};

const TournamentCard = (props: TournamentCardProps) => {
    return (
        <div className="bg-[#021024] w-[185px] flex flex-col rounded-[20px]">
            <div className="flex justify-center mt-4 relative">
                <ProgressBar 
                    rtp={props.rtp} 
                />
                <Image 
                    src={props.thumbnail} 
                    alt="Starburst thumbnail" 
                    width={92} 
                    height={92} 
                    className="rounded-full absolute top-[33px] left-1/2 transform -translate-x-1/2 z-10" 
                />
            </div>
            <div className="flex flex-col text-center justify-center -mt-[14px] mb-[12px]">
                <p className="text-white text-[20px] font-black font-montserrat">{props.gameRtp}%</p>
                {props.rtp > 0 ? (
                    <p className="text-[#EF240B] text-[11px] font-inter font-semibold">🥵 RTP {props.rtp.toFixed(2)}%</p>
                ) : (
                    <p className="text-[#36FCF0] text-[11px] font-inter font-semibold">🥶 RTP {props.rtp.toFixed(2)}%</p>
                )}
            </div>
            <div className="flex justify-between bg-[#0B1B32] rounded-[20px] p-[12px]">
                <div>
                    <p className="text-white text-[14px] font-bold">Starburst</p>
                    <p className="text-[#607E9D] text-[13px] font-normal">by Netent</p>
                </div>
                <div className="cursor-pointer p-[9px] bg-[#021024] rounded-full">
                    <CommonInformationIcon className="fill-[#36FCF0]" />
                </div>
            </div>
        </div>
    )
}

export default TournamentCard;