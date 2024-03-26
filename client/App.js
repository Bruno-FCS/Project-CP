import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./redux_store/store/index";
import Settings from "./Settings";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar style="dark" />
      <Settings />
    </Provider>
  );
};

export default App;
