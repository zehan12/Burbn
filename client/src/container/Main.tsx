import { Fragment } from "react";
import App from "../app/App";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Notify } from "../components/common";

console.log(store.getState(),"store")
const Main = () => {
  return (<Fragment>
    <Provider store={store}>
      <Notify />
      <App />
    </Provider>
  </Fragment>)
}

export default Main;