import TournamentCard from "./TournamentCard";
import { ITournament } from "../models/Tournament";
import TournamentCardMobile from "./TournamentCardMobile";

const TournamentTable = (props: {tournaments: ITournament[], variant: 'desktop' | 'mobile'}) => {
    if (props.variant === 'desktop') {
    return (    
        <div className="mt-[121px] px-[349px] grid gap-[50px] justify-items-center flex-wrap [grid-template-columns:repeat(auto-fit,minmax(398px,1fr))]">
            {props.tournaments.map((tournament, index) => (
                <TournamentCard key={index} {...tournament} />
            ))}
        </div>
    )
}
else {
    return (
        <div className="mt-[61px] grid gap-[50px] justify-items-center flex-wrap [grid-template-columns:repeat(auto-fit,minmax(398px,1fr))]">
           {props.tournaments.map((tournament, index) => (
                <TournamentCardMobile key={index} {...tournament} />
            ))}
        </div>
    )
}
}

export default TournamentTable;