import firebase from 'firebase';
import {
	API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID
  } from 'react-native-dotenv';
import 'firebase/auth';
import 'firebase/firestore';
// firebase 読み込み
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	databaseURL: DATABASE_URL,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;