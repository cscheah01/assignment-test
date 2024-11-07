import { people } from '../data/data';
import Table from '../components/Table';
import '../app/globals.css'

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <Table data={people} />
    </div>
  );
};

export default Home;