import {
	StyleSheet,
	Text,
	View,
	Button,
	ImageBackground,
	TouchableOpacity, StatusBar
} from "react-native";
import { RadioButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";

const image = {
	uri: "https://firebasestorage.googleapis.com/v0/b/tcuhub-cf9e1.appspot.com/o/images%2Famico.png?alt=media&token=45feb25c-00e8-43f6-8189-2c83cb0175a3",
};

const SignUpUserType = ({ navigation }) => {
	const [isChecked, setIsChecked] = useState("Student");

	const [token, setToken] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userType, setUserType] = useState("");
	const [userId, setUserId] = useState(0);

	useEffect(() => {
		getValueFor("x-token");
	}, []);

	async function getValueFor(key) {
		let result = await SecureStore.getItemAsync(key);
		if (result) {
			setToken(result);
			decodeJwt(result);
		} else {
			alert("No values stored under that jwt-token.");
		}
	}

	// const decodeJwt = async (currentToken) => {
	// 	const decodedJwt = jwt_decode(currentToken);

	// 	if (decodedJwt.result.type !== null) {
	// 		if (decodedJwt.result.type === "Student") {
	// 			navigation.navigate("SignUpUserCredentialsStudent");
	// 			return;
	// 		} else if (decodedJwt.result.type === "Employee") {
	// 			navigation.navigate("SignUpUserCredentialsEmployee");
	// 			return;
	// 		} else {
	// 			navigation.navigate("SignUpUserCredentialsVisitor");
	// 			return;
	// 		}
	// 	}

	// 	setUserEmail(decodedJwt.result.email);
	// 	setUserType(decodedJwt.result.type);
	// 	setUserId(decodedJwt.result.id);
	// };

	const SubmitUserType = () => {
		if (isChecked === "Student") {
			navigation.navigate("SignUpUserCredentialsStudent");
		}

		if (isChecked === "Employee") {
			navigation.navigate("SignUpUserCredentialsEmployee");
		}

		if (isChecked === "Visitor") {
			navigation.navigate("SignUpUserCredentialsVisitor");
		}
	};
	// const SubmitUserType = async () => {

	// 	// const config = {
	// 	// 	headers: { Authorization: `Bearer ${token}` },
	// 	// };

	// 	// const data = {
	// 	// 	id: userId,
	// 	// 	type: isChecked,
	// 	// };
	// 	// await axios
	// 	// 	.post(
	// 	// 		"https://univtraze.herokuapp.com/api/user/updateUserType",
	// 	// 		data,
	// 	// 		config
	// 	// 	)
	// 	// 	.then((response) => {
	// 	// 		const success = response.data.success;

	// 	// 		if (success === 0) {
	// 	// 			console.log("Error" + response.data);
	// 	// 		} else {
	// 	// 			if (isChecked === "Student") {
	// 	// 				navigation.navigate("SignUpUserCredentialsStudent");
	// 	// 			}

	// 	// 			if (isChecked === "Employee") {
	// 	// 				navigation.navigate("SignUpUserCredentialsEmployee");
	// 	// 			}

	// 	// 			if (isChecked === "Visitor") {
	// 	// 				navigation.navigate("SignUpUserCredentialsVisitor");
	// 	// 			}
	// 	// 		}
	// 	// 	});
	// };

	return (
		<View style={styles.mainView}>
			{/* <Text>SignUpUserTypess</Text> */}
			<StatusBar animated={true} backgroundColor="#E1F5E4" barStyle='dark-content' />
			<View style={styles.topContainer}>
				<ImageBackground
					source={image}
					resizeMode="contain"
					style={styles.SignUpUserTypeLogo}
				></ImageBackground>
			</View>

			<View style={styles.botContainer}>
				<Text style={styles.botContainTxt1}>Welcome to {"\n"}UnivTraze</Text>
				<Text style={styles.botContainSubtxt}>
					Before we continue, we are happy {"\n"}to know you more
				</Text>

				<View style={styles.radioBox}>
					<Text style={styles.radioTtl}>Please select below</Text>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingStart: 40,
							marginTop: 15,
						}}
					>
						<RadioButton
							value="Student"
							status={isChecked === "Student" ? "checked" : "unchecked"}
							onPress={() => setIsChecked("Student")}
						/>
						<Text style={styles.radioLabel}>Student</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingStart: 40,
						}}
					>
						<RadioButton
							value="Employee"
							status={isChecked === "Employee" ? "checked" : "unchecked"}
							onPress={() => setIsChecked("Employee")}
						/>
						<Text style={styles.radioLabel}>Employee</Text>
					</View>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingStart: 40,
						}}
					>
						<RadioButton
							value="Visitor"
							status={isChecked === "Visitor" ? "checked" : "unchecked"}
							onPress={() => setIsChecked("Visitor")}
						/>
						<Text style={styles.radioLabel}>Visitor</Text>
					</View>

					<TouchableOpacity
						onPress={() => {
							SubmitUserType();

						}}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Next</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default SignUpUserType;

const styles = StyleSheet.create({
	mainView: {
		width: "100%",
		height: "100%",
		backgroundColor: "#E1F5E4",
		alignItems: "center",
	},
	topContainer: {
		marginTop: 50,
		width: "100%",
		height: "35%",
		justifyContent: "center",
		alignItems: "center",
	},
	SignUpUserTypeLogo: {
		width: "100%",
		height: "90%",
		marginTop: 40,
	},
	botContainer: {
		width: "100%",
		height: "65%",
	},
	botContainTxt1: {
		marginStart: 40,
		fontSize: 28,
		fontWeight: "bold",
	},
	botContainSubtxt: {
		marginStart: 40,
		marginTop: 20,
		fontSize: 16,
		lineHeight: 25,
	},
	radioBox: {
		width: "100%",
		height: "100%",
	},
	radioTtl: {
		fontSize: 18,
		marginStart: 40,
		marginTop: 20,
		fontWeight: "700",
	},
	radioLabel: {
		fontSize: 16,
	},
	button: {
		backgroundColor: "#28CD41",
		padding: 10,
		width: "80%",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		marginVertical: 50,
		paddingVertical: 18,
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#ffff",
	},
});
