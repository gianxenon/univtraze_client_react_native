import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	FlatList,
	ScrollView,
	KeyboardAvoidingView,
	Image,
	ImageBackground,
	Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DatePicker from "react-native-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	borderColor,
	color,
} from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { render } from "react-dom";
import * as DocumentPicker from "expo-document-picker";
const SignEmpPartTwo = ({ navigation }) => {
	const [date, setDate] = useState("09-10-2020");
	const [token, setToken] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userType, setUserType] = useState("");
	const [userId, setUserId] = useState(0);
	const [idUploaded, setIdUploaded] = useState('');
	const [stIdUploaded, setstIdUploaded] = useState('');
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

	const [studentNumber, setStudentNumber] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");

	const [year, setYear] = useState("");
	const [section, setSection] = useState("");

	const pickDocument = async () => {
		let result = await DocumentPicker.getDocumentAsync({});
		console.log(result.uri);
		console.log(result);
	};

	
	return (
		<SafeAreaView style={{ backgroundColor: "#E1F5E4" }}>
			<View style={{ height: "100%" }}>
				<View style={styles.header}>
					<Image
						source={require("../assets/reg2_identifier.png")}
						resizeMode="contain"
						style={{ width: "80%", height: "80%" }}
					/>
				</View>
				<ScrollView
					style={{
						flexDirection: "column",
					}}
				>
					<KeyboardAvoidingView style={{ height: "100%" }}>
						<View
							style={{
								alignItems: "center",
								backgroundColor: "#E1F5E4",
							}}
						>
							<Text style={styles.label}>Employee no.{studentNumber}</Text>
							<TextInput
								placeholder="Employee no."
								defaultValue={""}
								onChangeText={(text) => {
									//	setStudentNumber(text);
								}}
								style={styles.input}
							/>
						</View>
						<View
							style={{
								paddingHorizontal: 40,
								marginVertical: 15,
							}}
						>
							<Text style={{ marginVertical: 15 }}>I.D picture</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<TouchableOpacity
									style={{
										width: 145,
										height: 44,
										backgroundColor: "#C7C7C7",
										justifyContent: "center",
										alignItems: "center",
										borderRadius: 10,
									}}
									onPress={pickDocument}
								>
									<Text>Upload your File</Text>
								</TouchableOpacity>
								<Text>{idUploaded}</Text>
							</View>
						</View>
						<View
							style={{
								paddingHorizontal: 40,
							}}
						>
							<Text style={{ marginVertical: 15 }}>Employee I.D</Text>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								}}
							>
								<TouchableOpacity
									style={{
										width: 145,
										height: 44,
										backgroundColor: "#C7C7C7",
										justifyContent: "center",
										alignItems: "center",
										borderRadius: 10,
									}}
									onPress={pickDocument}
								>
									<Text>Upload your File</Text>
								</TouchableOpacity>
								<Text>{stIdUploaded}</Text>
							</View>
						</View>

						{/* {
							error? 
							<Text style={styles.errorMessage}>*{errorMessage}</Text>
							:
							<Text style={styles.errorMessage}></Text>
						} */}
					</KeyboardAvoidingView>
				</ScrollView>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingHorizontal: 40,
						marginBottom: 40,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("SignUpUserCredentialsEmployee");
						}}
						style={styles.backbutton}
					>
						<Image
							source={require("../assets/back-icon.png")}
							style={{ width: 60, height: 60 }}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							navigation.navigate("SignEmpPartThree");
						}}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Next</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
}

export default SignEmpPartTwo

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "20%",

		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
	},

	label: {
		width: "80%",
		textAlign: "left",
	},
	backbutton: {
		paddingTop: 10,
	},
	input: {
		margin: 5,
		width: "80%",
		height: 50,
		borderColor: "#28CD41",
		paddingHorizontal: 15,
		borderWidth: 1,
		borderRadius: 10,
		overflow: "hidden",
		paddingVertical: 1,
		fontSize: 16,
		color: "#4d7861",
		backgroundColor: "#ffff",
	},
	button: {
		backgroundColor: "#28CD41",
		padding: 10,
		borderRadius: 10,
		marginTop: 5,
		paddingVertical: 18,
		width: 122,
		height: 60,
	},
	buttonText: {
		color: "#FFF",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
		textTransform: "uppercase",
	},
});