import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	FlatList,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SignUpUserCredentialsEmployee = () => {
	const [studentNumber, setstudentNumber] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [year, setYear] = useState("");
	const [section, setSection] = useState("");

	return (
		<KeyboardAvoidingView
			style={{ backgroundColor: "#E1F5E4", height: "100%" }}
		>
			<View style={styles.header}>
				<Text>Header Here</Text>
			</View>

			<ScrollView style={styles.inputContainer}>
				<View
					style={{
						width: "100%",
						alignItems: "center",
						backgroundColor: "#E1F5E4",
					}}
				>
					<Text style={styles.label}>Employee no.</Text>
					<TextInput
						placeholder="Student no."
						defaultValue={""}
						onChangeText={(text) => {}}
						style={styles.input}
					/>
				</View>

				<View style={{ width: "100%", alignItems: "center", borderRadius: 15 }}>
					<Text style={styles.label}>First name</Text>
					<TextInput
						placeholder="First name"
						defaultValue={""}
						onChangeText={(text) => {}}
						style={styles.input}
					/>
				</View>

				<View style={{ width: "100%", alignItems: "center", borderRadius: 15 }}>
					<Text style={styles.label}>Middle name</Text>
					<TextInput
						placeholder="Middle name"
						defaultValue={""}
						onChangeText={(text) => {}}
						style={styles.input}
					/>
				</View>

				<View style={{ width: "100%", alignItems: "center", borderRadius: 15 }}>
					<Text style={styles.label}>Last name</Text>
					<TextInput
						placeholder="Last name"
						defaultValue={""}
						onChangeText={(text) => {}}
						style={styles.input}
					/>
				</View>

				<View style={{ width: "100%", alignItems: "center", borderRadius: 15 }}>
					<Text style={styles.label}>Address</Text>
					<TextInput
						placeholder="Address"
						defaultValue={""}
						onChangeText={(text) => {}}
						style={styles.input}
					/>
				</View>

				<View style={{ width: "100%", alignItems: "center", borderRadius: 15 }}>
					<Text style={styles.label}>Date of birth</Text>
					<TextInput
						placeholder="Date of birth"
						defaultValue={""}
						onChangeText={(text) => {}}
						style={styles.input}
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
					<Text style={styles.label}>Year and section</Text>
					<TextInput
						placeholder="Year and section"
						defaultValue={""}
						onChangeText={(text) => {}}
						style={styles.input}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate(null);
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
	);
};

export default SignUpUserCredentialsEmployee;

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: "20%",

		borderColor: "gray",
		justifyContent: "center",
		alignItems: "center",
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
		marginVertical: 50,
		paddingVertical: 18,
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
});
