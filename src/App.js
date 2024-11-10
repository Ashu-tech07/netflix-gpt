import { Provider } from 'react-redux';
import Body from './components/Body';
import appStore from './redux/appStore';
import Footer from './components/Footer';

function App() {

  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;
