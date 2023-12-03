import './App.css';
import ProductsList from './Components/ProductsList';
import { Provider } from 'react-redux/es/exports';
import {store} from "../src/Redux/Store"

function App() {
  return ( <>
  {/* <Provider store={store}> */}
  <ProductsList/>
  {/* </Provider> */}
  
 </> );
}

export default App;
