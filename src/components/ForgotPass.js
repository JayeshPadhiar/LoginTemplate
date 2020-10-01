import React, { Component } from "react";
import { Alert } from "react-bootstrap";

export default class ForgotPassword extends Component {

	constructor(props){
		super(props)

		this.state = {

			requested: false,

			button: {
				value: 'Send Pin'
			},

			pInput: {
				display: 'none',
				disabled: true
			},

			alert: {
				message: '',
				variant: 'primary',
				display: 'none',
			}
		}

		// DOM References
		this.email = React.createRef();
		this.date = React.createRef();
		this.submit = React.createRef();
		this.pin = React.createRef();
	}

	bufferEmail = () => this.setState({email: this.email.current.value})
	bufferPin = () => this.setState({pin: this.pin.current.value})

	validatePin = () => {

	}

	requestPin = (event) => {
		event.preventDefault();

		if (this.state.requested === false){
			const pinCredentials = new FormData();

			pinCredentials.append('email', this.state.email);
			pinCredentials.append('date', this.date.current.value);

			
			const url = "PIN VERIFICATION ENDPOINT";
			fetch(url, {
				method: 'POST',
				body: pinCredentials
			})
									//will be used when api is available

			this.setState((prev) => {
				prev.requested = true;

				prev.button.value = 'Verify Pin'

				prev.pInput.display = 'block';
				prev.pInput.disabled = false

				prev.alert.message = 'Check your email and enter the Pin';
				prev.alert.display = 'block';

				
				return this.state;
			});
		}

		else if (this.state.requested === true){
			this.validatePin()
		}

	}

	render() {
		return (
			<form onSubmit={this.requestPin}>
				<h3>Forgot Password</h3>

				<div className='form-group'>
					<label>Email address</label>
					<input
						ref={this.email}
						onChange={this.bufferEmail}
						type='email'
						required={true}
						className='form-control'
						placeholder='abc@xyz.com'
					/>
				</div>

				<div className='form-group'>
					<label>Date of Birth</label>
					<input
						required={true}
						ref={this.date}
						type='date'
						className='form-control'
					/>
				</div>

                <div className='form-group' style={{display: this.state.pInput.display}}>
					<label>Enter PIN</label>
					<input
						disabled={this.state.pInput.disabled}
						ref={this.pin}
						onChange={this.bufferPin}
						type='password'
						className='form-control'
						placeholder='OTP'
					/>
				</div>

				<button 
				ref={this.submit} 
				type='submit'
				className='btn btn-primary btn-block submit-button'>
					{this.state.button.value}
				</button>

				<span></span>

				<Alert 
				style={{marginTop: '20px', display: this.state.alert.display}}
				variant={this.state.alert.variant}>
					{this.state.alert.message}
				</Alert>

			</form>
		);
	}
}
