import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
// firebase 読み込み
// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyBhfHunJmyca266zrGQGBlcdxxPT5Y9bbY',
	authDomain: 'multiplechance-57751.firebaseapp.com',
	databaseURL: 'https://multiplechance-57751.firebaseio.com',
	projectId: 'multiplechance-57751',
	storageBucket: 'multiplechance-57751.appspot.com',
	messagingSenderId: '323568257253',
	appId: '1:323568257253:web:568282f4ef0b0cf19aec0c',
	measurementId: 'G-F95VRFD4R3'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;