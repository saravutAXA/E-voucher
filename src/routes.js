import React from 'react';
import { Redirect } from "react-router-dom";
import { Route } from 'react-router-dom';

import { isUserAuthenticated, getLoggedInUser } from './helpers/authUtils';

// lazy load all the views
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const GenerateEVoucher = React.lazy(() => import('./pages/GenerateEVoucher'));
const UploadEVoucher = React.lazy(() => import('./pages/UploadEVoucher'));
const ListEVoucher = React.lazy(() => import('./pages/ListEVoucher'));

// auth
const Login = React.lazy(() => import('./pages/auth/Login'));
const Logout = React.lazy(() => import('./pages/auth/Logout'));
const ForgetPassword = React.lazy(() => import('./pages/account/ForgetPassword'));
const Register = React.lazy(() => import('./pages/account/Register'));
const ConfirmAccount = React.lazy(() => import('./pages/account/Confirm'));

// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    const isAuthTokenValid = isUserAuthenticated();
    if (!isAuthTokenValid) {
      // not logged in so redirect to login page with the return url
      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    }

    const loggedInUser = getLoggedInUser();
    // check if route is restricted by role
    if (roles && roles.indexOf(loggedInUser.role) === -1) {
      // role not authorised so redirect to home page
      return <Redirect to={{ pathname: '/' }} />
    }

    // authorised so return component
    return <Component {...props} />
  }} />
)

const routes = [
  // auth and account
  { path: '/login', name: 'Login', component: Login, route: Route },
  { path: '/logout', name: 'Logout', component: Logout, route: Route },
  { path: '/forget-password', name: 'Forget Password', component: ForgetPassword, route: Route },
  { path: '/register', name: 'Register', component: Register, route: Route },
  { path: '/confirm', name: 'Confirm', component: ConfirmAccount, route: Route },

  // other pages
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, route: PrivateRoute, roles: ['Admin'], title: 'Dashboard' },
  { path: '/generate_e-voucher', name: 'Generate E-Voucher', component: GenerateEVoucher, route: PrivateRoute, roles: ['Admin'], title: 'Generate E-Voucher' },
  { path: '/upload_e-voucher', name: 'Upload E-Voucher', component: UploadEVoucher, route: PrivateRoute, roles: ['Admin'], title: 'Upload E-Voucher' },
  { path: '/list_e-voucher', name: 'List E-Voucher', component: ListEVoucher, route: PrivateRoute, roles: ['Admin'], title: 'list E-Voucher' },

  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute
  },
  
]

export { routes, PrivateRoute };