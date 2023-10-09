import {NavigationContainer} from '@react-navigation/native'
import StackNavigator from './components/StackNavigator';
import { StripeProvider } from '@stripe/stripe-react-native';


const App = ()=> {

  return (
    <StripeProvider publishableKey='pk_test_51NhRhVSA3IfjBxpOzYtHa1rZJvFCK65dqPO0iuMlYu4pUAEgPpGNtsmPujHTG476Y5Sw67KrCCkfZY3xULxM9t1B00HaIBKMRk'>

    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>

    </StripeProvider>

  );
}


export default App;