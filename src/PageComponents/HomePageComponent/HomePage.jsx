import { BeachCard } from '../../Components/BeachCardsComponent/BeachCards';
import { Leaderboard } from '../../Components/LeaderboardComponent/Leaderboard';
import './HomePage.scss'

export const HomePage = () => {

  return (
    <>
      <Leaderboard />
      <BeachCard />
      <div class="page">
        <div class="rounded-box"></div>
      </div>
    </>
  );
};
