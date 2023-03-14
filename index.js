import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js'
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,onAuthStateChanged,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js'
import  {getFirestore,collection,setDoc,doc, getDoc, getDocs,} from 'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js'


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
  

 

 



  
  
 
  
   

 //Sing up
 const auth = getAuth();
 const firstname = document.getElementById("fname-ID");
 const lastname =  document.getElementById("lname-ID");
 const email = document.getElementById("Email_ID");
 const password = document.getElementById("Password_ID");
 //sing up
document.getElementById("Submit-ID1").onclick = () => {

    const auth = getAuth();


 createUserWithEmailAndPassword(auth,email.value, password.value).then((user) => {
        console.log(user.user.uid);
        console.log(user.user)
        const  myData ={
          UID:user.user.uid,
          user_email:email.value,
          user_firstname:firstname.value,
          user_lastname:lastname.value,
          user_password:password.value,
          user_register_date:new Date(),
        }
        const userRef = doc(db,"USER",user.user.uid);
        setDoc(userRef , myData)
        
        firstname.value="";
        lastname.value="";
        email.value="";
        password.value="";

       
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        
      }).catch((e)=>{
        console.log(e.message)
      })
     

}
const logemail = document.getElementById("Email-ID");
const logpassword = document.getElementById("Password-ID");
document.getElementById("login-ID").onclick = () => {
  //console.log("Started Login Process..")
  const auths=getAuth();
  signInWithEmailAndPassword(auths,logemail.value,logpassword.value).then((user) => {
    //console.log("Logged In Sucessfully.....")
   
    console.log(user.user);
    var x = document.getElementById("snackbar1");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
        
          logemail.value="";
         logpassword.value="";
          console.log(user)
          document.getElementById('id01').style.display="none";
         
  }).catch((e) =>{
    if(e){
    var x = document.getElementById("snackbar5");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    }
    
    console.log(e.message)
  })

}



document.getElementById("logoutbtn").onclick = () =>
{
  const authes = getAuth();
  signOut(authes).then(() => {
   // console.log("logout")
   window.location="../index.html";
   var x = document.getElementById("snackbar2");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  
  }).catch((e) => {
    console.log(e)
  });
}
//auth change
 onAuthStateChanged(auth,(user) =>{
 if (user){
  
  console.log('user status change',user)
  document.getElementById("logoutID").style.display="block";
  document.getElementById("login_d").style.display="none";
  
  
  cardcount(user.uid)
  
 
 }
 else{
  userinfo(null)
  
  console.log('user status change' ,user)
  document.getElementById("logoutID").style.display="none";
  document.getElementById("login_d").style.display="block";

  document.getElementById("card").style.display="none";

 }
})

const prom =collection(db,"PRODUCTS")
  
const disname = document.getElementById("card__container"); 


const fetchProductData=(prom)=>{
  getDocs(prom)
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
 

   window.sessionStorage.setItem("productData",JSON.stringify(PRODUCTS));

   
  })
  .catch((e)=>{
    console.log(e)
  })
}

if(window.sessionStorage.getItem("productData")){
  let myData = JSON.parse(window.sessionStorage.getItem("productData"));

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
  fetchProductData(prom)

}





const forgotIpassword = () =>
{

sendPasswordResetEmail(auth,logemail.value)
  .then(() => {
    
   var x = document.getElementById("snackbar3");
          x.className = "show";
          setTimeout(function(){ x.className = x.className.replace("show", ""); }, 7000);
    
  
  })
  .catch((error) => {
  
  });

}
document.getElementById("forgotID").onclick=forgotIpassword;

//top arrow
const scrolltotop = () =>{
  window.scroll({
    top:0,
    behavior:"smooth"
  });
};

document.getElementById("uparrow").onclick =scrolltotop;


// card count
async function cardcount(userID)
{
  const count=document.getElementById("card_count");
  const Ref= collection(db,"USER",userID,"USER_CARD")
  const data =  await getDocs(Ref)
  const cardlength=data.docs.length;
  count.innerHTML=cardlength;
  

}









//search










