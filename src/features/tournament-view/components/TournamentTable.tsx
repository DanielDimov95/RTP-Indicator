import TournamentCard from "./TournamentCard";
import { ITournament } from "../models/Tournament";

const TournamentTable = (props: {tournaments: ITournament[], variant: 'desktop' | 'mobile'}) => {
    return (    
        <div className="mt-[61px] sm:mt-[121px] sm:px-[349px] grid gap-[50px] justify-items-center flex-wrap [grid-template-columns:repeat(auto-fit,minmax(398px,1fr))]">
            {props.tournaments.map((tournament, index) => (
                <TournamentCard key={index} {...tournament} variant={props.variant} />
            ))}
        </div>
    )
}

export default TournamentTable;