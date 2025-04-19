import './Leaderboard.scss'
import { useEffect, useState } from 'react'
import { LeaderboardList } from '../leaderboardListComponent/LeaderboardList'
import api from '../../utils/axiosConfig'

export const Leaderboard = () => {
  const [sortedUsers, setSortedUsers] = useState([])
  const [showMore, setShowMore] = useState(false)

  //from Yami
  // Axios is a  HTTP client that helps us make requests to the backend API.
  // In this case, we're using a custom Axios instance created in our `axiosConfig.js` file.
  // The instance is pre-configured with a base URL (`http://localhost:8080/api`), so we don't have to type the full URL every time we make a request.
  // Additionally, we use an Axios interceptor to add the Authorization token (stored in `localStorage`) to every request's headers automatically.
  // This means any time we call `api.get()` or other methods, the token is sent along with the request, ensuring that the server knows who the user is and can authenticate the request.
  // If the token is missing or invalid, the server will respond with a 401 Unauthorized error, which we catch and log in our `catch` block.
  //Explain in comments how this works (i hate comments), but i suppose this is good to know 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using `api.get()` to send a GET request to the backend
        // The URL '/users/leaderboard/max-scores' will be appended to the base URL defined in axiosConfig (http://localhost:8080/api)
        const response = await api.get('/users/leaderboard/max-scores')

        // The response from the server contains data we need to process
        const validUsers = response.data.data.map((user, index) => ({
          id: index + 1, // Assigning an index-based unique ID to each user
          name: user.name,
          totalScore: parseInt(user.totalScore) || 0, // Parsing score to an integer
          totalTimeInHours: parseInt(user.totalTimeInHours) || 0 // Parsing hours to an integer
        }))

        // Sorting the users by their score in descending order
        const sorted = validUsers.sort((a, b) => b.totalScore - a.totalScore)
        setSortedUsers(sorted)
      } catch (error) {
        console.error('Error fetching leaderboard:', error) // Logging any errors that occur during the fetch
      }
    }

    fetchData()
  }, []) // The empty dependency array ensures this effect runs only once, when the component mounts

  const handleShowMore = () => setShowMore(true)

  return (
    <div className='leaderboard'>
      <div className='leaderboard-header'>
        <div className='logo'>
          <img
            src='public/images/ChatGPT Image 10 apr 2025, 13_42_15 1.svg'
            alt='logo'
          />
        </div>
        <p>Sand Sweepers</p>
      </div>

      <div className='top-users'>
        {sortedUsers.slice(0, 3).map((user, index) => {
          let positionClass = ''
          if (index === 1) positionClass = 'second-position'
          else if (index === 0) positionClass = 'first-position'
          else if (index === 2) positionClass = 'third-position'

          return (
            <div key={user.id} className={`user-card ${positionClass}`}>
              <div className='avatar-container'>
                <img
                  src={`https://i.pravatar.cc/150?img=${user.id}`}
                  alt={user.name}
                  className='avatar'
                />
              </div>
              <div className='user-details'>
                <h3>{user.name}</h3>
                <p>PTS: {user.totalScore}</p>
                <p>Hours: {user.totalTimeInHours}</p>
              </div>
            </div>
          )
        })}
      </div>

      {showMore && <LeaderboardList users={sortedUsers.slice(3)} />}
      {!showMore && (
        <button className='see-more-btn' onClick={handleShowMore}>
          See More
        </button>
      )}
    </div>
  )
}
