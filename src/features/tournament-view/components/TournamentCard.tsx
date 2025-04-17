import Image from "next/image";
import Snowflake from "../../../../public/images/tournament-view/Snowflake.png";
import Fire from "../../../../public/images/tournament-view/Fire.png";
import CommonInformationIcon from "@/features/common/icons/InformationIcon";
import CommonTimerIcon from "@/features/common/icons/TimerIcon";
import { ITournament } from "../models/Tournament";

interface TournamentCardProps extends ITournament {
    variant: 'desktop' | 'mobile';
}

interface ProgressBarProps {
    rtp: number;
    variant: 'desktop' | 'mobile';
}

const ProgressBar = ({rtp, variant}: ProgressBarProps) => {
    const percentage = Math.abs(rtp) * 10;
    const radius = variant === 'desktop' ? 83 : 64;
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
                className={variant === 'desktop' ? "w-[207px] h-[181px] -rotate-[218deg]" : "w-[171px] h-[145px] -rotate-[218deg]"} 
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
                        transition: "stroke-dasharray 0.8s ease-in-out"
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
                width={variant === 'desktop' ? 55 : 40} 
                height={variant === 'desktop' ? 55 : 40} 
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
                 width={variant === 'desktop' ? 35 : 25} 
                 height={variant === 'desktop' ? 35 : 25} 
                 className="object-contain"
             />
         </div>}
        </div>
    );
};

const TournamentCard = (props: TournamentCardProps) => {
    if (props.variant === 'desktop') {
        return (
            <div className="bg-[#021024] w-[398px] flex flex-col pt-[16px] pb-[28px] rounded-[36px]">
                <div className="px-[16px] flex justify-between mb-[8px] font-sfPro">
                    <div className="flex items-center gap-[16px]">
                        <div className="flex">
                            <Image src={props.operatorLogo} alt="Operator Logo" width={36} height={36} className="rounded-full" />
                            <div className="pl-[8px]">
                                <p className="text-[#607E9D] text-[11px] ">Casino</p>
                                <p className="text-white text-[13px] font-medium">BlueChip</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/10 w-[2px] h-[28px]"></div>
                    <div className="flex items-center gap-[16px]">
                        <div className="flex flex-row-reverse">
                            <Image src={props.providerLogo} alt="Provider Logo" width={36} height={36} className="rounded-full" />
                            <div className="pr-[8px] text-right">
                                <p className="text-[#607E9D] text-[11px] ">Created by</p>
                                <p className="text-white text-[13px] font-medium">Netent</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4 relative">
                    <ProgressBar 
                        rtp={props.rtp} 
                        variant={props.variant}
                    />
                    <Image 
                        src={props.thumbnail} 
                        alt="Starburst thumbnail" 
                        width={128} 
                        height={128} 
                        className="rounded-full absolute top-[33px] left-1/2 transform -translate-x-1/2 z-10" 
                    />
                </div>
                <div className="flex flex-col text-center justify-center -mt-[14px] mb-[16px]">
                    <p className="text-white text-[40px] font-black font-montserrat">{props.gameRtp}%</p>
                    {props.rtp > 0 ? (
                        <p className="text-[#EF240B] text-[16px] font-inter">🥵 RTP {props.rtp.toFixed(2)}%</p>
                    ) : (
                        <p className="text-[#36FCF0] text-[16px] font-inter">🥶 RTP {props.rtp.toFixed(2)}%</p>
                    )}
                </div>
                <div className="px-[28px] font-inter space-y-[8px]">
                    <div className="bg-[#0B1B32] rounded-[20px] p-[20px] flex flex-col space-y-[8px] text-[16px] text-white mb-[16px] font-semibold">
                        <div className="flex justify-between">
                            <span className="flex items-center">SRP <span className="pl-[5px] cursor-pointer"><CommonInformationIcon className="fill-[#607E9D]" /></span></span>
                            <p>{props.srp}%</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Game RTP</p>
                            <p>{props.gameRtp}%</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Difference</p>
                            {props.rtp > 0 ? (
                                <p> {props.rtp.toFixed(2)}%</p>
                            ) : (
                                <p> 🧊🧊🧊🧊 {props.rtp.toFixed(2)}%</p>
                            )}
                        </div>
                        <div className="w-full h-[2px] bg-white/10"></div>
                    <div className="text-[#36FCF0] flex text-[11px] justify-center font-normal">
                        <CommonTimerIcon />
                        <span className="pl-[5px]">Last Update: 2 min ago based on 6990 Spins</span>
                    </div>
                    </div>
                    <button className="bg-[#3736FA] rounded-full py-[14px] text-center w-full text-[16px] font-bold text-white">Play Now at Ice Casino</button>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="bg-[#021024] w-[185px] flex flex-col rounded-[20px]">
                <div className="flex justify-center mt-4 relative">
                    <ProgressBar 
                        rtp={props.rtp} 
                        variant={props.variant}
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
}

export default TournamentCard;