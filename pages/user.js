import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js'
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js'
import{getFirestore,collection,setDoc,doc, getDoc, getDocs} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js'
import{getStorage, ref } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-storage.js'

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAi4o9aVj7ZMcXMGkfbWaKv4FSqM1M5LbI",
    authDomain: "suhagan-saree.firebaseapp.com",
    databaseURL: "https://suhagan-saree-default-rtdb.firebaseio.com",
    projectId: "suhagan-saree",
    storageBucket: "suhagan-saree.appspot.com",
    messagingSenderId: "687122214714",
    appId: "1:687122214714:web:e3b0fd2ac56bd24f476a03"
  };

  // Initialize Firebase
  initializeApp(firebaseConfig)
   const db  = getFirestore();
   const auth = getAuth();
   onAuthStateChanged(auth,(user) =>{
    if (user){
     
     console.log('user status change',user)
     userinfo(user.uid)
  
     
    
    }
    else{
     
     
     console.log('user status change' ,user)

   
    }
   })


   async function userinfo(userID) {
    const USERNAME = document.getElementById("USERNAME"); 
    
    const USERINFO = document.getElementById("USEREMAIL"); 
    
    if(userID){
      const myRef  = doc(db,"USER",userID)
  
      // const ref = collection(db,"USER/"+userID)
      const daa = await getDoc(myRef)
  
      USERINFO.innerHTML = `
          <h2>${daa.data().user_email}
          </h2>
          `
          USERNAME.innerHTML = `<h1>${daa.data().user_firstname}</h2>
        `
  
  
  
    }
    
    
  
  }
  

 

  