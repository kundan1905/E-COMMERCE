
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js'
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js'
import  {getFirestore,collection,setDoc,doc, getDoc, getDocs,deleteDoc} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js'


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
   const auth=getAuth();
   onAuthStateChanged(auth,(user) =>{
    if (user){
     
  card(user.uid);
 window.cardremove=(id)=>{
    deleteDoc(doc(db, "USER",user.uid,"USER_CARD",id));
    document.getElementById("product_id").style.display="none";
    
   }
   
  
  }
    else{
    
   
    }
   })


 async  function card(userID){
    const Ref= collection(db,"USER",userID,"USER_CARD")
   const data =  await getDocs(Ref)
   

   if(data.docs.length==0){
    console.log("null")

   }
   else{
    var card_info=document.getElementById("card_info");
    const data =  await getDocs(Ref)
    .then((snapshot)=>{
        let card_contain = []
        snapshot.docs.forEach((doc) => {
         card_contain.push({...doc.data(), id: doc.id})

        })
    
    var i=0;

  

    for(i=0;i<card_contain.length;i++){
      
        window.id=card_contain[i].id;
        card_info.innerHTML+=`
    <div class=" product" id="product_id">


    
        <div class="product-image">
        <img src="${card_contain[i].product_image}">
      </div>
      <div class="product-details">
        <div class="product-title">${card_contain[i].item_name}</div>
        <p class="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p>
      </div>
      <div class="product-price">&#8377;${card_contain[i].item_price}</div>
      <div class="product-quantity" >
        <input type="number" value="1"  min="1" id="product_quantity1" onchange="calPrice(${card_contain[i].item_price})" >
      </div>
      <div class="product-removal" >
        <button class="remove-product"  onclick=cardremove("${card_contain[i].id }")>
          Remove
        </button>
      </div>

      <div class="product-line-price" id="total">&#8377;${card_contain[i].item_price}</div>
    </div>
        `
   }
   


    })
   }
   
  
  

 }
//   function cardremove(id,userid){


//  }







