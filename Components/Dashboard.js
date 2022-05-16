import reactDom from "react-dom";
import {
	StyleSheet,
	Text,
	View,
	Modal,
	Pressable,
	ImageBackground,
	Image,
	TouchableOpacity,
	ScrollView,
	Picker,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "react-native-chart-kit";
import moment from "moment";
import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";
import { BottomSheet } from "react-native-btr";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = ({ navigation }) => {
	const menu_jpg = {
		uri: "https://firebasestorage.googleapis.com/v0/b/fir-phoneauth-74be7.appspot.com/o/menu.png?alt=media&token=e20ee94a-4632-467a-841c-c66659a2a3df",
	};
	const notif_jpg = {
		uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279116408_686597809106370_5704419941564041151_n.png?_nc_cat=109&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeFzyXy1YuNR3W0bBoMIYyfLvnc5UDGkUZi-dzlQMaRRmL_hYEzaszZRVqAUnWzcFyXwISDyYVKWyg0XKpJIEVDi&_nc_ohc=Cz2l3xzmqo4AX9JKu8N&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVKXNntkgxIIZmUnezWtPUVvc3QOkZrKTeVTw_zxNFVyyQ&oe=6295EB65",
	};
	const reportCovid_jpg = {
		uri: "https://firebasestorage.googleapis.com/v0/b/fir-phoneauth-74be7.appspot.com/o/covid-card.png?alt=media&token=55bdc71d-9050-48de-b936-7eb575c13497",
	};
	const scanQr_jpg = {
		uri: "https://firebasestorage.googleapis.com/v0/b/fir-phoneauth-74be7.appspot.com/o/scan-card.png?alt=media&token=c1451297-f93c-4b51-83e0-d216c6f92ea4",
	};
	const emergency_jpg = {
		uri: "https://scontent.fmnl17-4.fna.fbcdn.net/v/t1.15752-9/278360019_410213990541569_5676977328674027556_n.png?_nc_cat=111&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeFy8iKBCGEXwdRts31TXlYyvOJTyLW59Xq84lPItbn1eknc1KqYomUtdwmUePCDpAElJAbQSudPhWGgha9f5Eij&_nc_ohc=9LzMiwfcscYAX8QPuO9&_nc_ht=scontent.fmnl17-4.fna&oh=03_AVJQ458oIdCugWuK7heO0a49nrJdhnkhpEm2DKf0no1t5A&oe=628DE2C9",
	};
	const dp_uri = {
		uri: "https://thecinemaholic.com/wp-content/uploads/2021/01/nezuu-e1638963260523.jpg",
	};
	const covidCasesbg_jpg = {
		uri: "https://scontent.fmnl17-4.fna.fbcdn.net/v/t1.15752-9/279153864_282210844128048_8829699584446625304_n.png?_nc_cat=104&ccb=1-5&_nc_sid=ae9488&_nc_eui2=AeGTIQkbiwV2nF1RUa-gEVR0WawulfsWmtlZrC6V-xaa2ZAkW6-OUvopn_QLQp58rwq6NTJgS60FKw206S4CMwCj&_nc_ohc=I1f22mquadkAX8TjhAU&_nc_ht=scontent.fmnl17-4.fna&oh=03_AVJEVduV5eadPuWXZEDtdWKaEGRwwalExbKJ_fHCiY_Hjg&oe=628E9508",
	};
	const dashboard_icon = {
		uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279432036_4916433748455571_7650663705710159528_n.png?stp=cp0_dst-png&_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeGejvNW7qCmkoxnj3EHwIChP5LpXi4CABc_kuleLgIAF5kmogSluSVtd3_oGy5orToBm8Vg4CAOkr2EPNIjQrHF&_nc_ohc=P6qhrT5Z2PAAX_hH2Lq&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIirDxmpsySUbKKhsB3snXC-7Z6tK2iPF5CRer6UKEs4g&oe=6296145E",
	};
	const updateProfile_icon = {
		uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279044283_992261191656856_2558417864094669647_n.png?stp=cp0_dst-png&_nc_cat=105&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeGlBRZbPbMCpA5brsJIYChdjISzaE6_wdWMhLNoTr_B1ZbCRNmZ3FzaAzxR2m6haPRXnxO_pxAFG3NzL1oo-5pc&_nc_ohc=s0A9PLEGbwQAX_kWtnJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIUV28fhicwUehusYl6y-8HHdawibTqK4iQy8fyWcedGw&oe=629694DC",
	};
	const accountsettings_icon = {
		uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279441655_554948112655667_9017582647265493574_n.png?stp=cp0_dst-png&_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeF-yvkvyig9gIU3MyORXk60UE3lQ6Gtr_hQTeVDoa2v-I0dnyXfiNKw7zGjqvjWc7MvMCOcLOPvo5Xnu924Iu89&_nc_ohc=0xV7eqUS2DQAX_gnp53&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIWC2BME5UKTub-5CA-2hTryPT8eDDTBDTdStmtpjx_XA&oe=6293D346",
	};
	const roomVisited_icon = {
		uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279569905_402917014750329_8895176097173168861_n.png?stp=cp0_dst-png&_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeFuIwwqOF2nJmjldxjgniMYdH7yglkTqtF0fvKCWROq0Sq6DxqoUF4xknfks2GLkmjf1xGOU5HZNhALWpS64eZM&_nc_ohc=jLLRiraXJosAX-7-WTX&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVLLtHZv18YQDszKqZ-ly8aBeFdT83q5Pmhh9SNnNlZd1g&oe=6296C244",
	};
	const logOut_icon = {
		uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/278976870_569950300996604_5811195864626421983_n.png?stp=cp0_dst-png&_nc_cat=102&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeGWh79W5o1WRLnA28OKFjRieX6E6HcImZJ5foTodwiZkjoijiyP5pdKryaQZBxRL6pjtYtajsefd9lr211QfMV7&_nc_ohc=rOJwkiGhtgsAX-PKrDV&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVI9DgZMz4KSZgD6xRFxlDARxHBkdFBP2Qq8zkL7C4gEsQ&oe=62931AB6",
	};
	const dailyAssessment_icon = {
		uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279002448_550781369781927_3622440211963300813_n.png?_nc_cat=106&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeE-izL_G5AtGlIG4Axq5VLlr9q1EbQWTIuv2rURtBZMiyLgb2QbCnyjQk4TdD8_jQRkybG68lcODEIEDPtA2OFd&_nc_ohc=oS01z-5unXYAX8eWM6g&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVLrLnMYagjZea4H2x45QEhTCA0rwSti2wu0Ie7CJYNYTw&oe=6294C2DF",
	};

	const [population, setPopulation] = useState(0);
	const [cases, setCases] = useState(0);
	const [activeCases, setActiveCases] = useState(0);
	const [recovered, setRecovered] = useState(0);
	const [deaths, setDeaths] = useState(0);

	const [token, setToken] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [userType, setUserType] = useState("");
	const [notificationCounts, setNotificationCounts] = useState(1);

	const [visible, setVisible] = useState(false);
	const [notifVisible, setNotifVisible] = useState(false);

	const toggleBottomNavigationView = () => {
		//Toggling the visibility state of the bottom sheet
		setVisible(!visible);
	};

	const toggleNotifNavigationView = () => {
		//Toggling the visibility state of the bottom sheet
		setNotifVisible(!notifVisible);
	};

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

	const decodeJwt = (currentToken) => {
		var decodedToken = jwtDecode(currentToken);

		setUserEmail(decodedToken.result.email);
		setUserType(decodedToken.result.type);

		if (decodedToken.result.type === null) {
			navigation.navigate("SignUpUserType");
			return;
		}

		getUserDetails(decodedToken.result.id, currentToken);
	};

	const getUserDetails = async (userId, currentToken) => {
		const config = {
			headers: { Authorization: `Bearer ${currentToken}` },
		};

		await axios
			.get(`https://univtraze.herokuapp.com/api/user/${userId}`, config)
			.then((response) => {
				const success = response.data.success;

				if (success === 0) {
					console.log("Error" + response.data);
				} else {
					console.log(response.data);
					// navigation.navigate('SignUpUserCredentials')
				}
			});
	};

	useEffect(() => {
		GetCovidUpdate();
	}, []);

	const GetCovidUpdate = () => {
		axios
			.get("https://disease.sh/v3/covid-19/countries/PH?strict=true")
			.then((response) => {
				setPopulation(response.data.population);
				setActiveCases(response.data.active);
				setCases(response.data.cases);
				setRecovered(response.data.recovered);
				setDeaths(response.data.deaths);
			});
	};

	const [modalVisible, setModalVisible] = useState(false);

	// Return
	return (
		<SafeAreaView>
			<View style={styles.container}>
				{/* Notification View */}
				<View style={styles.topContainer}>
					<View style={styles.menuLogo}>
						<TouchableWithoutFeedback onPress={toggleBottomNavigationView}>
							<ImageBackground
								source={menu_jpg}
								resizeMode="contain"
								style={styles.image}
							></ImageBackground>
						</TouchableWithoutFeedback>
					</View>

					<View style={styles.notifLogo}>
						<TouchableWithoutFeedback onPress={toggleNotifNavigationView}>
							<ImageBackground
								source={notif_jpg}
								resizeMode="contain"
								style={{ width: "75%", height: "75%" }}
							>
								{notificationCounts === 0 ? null : (
									<Text
										style={{
											backgroundColor: "red",
											width: 20,
											borderRadius: 100,
											textAlign: "center",
											color: "white",
											shadowColor: "#3F3D3D",
											borderWidth: 1,
											borderColor: "white",
											elevation: 20,
										}}
										onPress={toggleNotifNavigationView}
									>
										{notificationCounts}
									</Text>
								)}
							</ImageBackground>
						</TouchableWithoutFeedback>
					</View>
					{/*bottom navigation for user settings  */}
					<BottomSheet
						visible={visible}
						onBackButtonPress={toggleBottomNavigationView}
						onBackdropPress={toggleBottomNavigationView}
					>
						{/*Bottom Sheet inner View*/}
						<View style={styles.bottomNavigationView}>
							<View style={{ width: "100%", height: "100%" }}>
								<View
									style={{
										width: "100%",
										height: "25%",
										justifyContent: "center",
										padding: 15,
										flexDirection: "row",
										marginTop: 40,
									}}
								>
									<View
										style={{
											width: "20%",
											height: "100%",
											borderColor: "white",
											borderWidth: 3,
											borderRadius: 100,
											shadowColor: "black",
											elevation: 20,
											marginStart: 40,
										}}
									>
										<Image
											source={dp_uri}
											resizeMode="cover"
											style={{
												width: "100%",
												height: "100%",
												borderRadius: 100,
											}}
										/>
									</View>
									<View style={{ width: "75%", padding: 10 }}>
										<Text style={{ fontSize: 22, fontWeight: "bold" }}>
											John Doe Dimitry
										</Text>

										<TouchableOpacity
											style={{
												width: 120,
												height: "auto",
												borderWidth: 2,
												borderColor: "#28CD41",
												borderRadius: 50,
												padding: 5,
												justifyContent: "center",
												alignItems: "center",
												marginTop: 5,
											}}
											onPress={() => setModalVisible(true)}
										>
											<Text style={{ color: "#28CD41", fontWeight: "bold" }}>
												{" "}
												View QR Code
											</Text>
										</TouchableOpacity>
									</View>
									<Modal
										animationType="fade"
										transparent={true}
										visible={modalVisible}
										onRequestClose={() => {
											setModalVisible(!modalVisible);
										}}
									>
										{/* POP-UP MODAL VIEW */}
										<Pressable
											style={styles.centeredViews}
											onPress={() => setModalVisible(!modalVisible)}
										>
											<View style={styles.modalView}>
												<Text
													style={{
														fontSize: 28,
														color: "#28CD41",
														fontWeight: "bold",
													}}
												>
													UnivTraze
												</Text>

												{/* QR Container */}
												<View
													style={{
														width: 210,
														height: 210,
														borderWidth: 2,
														borderColor: "#28CD41",
														borderRadius: 20,
														marginTop: 5,
													}}
												></View>

												{/* QR Code */}
												<Text style={{ color: "rgba(54, 77, 57, 0.6)" }}>
													42121329410
												</Text>
												{/* User Name */}

												<Text style={{ fontSize: 28, marginTop: 10 }}>
													John Doe Dimitry
												</Text>

												{/* User Type */}

												<Text
													style={{
														fontSize: 16,
														color: "rgba(54, 77, 57, 0.6)",
													}}
												>
													STUDENT
												</Text>

												{/* Download QR */}
												<Pressable
													style={[styles.buttons]}
													// onPress={() => setModalVisible(!modalVisible)}
												>
													<Text
														style={{
															color: "white",
															fontSize: 16,
															fontWeight: "700",
														}}
													>
														Download QR
													</Text>
												</Pressable>
											</View>
										</Pressable>
									</Modal>
								</View>

								<View
									style={{
										width: "80%",
										height: "65%",
										alignItems: "center",
										justifyContent: "space-evenly",
										alignSelf: "center",
									}}
								>
									<View
										style={{
											width: "100%",
											height: 54,
											backgroundColor: "#28CD41",
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={dashboard_icon}
											resizeMode="contain"
											style={{
												width: 15,
												height: 15,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text style={{ color: "white" }}>Dashboard</Text>
									</View>
									<View
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={accountsettings_icon}
											resizeMode="contain"
											style={{
												width: 15,
												height: 15,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text>Update profile information</Text>
									</View>
									<View
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={updateProfile_icon}
											resizeMode="contain"
											style={{
												width: 15,
												height: 15,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text>Account settings</Text>
									</View>
									<View
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={roomVisited_icon}
											resizeMode="contain"
											style={{
												width: 15,
												height: 15,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text>Room visited</Text>
									</View>
									<View
										style={{
											width: "100%",
											height: 54,
											borderRadius: 10,
											flexDirection: "row",
											alignItems: "center",
										}}
									>
										<Image
											source={logOut_icon}
											resizeMode="contain"
											style={{
												width: 15,
												height: 15,
												marginStart: 20,
												marginEnd: 20,
											}}
										/>
										<Text>Logout</Text>
									</View>
								</View>
							</View>
						</View>
					</BottomSheet>
					{/*end of bottom navigation for user settings  */}

					{/* start of botton sheet for notification */}

					<BottomSheet
						visible={notifVisible}
						onBackButtonPress={toggleNotifNavigationView}
						onBackdropPress={toggleNotifNavigationView}
					>
						{/*Bottom Sheet inner View*/}
						<View style={styles.bottomNavigationView}>
							<View style={{ width: "100%", height: "100%" }}>
								<View
									style={{
										width: "100%",
										height: "15%",
										padding: 15,
										marginTop: 40,
										paddingLeft: 40,
									}}
								>
									<Text style={{ fontSize: 28 }}>Notifiations</Text>
								</View>

								<View
									style={{
										width: "80%",
										height: "65%",
										alignItems: "center",
										alignSelf: "center",
									}}
								>
									{/* Daily self assessment   notification */}
									<View
										style={{
											width: "100%",
											height: 54,
											flexDirection: "row",
											alignItems: "center",
											marginBottom: 5,
											alignContent: "center",
										}}
									>
										<Image
											source={require("../assets/dailyAssess_icon.png")}
											resizeMode="contain"
											style={{
												width: 32,
												height: 32,
											}}
										/>
										<View style={{ paddingLeft: 15 }}>
											<Text
												style={{
													color: "black",
													fontSize: 16,
													fontWeight: "700",
												}}
											>
												Daily self assessment
											</Text>
											<Text
												style={{
													color: "#364D39",
													fontSize: 12,
													fontWeight: "900",
												}}
											>
												Just now
											</Text>
										</View>
									</View>

									{/* Profile updated notification */}
									<View
										style={{
											width: "100%",
											height: 54,
											flexDirection: "row",
											alignItems: "center",
											marginBottom: 5,
										}}
									>
										<View
											style={{
												width: "100%",
												height: 54,
												flexDirection: "row",
												alignItems: "center",
												marginBottom: 5,
												alignContent: "center",
											}}
										>
											<Image
												source={require("../assets/userInfoUpdate_icon.png")}
												resizeMode="contain"
												style={{
													width: 32,
													height: 32,
												}}
											/>
											<View style={{ paddingLeft: 15 }}>
												<Text
													style={{
														color: "black",
														fontSize: 16,
														fontWeight: "700",
													}}
												>
													Profile updated successfully
												</Text>
												<Text
													style={{
														color: "#364D39",
														fontSize: 12,
														fontWeight: "900",
													}}
												>
													Just now
												</Text>
											</View>
										</View>
									</View>
									{/*Active cases  notification */}
									<View
										style={{
											width: "100%",
											height: 54,
											flexDirection: "row",
											alignItems: "center",
											marginBottom: 5,
										}}
									>
										<View
											style={{
												width: "100%",
												height: 54,
												flexDirection: "row",
												alignItems: "center",
												marginBottom: 5,
												alignContent: "center",
											}}
										>
											<Image
												source={require("../assets/cases_icon.png")}
												resizeMode="contain"
												style={{
													width: 32,
													height: 32,
												}}
											/>
											<View style={{ paddingLeft: 15 }}>
												<Text
													style={{
														color: "black",
														fontSize: 16,
														fontWeight: "700",
													}}
												>
													Active cases are now 20,890
												</Text>
												<Text
													style={{
														color: "#364D39",
														fontSize: 12,
														fontWeight: "900",
													}}
												>
													Just now
												</Text>
											</View>
										</View>
									</View>
								</View>
							</View>
						</View>
					</BottomSheet>
					{/*end of botton sheet for notification */}
				</View>
				{/*End  Notification View */}
				<ScrollView 
					showsVerticalScrollIndicator={false}
					>
					<View style={styles.bodyContainer}>
						<View style={styles.topTextContainer}>
							<Text style={styles.wlcmTextName}>Welcome back,</Text>
							<Text style={styles.wlcmTextAsking}>
								What do you want {"\n"}to do?
							</Text>
						</View>

						<View style={styles.scrllBtnsContainer}>
							<ScrollView
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								style={styles.scrllViewContainer}
							>
								<TouchableOpacity
									style={styles.btnScnQr}
									onPress={() => {
										navigation.navigate("QrScanner");
									}}
								>
									<ImageBackground
										source={scanQr_jpg}
										resizeMode="contain"
										style={styles.btnimage}
									></ImageBackground>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.btnRepCovidTest}
									onPress={() => {
										navigation.navigate("ReportCovidCase");
									}}
								>
									<ImageBackground
										source={reportCovid_jpg}
										resizeMode="contain"
										style={styles.btnimage}
									></ImageBackground>
								</TouchableOpacity>

								<TouchableOpacity
									style={styles.btnRepEmergency}
									onPress={() => {
										navigation.navigate("ReportEmergency");
									}}
								>
									<ImageBackground
										source={emergency_jpg}
										resizeMode="contain"
										style={styles.btnimage}
									></ImageBackground>
								</TouchableOpacity>
							</ScrollView>
						</View>

						<View>
							<Text
								style={{ fontSize: 22, fontWeight: "bold", marginStart: 40 }}
							>
								Covid Reports
							</Text>
							<Text style={{ fontSize: 16, marginStart: 40, marginTop: 20 }}>
								University
							</Text>
						</View>
						<View style={styles.casesContainer}>
							<ImageBackground
								source={covidCasesbg_jpg}
								resizeMode="stretch"
								style={styles.confirmCasesCard}
							>
								<Text style={{ fontSize: 10 }}>Confirmed</Text>
								<Text
									style={{ fontSize: 22, fontWeight: "bold", color: "#28CD41" }}
								>
									64,232
								</Text>
							</ImageBackground>

							<ImageBackground
								source={covidCasesbg_jpg}
								resizeMode="stretch"
								style={styles.confirmCasesCard}
							>
								<Text style={{ fontSize: 10 }}>Recovered</Text>
								<Text
									style={{ fontSize: 22, fontWeight: "bold", color: "#28CD41" }}
								>
									64,232
								</Text>
							</ImageBackground>
						</View>

						<View style={styles.localCasesContainer}>
							<View
								style={{
									width: "90%",
									padding: 10,
									backgroundColor: "white",
									justifyContent: "center",
									alignItems: "center",
									borderRadius: 15,
									shadowColor: "black",
									elevation: 20,
									marginTop: 20,
								}}
							>
								<View style={{ flexDirection: "row", width: "100%" }}>
									<Text
										style={{
											marginLeft: 25,
											marginRight: "auto",
											paddingVertical: 10,
											fontWeight: "bold",
											fontSize: 18,
										}}
									>
										Philippines Update
									</Text>
									<Text
										style={{
											marginRight: 25,
											marginLeft: "auto",
											paddingVertical: 10,
											fontSize: 12,
										}}
									>
										As of {moment().format("MMM Do")}
									</Text>
								</View>
								<PieChart
									data={[
										{
											name: "Population",
											population: population,
											color: "#28CD41",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},
										{
											name: "Cases",
											population: cases,
											color: "#F00",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},
										{
											name: "Active cases",
											population: activeCases,
											color: "rgb(255, 165, 0)",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},
										{
											name: "Recovered",
											population: recovered,
											color: "#FFFF00",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},

										{
											name: "Deaths",
											population: deaths,
											color: "rgb(0, 0, 255)",
											legendFontColor: "#7F7F7F",
											legendFontSize: 10,
										},
									]}
									width={Dimensions.get("screen").width - 100}
									height={150}
									chartConfig={{
										backgroundColor: "#1cc910",
										backgroundGradientFrom: "#eff3ff",
										backgroundGradientTo: "#efefef",
										decimalPlaces: 2,
										color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
										style: {
											borderRadius: 16,
										},
									}}
									style={{
										marginVertical: 8,
										borderRadius: 16,
									}}
									accessor="population"
									backgroundColor="transparent"
									paddingLeft="2"
									absolute //for the absolute number remove if you want percentage
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};
export default Dashboard;
const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E1F5E4",

	},
	topContainer: {
		zIndex: 1,
		width: "100%",
		height: "15%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 38,
	
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
		width: "90%",
		height: "90%",
	},
	bodyContainer: {
		zIndex: -1,
		width: "100%",
		height: 1000,
		marginBottom: 50,
	},
	topTextContainer: {
		width: "100%",
		height: "auto",
		paddingStart: 43,
		justifyContent: "center",
	},
	wlcmTextName: {
		fontSize: 16,
	},
	wlcmTextAsking: {
		fontSize: 28,
		fontWeight: "bold",
	},
	scrllBtnsContainer: {
		width: "100%",
		height: "25%",
		flexDirection: "row",
		marginTop: 15,
	},
	btnScnQr: {
		width: 180,
		height: "100%",

		marginStart: 15,
	},
	btnRepCovidTest: {
		width: 180,
		height: "100%",
	},
	btnRepEmergency: {
		width: 180,
		height: "100%",
	},
	btnimage: {
		width: "100%",
		height: "100%",
	},
	casesContainer: {
		width: "100%",
		height: "auto",
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-evenly",
		backgroundColor: "transparent",
	},
	confirmCasesCard: {
		width: 155,
		height: 86,
		borderRadius: 20,
		shadowColor: "black",
		paddingLeft: 20,
		paddingTop: 10,
	},
	localCasesContainer: {
		width: "100%",
		height: "auto",
		alignItems: "center",
	},
	bottomNavigationView: {
		backgroundColor: "#fff",
		width: "100%",
		height: "60%",
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
	},
	centeredViews: {
		flex: 1,
		backgroundColor: "rgba(52, 52, 52, 0.3)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		width: 350,
		height: 474,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	buttons: {
		width: "100%",
		height: 60,
		borderRadius: 20,
		elevation: 2,
		marginTop: 25,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#28CD41",
	},
});
