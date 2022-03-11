import { React, useEffect, useState } from 'react';
import { MatchDetailedCard } from '../components/MatchDetailedCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { useParams, Link } from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';
import './TeamPage.scss';


export const TeamPage = () => {

    const [team, setTeam] = useState({ matchList: [] });
    const { teamName } = useParams();
    useEffect(
        () => {
            const fetchMatches = async () => {

                const response = await fetch("http://localhost:8080/team/".concat(teamName));
                const data = await response.json();
                setTeam(data);
            };
            fetchMatches();


        }, [teamName]
    );
    

    if(!team.teamName){
        return <h1>Team not found with {teamName} </h1>
    }



    return (

        <div className="TeamPage">

            <div className = "team-name-section">
                <h1 className='team-name'>{team.teamName}</h1>
            </div>

            <div className="win-loss-section">
                Wins/Losses
                <PieChart
                    data={[
                        
                        { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#850a1a' },
                        { title: 'Wins', value: team.totalWins, color:  '#00804f' },
                        
                    ]}
                    />;
            </div>

            <div className="match-detail-section">
                <h3>Latest Matches</h3>
                <MatchDetailedCard teamName ={team.teamName} match={team.matchList[0]} />
            </div>
            
            {team.matchList.slice(1).map(match => <MatchSmallCard key = {match.id} teamName ={team.teamName} match={match} />)}
            <div className='more-link'>
            <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`} > More </Link>
               
            </div>

        </div>
    );
}
