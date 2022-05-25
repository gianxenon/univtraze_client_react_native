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
	StatusBar
} from "react-native";
import React, { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DatePicker from "react-native-datepicker";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpUserCredentialsStudent = ({ navigation }) => {
	const [date, setDate] = useState("");
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

	const [studentNumber, setStudentNumber] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");

	const [year, setYear] = useState("");
	const [section, setSection] = useState("");


	
	return (
		<SafeAreaView>
		<StatusBar animated={true} backgroundColor="#E1F5E4" barStyle='dark-content'/>
			<KeyboardAvoidingView
				style={{ backgroundColor: "#E1F5E4", height: "100%" }}
			>
				<View style={styles.header}>
					<Image
						source={require("../assets/reg_identifier.png")}
						resizeMode="contain"
						style={{ width: "80%", height: "80%" }}
					/>
				</View>

				<ScrollView style={styles.inputContainer}>
					<View
						style={{
							width: "100%",
							alignItems: "center",
							backgroundColor: "#E1F5E4",
						}}
					>
						<Text style={styles.label}>Student no.{studentNumber}</Text>
						<TextInput
							placeholder="Student no."
							defaultValue={""}
							onChangeText={(text) => {
								//	setStudentNumber(text);
							}}
							style={styles.input}
						/>
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>First name {firstName}</Text>
						<TextInput
							placeholder="First name"
							defaultValue={""}
							onChangeText={(text) => {
								//		setFirstName(text);
							}}
							style={styles.input}
						/>
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Middle name {middleName}</Text>
						<TextInput
							placeholder="Middle name"
							defaultValue={""}
							onChangeText={(text) => {
								//	setMiddleName(text);
							}}
							style={styles.input}
						/>
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Last name {lastName}</Text>
						<TextInput
							placeholder="Last name"
							defaultValue={""}
							onChangeText={(text) => {
								//	setLastName(text);
							}}
							style={styles.input}
						/>
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Address{address}</Text>
						<TextInput
							placeholder="Address"
							defaultValue={""}
							onChangeText={(text) => {
								//setAddress(text);
							}}
							style={styles.input}
						/>
					</View>

					<View
						style={{ width: "100%", alignItems: "center", borderRadius: 15 }}
					>
						<Text style={styles.label}>Date of birth</Text>

						<DatePicker
							style={styles.datePickerStyle}
							date={date} //initial date from state
							mode="date" //The enum of date, datetime and time
							placeholder="Select date"
							placeHolderTextStyle={{ color: "#cc0000" }}
							format="DD-MM-YYYY"
							minDate="01-01-1800"
							maxDate="01-01-3000"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
								dateIcon: {
									//display: 'none',
									//	position: "absolute",
									//	left: 0,
									//	top: 4,
									//marginLeft: 0,
									justifyContent: "flex-end",
								},
								dateInput: {
									marginLeft: 10,
									borderColor: "transparent",
									alignItems: "flex-start",
									color: "#4d7861",
								},
								placeholderText: {
									fontSize: 16,
									color: "#949494",
								},
							}}
							onDateChange={(date) => {
								setDate(date);
							}}
						/>
					</View>

					<View
						style={{
							width: "100%",
							alignItems: "center",
							borderRadius: 15,
							overflow: "hidden",
						}}
					>
						<Text style={styles.label}>Year and section {year}</Text>
						<TextInput
							placeholder="Year and section"
							defaultValue={""}
							onChangeText={(text) => {
								//	setYear(text);
							}}
							style={styles.input}
						/>
					</View>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							marginBottom: 20,
						}}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Home");
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
								navigation.navigate("SignStudPartTwo");
							}}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Next</Text>
						</TouchableOpacity>
					</View>
				
					{/* {
                    error? 
                    <Text style={styles.errorMessage}>*{errorMessage}</Text>
                    :
                    <Text style={styles.errorMessage}></Text>
                } */}
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SignUpUserCredentialsStudent;

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "20%",

		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
	},
	body: {
		width: "100%",
		height: "100%",
		borderColor: "gray",
		justifyContent: "center",
		alignItems: "center",
	},
	label: {
		width: "80%",
		textAlign: "left",
	},
	button: {
		backgroundColor: "#28CD41",
		padding: 10,
		width: "80%",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	backbutton: {
		paddingTop: 10,

		marginLeft: 40,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		alignContent: "center",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#ffff",
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
		marginLeft: "auto",
		marginRight: 41,
	},
	buttonText: {
		color: "#FFF",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
		textTransform: "uppercase",
	},
	datePickerStyle: {
		width: "80%",
		height: 50,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: "white",
		borderColor: "#28CD41",
		justifyContent: "center",
	},
});
