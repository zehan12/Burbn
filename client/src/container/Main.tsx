import { Fragment } from "react";
import App from "../app/App";
import { Provider } from "react-redux";
import store from "../redux/store";

console.log(store.getState(),"store")
const Main = () => {
  return (<Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>)
}

export default Main;