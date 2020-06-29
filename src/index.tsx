import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.less';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Signup from './screens/signup/Signup';
import Media from './screens/user/Media';
import Axios from 'axios';
import cookie from 'js-cookie';
import { message } from 'antd';

Axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
Axios.defaults.headers.common['Accept'] = 'application/json';
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const token = cookie.get('token');
if (token) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
  Axios.defaults.headers.common['Authorization'] = '';
  delete Axios.defaults.headers.common['Authorization'];
}

Axios.interceptors.response.use(response => {
  return response;
}, error => {
  if(error.response?.data?.errors){
    console.log(error.response.data.errors);
  }else{
   message.warning(error.response?.data?.message ?? error.message);
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/media" component={Media} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
