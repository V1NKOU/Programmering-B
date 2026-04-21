
const firebaseConfig = {
  apiKey: "AIzaSyB9EQyPK3meZuPzxm2GFNK3tvKb_u8aGlw",
  authDomain: "programmering1-4a305.firebaseapp.com",
  projectId: "programmering1-4a305",
  storageBucket: "programmering1-4a305.firebasestorage.app",
  messagingSenderId: "578154098816",
  appId: "1:578154098816:web:f97957bd83a8dff49bb665",
  measurementId: "G-WGLT3PPS2F"
};

//Opret forbindelse til firebase
firebase.initializeApp(firebaseConfig)
console.log('Firebase startet med: ', firebaseConfig.projectId)


//vi får nu et firestore "objekt" som vi kan bruge til at kommunikere med firestore
var db = firebase.firestore()
console.log('forbindelse til firestore oprettet')
  