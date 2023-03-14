

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js'
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js'
import {getFirestore,collection,setDoc,doc, getDoc, getDocs,}from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi4o9aVj7ZMcXMGkfbWaKv4FSqM1M5LbI",
  authDomain: "suhagan-saree.firebaseapp.com",
  databaseURL: "https://suhagan-saree-default-rtdb.firebaseio.com",
  projectId: "suhagan-saree",
  storageBucket: "suhagan-saree.appspot.com",
  messagingSenderId: "687122214714",
  appId: "1:687122214714:web:e3b0fd2ac56bd24f476a03",
};


// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
var queryString = location.search.substring(1);

var product_Category = queryString.split("|")[0];

const disname = document.getElementById("saree__container"); 
const product_name = document.getElementById("product_name"); 
product_name.innerHTML=`${product_Category}
`
function getProductcat(productID){
    if(queryString.split("|")[0] !== null){
        var ref = collection(db, product_Category);
       
      
          getDocs(ref)
          .then((snapshot) => {
          
           let PRODUCTS = []
           snapshot.docs.forEach((doc) => {
            PRODUCTS.push({...doc.data(), id: doc.id})
           })
        
           PRODUCTS.forEach((product)=>
           disname.innerHTML += `
           <product-card productImage="${product.product_image?product.product_image:"https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"}"
            productName="${product.item_name}" 
            productPrice="&#8377;${product.item_price}"
            inStock="${product.is_available}"
            productType=${product.product_type}
            productId=${product.product_id}
            >
        
            </product-card>`
           )
         
        
          //  window.sessionStorage.setItem(product_Category,JSON.stringify(PRODUCTS));
        
           
          })
          .catch((e)=>{
            console.log(e)
          })
        
    }
}
if(window.sessionStorage.getItem(product_Category)){
  let myData = JSON.parse(window.sessionStorage.getItem(product_Category));

  myData.forEach(product => {
  


  disname.innerHTML += `
  <product-card productImage="${product.product_image?product.product_image:"https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"}"
   productName="${product.item_name}" 
   productPrice="&#8377;${product.item_price}"
   inStock="${product.is_available}"
   productType=${product.product_type}
   productId=${product.product_id}
   >

   </product-card>`



  });
}else{
  getProductcat(product_Category)

}



