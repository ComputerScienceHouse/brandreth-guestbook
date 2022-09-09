import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import useUsers from '../../hooks/useUsers';
import { Loading } from '../Loading';
import CrownSVG from './Crown';
import './LeaderBoard.scss';

const LeaderBoard = () => {
  const { users, isLoading } = useUsers();

  if (isLoading) return <Loading />;

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="lb-top-three">
        {users.slice(0, 3).map(({ username, name, tripCount }, index) => (
          <Card
            key={username}
            className="lb-card"
            style={{
              width: '18rem',
            }}
          >
            <div className={`lb-score lb-${index + 1}`}>
              <span className="lb-place">#{index + 1}</span>
              <span className="lb-trips">{tripCount} Trips</span>
            </div>
            <CardBody>
              <CardTitle className="lb-title">
                <div className="lb-img">
                  {index === 0 && <CrownSVG />}
                  <img
                    className="rounded-circle"
                    src={`https://profiles.csh.rit.edu/image/${username}`}
                    alt=""
                    aria-hidden
                    width={100}
                    height={100}
                  />
                </div>
              </CardTitle>
              <div
                className="lb-name"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <h2>{name}</h2>
                <p>@{username}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      {users.slice(3).length !== 0 && (
        <>
          <h2>Other Guests</h2>
          <Table>
            <thead>
              <tr>
                <th>Place</th>
                <th>User</th>
                <th>Trips</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(3).map(({ username, name, tripCount }, index) => (
                <tr key={username}>
                  <td>#{index + 4}</td>
                  <td>
                    <div className="lb-user">
                      <img
                        className="rounded-circle lb-user-img"
                        src={`https://profiles.csh.rit.edu/image/${username}`}
                        alt=""
                        aria-hidden
                        width={40}
                        height={40}
                      />
                      <div className="lb-name">
                        <h5>{name}</h5>
                        <p>@{username}</p>
                      </div>
                    </div>
                  </td>
                  <td>{tripCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default LeaderBoard;
