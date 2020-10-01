import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import './styles.css';

export default class Login extends Component {

	constructor(props){
		super(props)

		// DOM References
		this.email = React.createRef();
		this.pass = React.createRef();
		this.submit = React.createRef();
		this.form = React.createRef();

		this.state = {

			fname: '',

			alert: {
				message: '',
				variant: 'none',
				display: 'none',
			}
		}
	}

	bufferEmail = () => {
		this.setState({ email : this.email.current.value});
	}

	bufferPass = () => {
		this.setState({ pass : this.pass.current.value});
	}

	validate = (data) => {
		console.log(data);

		if (data['status'] === true){
			this.setState((prev) => {
				prev.alert.message = 'Sign-in Successful !';
				prev.alert.variant = 'success';
				prev.alert.display = 'block';
				return this.state;
			})
		}

		else if (data['status'] === false){
			this.setState((prev) => {
				prev.alert.message = `Error: ${data['message']}`;
				prev.alert.variant = 'danger';
				prev.alert.display = 'block';
				return this.state;
			})
		}	
	}

	requestSignIn = (packet) => {

		const signInUrl = "LOGIN ENDPOINT URL";

		fetch(signInUrl, {
			method: 'POST',
			body: packet
		}).then(resp => {
			if(resp.status === 200){
				return resp.json();
			}
			else {
				console.log("An error occured.");
			}
		}).then(data => this.validate(data));
	}

	signIn = (event) => {
		event.preventDefault();

		const credentials = {
			username: this.state.email,
			password: this.state.pass
		}

		const requestPacket = new FormData();

		requestPacket.append('username', credentials['username']);
		requestPacket.append('password', credentials['password']);

		this.requestSignIn(requestPacket);
	}

	render() {
		return (
			<div>
			<form ref={this.form} id='sign-in-form' onSubmit={this.signIn} >
				<h3>Sign In</h3>

				<div className='form-group'>
					<label>Username</label>
					<input
						id='username'
						onChange = {this.bufferEmail}
						ref={this.email}
						type='text'
						className='form-control'
						placeholder='username'
					/>
				</div>

				<div className='form-group'>
					<label>Password</label>
					<input
						name='password'
						onChange = {this.bufferPass}
						ref = {this.pass}
						type='password'
						className='form-control'
						placeholder='********'
					/>
				</div>

				<div style={{display: 'none'}} className='form-group' id='sign-in-check'>
					<div className='custom-control custom-checkbox'>
						<input
							type='checkbox'
							className='custom-control-input'
							id='remember-check'
						/>
						<label
							className='custom-control-label'
							htmlFor='remember-check'>
							Remember me
						</label>
					</div>
				</div>

				<button type='submit' className='btn btn-primary btn-block submit-button' id='sign-in-button'>
					Log In
				</button>
				<p className='forgot-password'><a href='/forgot-password'>Forgot Password?</a></p>

				<span></span>

				<Alert 
					style={{marginTop: '20px', display: this.state.alert.display}}
					id='alert' variant={this.state.alert.variant}
					ref={this.alert}>
						{this.state.alert.message}
				</Alert>
			</form>
			</div>
		);
	}
}