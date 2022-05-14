import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { Card } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const ApiTester = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [data, setData] = useState("");

	const [key, setKey] = React.useState("");
	const [value, setValue] = React.useState("");

	async function save(key, value) {
		await SecureStore.setItemAsync(key, value);
	}

	async function getValueFor() {
		let result = await SecureStore.getItemAsync(key);
		if (result) {
			setData(result);
		} else {
			alert("No values stored under that key.");
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>Login{data}</Text>
			<Card>
				<TextInput
					placeholder="email"
					style={{ padding: 10, borderWidth: 1 }}
					onChange={(e) => {
						setKey(e.target.value);
					}}
				/>
				<TextInput
					placeholder="password"
					secureTextEntry
					style={{ padding: 10, borderWidth: 1 }}
					onChange={(e) => {
						setValue(e.target.value);
					}}
				/>
				<TouchableOpacity
					// onPress={RegDataInDB}
					style={{
						marginTop: 10,
						justifyContent: "center",
						alignItems: "center",
						padding: 10,
						borderWidth: 1,
					}}
					onPress={() => save(key, value)}
				>
					<Text>Login</Text>
				</TouchableOpacity>
			</Card>
		</View>
	);
};

export default ApiTester;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "#ecf0f1",
		padding: 8,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
});
