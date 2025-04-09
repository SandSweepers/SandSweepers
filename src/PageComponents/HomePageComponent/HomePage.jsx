import { BeachCard } from '../../Components/BeachCardsComponent/BeachCards';
import { Leaderboard } from '../../Components/LeaderboardComponent/Leaderboard';
import './HomePage.scss'

export const HomePage = () => {

  return (
    <>
      <Leaderboard />
      <BeachCard />
      <div className="page">
        <div className="rounded-box"></div>
      </div>
    </>
  );
};
