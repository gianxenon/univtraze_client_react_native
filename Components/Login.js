import {
	KeyboardAvoidingView,
	Image,
	StyleSheet,
	TextInput,
	View,
	TouchableOpacity,
	Text,
	Alert,StatusBar
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

import { SafeAreaView } from "react-native-safe-area-context";
const Login = ({ navigation }) => {
	const image = {
		uri: "https://firebasestorage.googleapis.com/v0/b/tcuhub-cf9e1.appspot.com/o/images%2Flogin_image.png?alt=media&token=ebb53e48-2bc0-485d-8456-fe8a31683061",
	};
	const googleLogo = {
		uri: "https://firebasestorage.googleapis.com/v0/b/tcuhub-cf9e1.appspot.com/o/images%2Fgoogle-icon3.png?alt=media&token=61a34454-dda9-4b6d-8dc6-198bb59ccbfb",
	};
	const facebookLogo = {
		uri: "https://firebasestorage.googleapis.com/v0/b/tcuhub-cf9e1.appspot.com/o/images%2Ffacebook-icons.png?alt=media&token=0ec86a8b-f095-40dd-b4e9-4b31b2846068",
	};

	const val = useContext(AuthContext);

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");

	async function save(key, value) {
		await SecureStore.setItemAsync(key, value);
	}

	const loginNow = async () => {
		if (emailInput === "") {
			setError(true);
			setErrorMessage("Please input your email address");
		} else {
			let re =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (re.test(emailInput)) {
				if (passwordInput === "") {
					setError(true);
					setErrorMessage("Please input password");
				} else if (passwordInput.length < 7) {
					setError(true);
					setErrorMessage("Password field Minimum of 8 characters");
				} else {
					//Data checking with api

					const data = {
						email: emailInput,
						password: passwordInput,
					};
					await axios
						.post("https://univtraze.herokuapp.com/api/user/login", data)
						.then((response) => {
							const success = response.data.success;

							if (success === 0) {
								setError(true);
								setErrorMessage(response.data.data);
							} else {
								setError(false);
								save("x-token", response.data.token);
								setEmailInput("");
								setPasswordInput("");
								navigation.navigate("Dashboard");
							}
						});
				}
			} else {
				setError(true);
				setErrorMessage("Invalid email address");
			}
		}
	};

	return (

	
			<SafeAreaView style = {{backgroundColor :"#E1F5E4"}}>
			<StatusBar animated={true} backgroundColor="#E1F5E4" />
			<KeyboardAvoidingView style={styles.container} behavior="height">
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={image} />
			</View>
		
			<View style={styles.inputContainer}>
				<Text style={styles.loginText}>Log in</Text>

				<Text style={styles.label}>Email</Text>
				<TextInput
					placeholder="Email Address"
					defaultValue={emailInput}
					onChangeText={(text) => {
						setEmailInput(text);
					}}
					style={styles.input}
				/>

				<Text style={styles.label}>Password</Text>
				<TextInput
					placeholder="Password"
					defaultValue={passwordInput}
					onChangeText={(text) => {
						setPasswordInput(text);
					}}
					style={styles.input}
					secureTextEntry
				/>

				{error ? (
					<Text style={styles.errorMessage}>*{errorMessage}</Text>
				) : (
					<Text style={styles.errorMessage}></Text>
				)}

				<Text style={styles.forgotPassword}>Forgot Password?</Text>
			</View>

			<View style={styles.buttonContainer}>
			{/* onPress={() => loginNow()} */}
				<TouchableOpacity  onPress={() =>	navigation.navigate("Dashboard")} style={styles.button}>
					<Text style={styles.buttonText}>Log in</Text>
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
			</SafeAreaView>
		
	
	);
};

export default Login;

const styles = StyleSheet.create({
	image: {
		justifyContent: "center",
		width: "100%",
		height: "100%",
		resizeMode: "center",
		marginTop:10
	},

	imageContainer: {
		width: "100%",
		height: "30%",
	},

	container: {
		height:'100%',
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
	errorMessage: {
		textAlign: "left",
		marginLeft: 41,
		color: "red",
		paddingVertical: 7.5,
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
});
