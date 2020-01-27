import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
// firebase 読み込み
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: '',
	authDomain: '',
	databaseURL: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
	measurementId: ''
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;