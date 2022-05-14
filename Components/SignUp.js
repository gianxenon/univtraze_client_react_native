import {
	KeyboardAvoidingView,
	Image,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
const image = {
	uri: "https://firebasestorage.googleapis.com/v0/b/tcuhub-cf9e1.appspot.com/o/images%2FSignUpOneImage.png?alt=media&token=080199fe-1d60-4a1f-998a-83458de4769a",
};
const googleLogo = {
	uri: "https://firebasestorage.googleapis.com/v0/b/tcuhub-cf9e1.appspot.com/o/images%2Fgoogle-icon3.png?alt=media&token=61a34454-dda9-4b6d-8dc6-198bb59ccbfb",
};
const facebookLogo = {
	uri: "https://firebasestorage.googleapis.com/v0/b/tcuhub-cf9e1.appspot.com/o/images%2Ffacebook-icons.png?alt=media&token=0ec86a8b-f095-40dd-b4e9-4b31b2846068",
};

const SignUp = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [provider, setProvider] = useState("email/password");
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const validateUserInput = async () => {
		if (email === "") {
			setError(true);
			setErrorMessage("Please input your email address");
		} else {
			let re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (re.test(email)) {
				if (password === "") {
					setError(true);
					setErrorMessage("Please input password");
				} else if (password.length < 7) {
					setError(true);
					setErrorMessage("Password field Minimum of 8 characters");
				} else if (password !== confirmPassword) {
					setError(true);
					setErrorMessage("Confirm password did not match!");
				} else {
					//Data checking with api
					const data = {
						provider: provider,
						email: email,
						password: password,
					};

					await axios
						.post("https://univtraze.herokuapp.com/api/user/signup", data)
						.then((response) => {
							const success = response.data.success;
							if (success === 0) {
								setError(true);
								setErrorMessage(response.data.message);
							} else {
								setError(false);
								setErrorMessage("");
								setPassword("");
								setConfirmPassword("");
								setEmail("");
								navigation.navigate("Login");
							}
						})
						.catch((error) => {
							console.log(error);
						});
				}
			} else {
				setError(true);
				setErrorMessage("Invalid email address");
			}
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="padding">
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={image} />
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.loginText}>Sign Up</Text>

				<Text style={styles.label}>Email</Text>
				<TextInput
					placeholder="Email Address"
					defaultValue={email}
					onChangeText={(text) => setEmail(text)}
					style={styles.input}
				/>

				<Text style={styles.label}>Password</Text>
				<TextInput
					placeholder="Password"
					defaultValue={password}
					onChangeText={(text) => setPassword(text)}
					style={styles.input}
					secureTextEntry
				/>
				<Text style={styles.label}>Confirm Password</Text>
				<TextInput
					placeholder="Confirm Password"
					defaultValue={confirmPassword}
					onChangeText={(text) => setConfirmPassword(text)}
					style={styles.input}
					secureTextEntry
				/>

				{error ? (
					<Text style={styles.errorMessage}>*{errorMessage}</Text>
				) : (
					<Text style={styles.errorMessage}></Text>
				)}
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={() => {
						validateUserInput();
					}}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Sign Up</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.orText}>or</Text>

			<View style={styles.socialMediaContainer}>
				<TouchableOpacity onPress={() => {}}>
					<Image style={styles.googleImage} source={googleLogo} />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => {}}>
					<Image style={styles.facebookImage} source={facebookLogo} />
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	image: {
		justifyContent: "center",
		width: "100%",
		height: "100%",
		resizeMode: "center",
	},

	imageContainer: {
		width: "100%",
		height: "30%",
	},

	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	label: {
		color: "#4d7861",
		marginLeft: 41,
	},

	input: {
		margin: 5,
		height: 50,
		width: 340,
		borderColor: "#7a42f4",
		paddingHorizontal: 15,
		borderWidth: 0.1,
		borderRadius: 2,
		marginLeft: 41,
		marginRight: 41,
		paddingVertical: 1,
		fontSize: 16,
		color: "#4d7861",
		backgroundColor: "#ffff",
	},
	button: {
		backgroundColor: "#28CD41",
		padding: 10,
		width: 380,
		borderRadius: 10,
		width: 340,
		marginLeft: 41,
		marginRight: 41,
		marginTop: 5,
		paddingVertical: 18,
	},
	buttonText: {
		color: "#FFF",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
	loginText: {
		fontWeight: "bold",
		textAlign: "left",
		color: "#364D39",
		fontSize: 30,
		lineHeight: 30,
		textTransform: "uppercase",
		marginLeft: 41,
		paddingVertical: 30,
	},
	forgotPassword: {
		textAlign: "right",
		marginRight: 41,
		textDecorationLine: "underline",
		color: "#4d7861",
		paddingVertical: 7.5,
	},
	orText: {
		color: "#4d7861",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
		paddingVertical: 7.5,
	},
	socialMediaContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
	},
	googleImage: {
		width: 50,
		height: 50,
		marginRight: 7,
	},

	facebookImage: {
		width: 36,
		height: 36,
		marginTop: 4,
		marginLeft: 7,
	},
	errorMessage: {
		textAlign: "left",
		marginLeft: 41,
		color: "red",
		paddingVertical: 7.5,
	},
});
