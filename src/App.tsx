import tabs from './mocks/tabs.json';
import CustomerCenterTab from './components';
const App = () => {
  return (
    <div>
      <CustomerCenterTab tabs={tabs} />
    </div>
  );
};

export default App;
