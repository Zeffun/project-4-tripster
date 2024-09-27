import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        Create your dream holiday!
      </p>
    </main>
  );
};

export default Dashboard;