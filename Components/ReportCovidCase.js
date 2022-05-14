import reactDom from "react-dom";
import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import * as SecureStore from "expo-secure-store";

const ReportCovidCase = ({ navigation }) => {
	const menu_jpg = {
		uri: "https://firebasestorage.googleapis.com/v0/b/fir-phoneauth-74be7.appspot.com/o/menu.png?alt=media&token=e20ee94a-4632-467a-841c-c66659a2a3df",
	};
	const notif_jpg = {
		uri: "https://firebasestorage.googleapis.com/v0/b/fir-phoneauth-74be7.appspot.com/o/notification.png?alt=media&token=15a47e29-e6c6-4459-aea3-32e6fc1b4ca9",
	};
	const [isChecked, setIsChecked] = useState(true);
	const [token, setToken] = useState("");

	useEffect(() => {
		getValueFor("x-token");
	}, []);

	async function getValueFor(key) {
		let result = await SecureStore.getItemAsync(key);
		if (result) {
			setToken(result);
		} else {
			alert("No values stored under that jwt-token.");
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<View style={styles.menuLogo}>
					<ImageBackground
						source={menu_jpg}
						resizeMode="contain"
						style={styles.image}
					></ImageBackground>
				</View>

				<View style={styles.notifLogo}>
					<ImageBackground
						source={notif_jpg}
						resizeMode="contain"
						style={styles.image}
					></ImageBackground>
				</View>
			</View>

			<View style={styles.bodyContainer}>
				<View style={{ paddingVertical: 10 }}>
					<Text style={styles.reportCovidText}>Report a covid {"\n"}case</Text>
				</View>

				<View style={{ paddingVertical: 5 }}>
					<Text style={styles.bodyText}>Are you a covid positive?</Text>
					<Text style={styles.bodyText}>
						Let us know by reporting a case below
					</Text>
				</View>

				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingStart: 40,
						marginTop: 15,
						paddingVertical: 5,
					}}
				>
					<RadioButton
						value="Student"
						status={isChecked ? "checked" : "unchecked"}
						onPress={() => setIsChecked(true)}
					/>
					<Text style={styles.radioLabel}>I am a covid positive</Text>
				</View>

				<Text style={styles.bodyText}>Case number</Text>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<TextInput style={styles.caseNumberInput} placeholder="Case number" />
				</View>

				<View style={styles.uploadButtonContainer}>
					<TouchableOpacity onPress={() => {}} style={styles.uploadProofButton}>
						<Text style={{ textAlign: "center", padding: 5 }}>
							Upload proof here
						</Text>
					</TouchableOpacity>
				</View>

				<View
					style={{
						width: "80%",
						alignSelf: "center",
						alignItems: "center",
						marginTop: "auto",
						marginBottom: 0,
					}}
				>
					<TouchableOpacity onPress={() => {}} style={styles.button}>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
export default ReportCovidCase;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E1F5E4",
		height: "100%",
	},
	menuLogo: {
		height: "50%",
		width: "20%",

		justifyContent: "center",
		alignItems: "center",
	},
	notifLogo: {
		height: "50%",
		width: "20%",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	topContainer: {
		marginTop: 80,
		zIndex: 1,
		width: "100%",
		height: 130,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingStart: 40,
		paddingEnd: 40,
	},

	bodyContainer: {
		width: "100%",
		height: "80%",
		paddingBottom: 70,
	},
	topTextContainer: {
		width: "100%",
		height: "auto",
		paddingStart: 43,
		justifyContent: "center",
	},
	reportCovidText: {
		fontSize: 28,
		fontWeight: "bold",
		marginLeft: 41,
	},
	scrllBtnsContainer: {
		width: "100%",
		height: "20%",
		flexDirection: "row",
	},
	btnScnQr: {
		width: 150,
		height: "100%",
		marginStart: 20,
		marginEnd: 15,
	},
	btnRepCovidTest: {
		width: 150,
		height: "100%",

		marginStart: 20,
		marginEnd: 15,
	},
	confirmCasesCard: {
		width: 164,
		height: 86,
		borderRadius: 20,
		backgroundColor: "white",
		shadowColor: "black",
		elevation: 20,
		padding: 10,
	},
	bodyText: {
		marginLeft: 41,
	},
	radioLabel: {},
	caseNumberInput: {
		margin: 5,
		height: 50,
		width: "80%",
		borderColor: "#7a42f4",
		paddingHorizontal: 15,
		borderWidth: 0.1,
		borderRadius: 3,
		marginLeft: 41,
		marginRight: 41,
		paddingVertical: 1,
		fontSize: 16,
		color: "#4d7861",
		backgroundColor: "#ffff",
	},
	uploadButtonContainer: {
		alignSelf: "flex-end",
		marginRight: 41,
	},
	uploadProofButton: {
		backgroundColor: "#C4C4C4",
		width: 150,
		borderRadius: 5,
	},
	button: {
		backgroundColor: "#28CD41",
		padding: 10,
		borderRadius: 10,
		width: "100%",
		paddingVertical: 18,
		shadowColor: "black",
		elevation: 10,
	},
	buttonText: {
		color: "#FFF",
		fontStyle: "normal",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
});
