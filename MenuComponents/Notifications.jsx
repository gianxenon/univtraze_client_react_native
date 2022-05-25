import reactDom from "react-dom";
import {
	StyleSheet,
	StatusBar,
	Text,
	View,
	ImageBackground,
	Pressable,
	Image,
	Modal,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ScrollView,
} from "react-native";
import { BottomSheet } from "react-native-btr";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import DropDownPicker from "react-native-dropdown-picker";
const menu_jpg = {
	uri: "https://firebasestorage.googleapis.com/v0/b/fir-phoneauth-74be7.appspot.com/o/menu.png?alt=media&token=e20ee94a-4632-467a-841c-c66659a2a3df",
};
const notif_jpg = {
	uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279116408_686597809106370_5704419941564041151_n.png?_nc_cat=109&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeFzyXy1YuNR3W0bBoMIYyfLvnc5UDGkUZi-dzlQMaRRmL_hYEzaszZRVqAUnWzcFyXwISDyYVKWyg0XKpJIEVDi&_nc_ohc=Cz2l3xzmqo4AX9JKu8N&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVKXNntkgxIIZmUnezWtPUVvc3QOkZrKTeVTw_zxNFVyyQ&oe=6295EB65",
};
const dp_uri = {
	uri: "https://thecinemaholic.com/wp-content/uploads/2021/01/nezuu-e1638963260523.jpg",
};
const dashboard_icon = {
	uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279432036_4916433748455571_7650663705710159528_n.png?stp=cp0_dst-png&_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeGejvNW7qCmkoxnj3EHwIChP5LpXi4CABc_kuleLgIAF5kmogSluSVtd3_oGy5orToBm8Vg4CAOkr2EPNIjQrHF&_nc_ohc=P6qhrT5Z2PAAX_hH2Lq&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIirDxmpsySUbKKhsB3snXC-7Z6tK2iPF5CRer6UKEs4g&oe=6296145E",
};
const accountsettings_icon = {
	uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279441655_554948112655667_9017582647265493574_n.png?stp=cp0_dst-png&_nc_cat=107&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeF-yvkvyig9gIU3MyORXk60UE3lQ6Gtr_hQTeVDoa2v-I0dnyXfiNKw7zGjqvjWc7MvMCOcLOPvo5Xnu924Iu89&_nc_ohc=0xV7eqUS2DQAX_gnp53&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIWC2BME5UKTub-5CA-2hTryPT8eDDTBDTdStmtpjx_XA&oe=6293D346",
};
const updateProfile_icon = {
	uri: "https://scontent.xx.fbcdn.net/v/t1.15752-9/279044283_992261191656856_2558417864094669647_n.png?stp=cp0_dst-png&_nc_cat=105&ccb=1-5&_nc_sid=aee45a&_nc_eui2=AeGlBRZbPbMCpA5brsJIYChdjISzaE6_wdWMhLNoTr_B1ZbCRNmZ3FzaAzxR2m6haPRXnxO_pxAFG3NzL1oo-5pc&_nc_ohc=s0A9PLEGbwQAX_kWtnJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIUV28fhicwUehusYl6y-8HHdawibTqK4iQy8fyWcedGw&oe=629694DC",
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


const Notifications = ({notifVisible, toggleNotifNavigationView}) => {
  return (
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
  )
}

export default Notifications;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#E1F5E4",
		height: "100%",
	},
	topContainer: {
		zIndex: 1,
		width: "100%",
		height: "15%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 40,
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
	// body style
	bodyContainer: {
		width: "auto",
		height: "100%",
		marginBottom: 50,
		marginHorizontal: 48,
	},
	formContainer: {
		width: "auto",
		height: "90%",
	},
	input: {
		height: 40,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#28CD4199",
		backgroundColor: "#FFFFFF",
		padding: 10,
	},
	inputss: {
		height: 120,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#28CD4199",
		backgroundColor: "#FFFFFF",
		padding: 10,
		justifyContent: "flex-start",
		textAlignVertical: "top",
	},
});
