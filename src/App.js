import React, { Component } from "react";
import "./App.css";

import Login from "./components/Login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends Component {
	render() {
		return (
			<Router>
				<div className='App'>
					<nav className='navbar navbar-expand-lg navbar-light fixed-top'>
						<div className='container'>
							<Link className='navbar-brand' to={"/sign-in"}>
								Template
							</Link>
							<div
								className='collapse navbar-collapse'
								id='login-menu'>
								<ul className='navbar-nav ml-auto'>
									<li className='nav-item'>
										<Link
											className='nav-link'
											to={"/sign-in"}>
											Login
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</nav>

					<div className='auth-wrapper'>
						<div className='auth-inner'>
							<Switch>
								<Route exact path='/' component={Login} />
								<Route path='/sign-in' component={Login} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		);
	}
}
