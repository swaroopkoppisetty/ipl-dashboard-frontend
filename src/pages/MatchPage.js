import { React, useEffect, useState } from 'react';
import { MatchDetailedCard } from '../components/MatchDetailedCard';
// import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams } from "react-router-dom";
import './MatchPage.scss'
import { Yearselector } from '../components/YearSelector';


export const MatchPage = () => {

const [matches, setMatches] = useState([]);
const { teamName , year} = useParams();
useEffect(
    () => {
        const fetchMatches = async () => {
            let url = 'http://localhost:8080/team/' + teamName +'/matches?year='.concat(year)
            const response = await fetch(url);
            const data = await response.json();
            setMatches(data);
        };
        fetchMatches();


    }, [teamName, year]
);
return (

        <div className="MatchPage">
            <div className='year-selector'>
                <h3>Select Year</h3>
                <Yearselector teamName={teamName} />
            </div>

            <div>
                <h1 className='page-heading'>{teamName} matches in {year}</h1>
                {matches.map(match => <MatchDetailedCard key= {match.id} teamName ={teamName} match={match} />)}
            </div>
            


        </div>
    );
}
