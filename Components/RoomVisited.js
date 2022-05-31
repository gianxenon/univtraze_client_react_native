import {
	StyleSheet,
	Text,
	View,
	FlatList,
	StatusBar,
	TouchableWithoutFeedback,
	ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	backgroundColor,
	borderColor,
	shadowColor,
} from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import Menu from "../MenuComponents/Menu";
import Notifications from "../MenuComponents/Notifications";

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
const RoomVisited = () => {
	const [roomVisited, setRoomVisited] = useState([]);
	// useEffect(()=>{
	//     fetch("").then((data) = >{
	//         data.json().then((result) => {
	//             setRoomVisited(result);
	//         }),
	//     });
	// }, []);
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
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar
				animated={true}
				backgroundColor="#E1F5E4"
				barStyle="dark-content"
			/>

			<View style={styles.mainContainer}>
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
					<Menu
						visible={visible}
						toggleBottomNavigationView={toggleBottomNavigationView}
					/>

					{/*end of bottom navigation for user settings  */}

					{/* start of botton sheet for notification */}

					<Notifications
						notifVisible={notifVisible}
						toggleNotifNavigationView={toggleNotifNavigationView}
					/>
					{/*end of botton sheet for notification */}
				</View>
				{/* <FlatList
                    data={roomVisited}
                    renderItem={({item}) =>
                    <View style={styles.listWrapper}>
                            <Text>Room ID</Text>
                            <Text>Room ID</Text>
                            <Text>Date</Text>
                            <Text>Time</Text>
                        </View>
                    }
                /> */}
				<View style={{ width: 340, height:'auto' }}>
					<Text style={{ color: "#364D39",fontSize:28,fontWeight:'700',paddingVertical:15 }}>Room Visited</Text>
				</View>
				<View style={styles.listWrapperHeader}>
					<Text style={styles.row}>Room ID</Text>
					<Text style={styles.row}>Room ID</Text>
					<Text style={styles.row}>Date</Text>
					<Text style={styles.row}>Time</Text>
				</View>
				<View style={styles.listWrapper}>
					<Text style={styles.rowBody}>Room ID</Text>
					<Text style={styles.rowBody}>Room ID</Text>
					<Text style={styles.rowBody}>Date</Text>
					<Text style={styles.rowBody}>Time</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default RoomVisited;

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#E1F5E4",

		alignItems: "center",
	},
	bodyContainer: {
		height: "85%",
		paddingHorizontal: 40,
		borderWidth: 5,
	},
	listWrapperHeader: {
		height: 45,
		width: 340,
		backgroundColor: "#28CD41",
		flexDirection: "row",
		flexWrap: "wrap",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		elevation: 15,
		shadowColor: "#28CD41",
	},
	listWrapper: {
		height: 45,
		width: 340,
		flexDirection: "row",
		flexWrap: "wrap",
		borderBottomWidth: 0.5,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderColor: "#E1F5E4",
		backgroundColor: "white",
	},
	row: {
		flex: 1,
		padding: 15,
		fontSize: 12,
		color: "#E1F5E4",
	},
	rowBody: {
		flex: 1,
		padding: 15,
		fontSize: 12,
		color: "#364D39",
	},
	topContainer: {
		zIndex: 1,
		width: "100%",
		height: "15%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

		paddingHorizontal: 30,
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
});
