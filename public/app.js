// Firebase configuration object (use your configuration details here)
const firebaseConfig = {
  apiKey: "AIzaSyBcNxs1qgOUV9QUXyEHNs_gPyZQHGpZ1B8",
  authDomain: "dbs3-6a018.firebaseapp.com",
  databaseURL: "https://dbs3-6a018-default-rtdb.firebaseio.com",
  projectId: "dbs3-6a018",
  storageBucket: "dbs3-6a018.firebasestorage.app",
  messagingSenderId: "476698542874",
  appId: "1:476698542874:web:41c0c69274d5d95a9522a3"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// PWA Install Prompt Below
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // Prevent automatic prompt
  deferredPrompt = e; // Save the event for later use
});

function showInstallPrompt() {
  if (!deferredPrompt) {
    console.warn("Install prompt is not available.");
    return;
  }

  // Create the popup container
  const popupContainer = document.createElement("div");
  popupContainer.style.position = "fixed";
  popupContainer.style.top = "50%";
  popupContainer.style.left = "50%";
  popupContainer.style.transform = "translate(-50%, -50%)"; // Center the popup
  popupContainer.style.width = "300px";
  popupContainer.style.padding = "20px";
  popupContainer.style.backgroundColor = "white";
  popupContainer.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  popupContainer.style.borderRadius = "8px";
  popupContainer.style.zIndex = "9999";
  popupContainer.style.textAlign = "center";
  popupContainer.style.fontFamily = "Arial, sans-serif";

  // Create the close button (X icon)
  const closeButton = document.createElement("span");
  closeButton.textContent = "×"; // Unicode for X icon
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontSize = "18px";
  closeButton.style.color = "#888";
  closeButton.style.fontWeight = "bold";

  // Close the popup when the X icon is clicked
  closeButton.onclick = () => {
    popupContainer.remove();
  };

  // Create the text inside the popup
  const popupText = document.createElement("p");
  popupText.textContent = "Install this Card in your Device!";
  popupText.style.margin = "0 0 10px";
  popupText.style.fontSize = "16px";
  popupText.style.color = "#333";

  // Create the install button
  const installButton = document.createElement("button");
  installButton.textContent = "Install";
  installButton.style.fontSize = "16px";
  installButton.style.padding = "10px 20px";
  installButton.style.backgroundColor = "yellow";
  installButton.style.color = "#000000";
  installButton.style.border = "none";
  installButton.style.borderRadius = "5px";
  installButton.style.cursor = "pointer";

  installButton.onclick = () => {
    deferredPrompt.prompt(); // Show the install prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the PWA install");
      } else {
        console.log("User dismissed the PWA install");
      }
      deferredPrompt = null; // Reset the deferred prompt
      popupContainer.remove(); // Hide the popup
    });
  };

  // Add the close button, text, and install button to the popup container
  popupContainer.appendChild(closeButton);
  popupContainer.appendChild(popupText);
  popupContainer.appendChild(installButton);

  // Append the popup container to the body
  document.body.appendChild(popupContainer);
}




//Some Variable Declarations
const auth = firebase.auth();
const user = firebase.auth().currentUser;
let dbRef = firebase.database().ref();
let uid, username;

// Function for Signing In the user. This fucntion is called when the user clicks on the Sign In button on Login.Html Page
function signIn() {
  // Check if elements exist
  const emailElement = document.getElementById('email');
  const passwordElement = document.getElementById('password');
  if (!emailElement || !passwordElement) {
    console.error('Email or Password element not found');
    return;
  }
  const email = emailElement.value;
  const password = passwordElement.value;
  // Debugging: log values to ensure they're being captured
  console.log('Email:', email);
  console.log('Password:', password);
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
      console.log("signin function called");
      window.location.href = 'card-dashboard.html';
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });

}


// This function is called when the user clicks on the Sign Up button on the Login.Html Page
function signUp() {
  // Get email and password values from the form
  const username = document.getElementById('username').value;
  const signupemail = document.getElementById('signupemail').value;
  const newpassword = document.getElementById('newpassword').value;
  // Save the Binding Data
  function saveMessageBinding(uid, username, signupemail) {
    let bindingRef = firebase.database().ref('Binding');
    let userRef = bindingRef.child(uid); // Use username as the key
    userRef.set({
      username: username,
      signupemail: signupemail,
    });
  }
  // Create a Key in the Collected Data
  function saveMessageUsername(username) {
    let firstsaveRef = firebase.database().ref('Collected Data');
    let userRef2 = firstsaveRef.child(username); // Create a new key with  username
    userRef2.set({
      signupemail: signupemail,
    });
  }
  // Create a new user with email and password
  firebase.auth().createUserWithEmailAndPassword(signupemail, newpassword)
    .then((userCredential) => {
      // User created successfully
      const user = userCredential.user;
      const uid = userCredential.uid;
      saveMessageBinding(uid, username, signupemail);
      saveMessageUsername(username);
      // Send email verification
      firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          alert('Verification email sent. Please check your inbox and verify your email.');
          // Redirect to the verification page
          window.location.href = 'email-verification.html'; // replace with your verification page URL
        })
        .catch((error) => {
          console.error('Error sending verification email:', error.message);
          alert('Error sending verification email: ' + error.message);
        });
    })
    .catch((error) => {
      // Handle signup errors
      console.error('Error during sign-up:', error.message);
      alert('Error: ' + error.message);
    });


}


// This is the function is called when the user clicks on the Sign out button on the Card Dasboard.html Page
function signOut() {
  auth.signOut().then(() => {
    window.location.href = 'login.html'; // Redirect to login page after sign-out
  }).catch(error => {
    console.error('Sign out error:', error);
  });
}

//Precheck function which checks if user is having all the neccessary conditions to access Card Dashboard page as well fetching data from db based on username and then populating them on form
function preChecks() {
  //Check if email ID is verified. If not, then send to email Verification page
  firebase.auth().onAuthStateChanged(user => {

    if (!user) {
      window.location.href = 'index.html'; // Redirect to login page if not authenticated
    }

    else if (user) {
      const userEmail = user.email;
      console.log("User's email:", userEmail);

      if (user.emailVerified) {
        console.log("Email is verified");
      } else {
        console.log("Email is not verified");
        window.location.href = 'email-verification.html';
      }
      uid = user.uid;
      console.log("User's UID:", uid);

      dbRef.child(`Binding/${uid}/username`).once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            username = snapshot.val(); // Get the username

            // Now use the username to fetch data from Collected Data
            return dbRef.child(`Collected Data/${username}`).once('value');
            console.log(username);
          } else {
            console.error("No username found for this UID in Binding.");
            return null;
          }
        })
        .then(userDataSnapshot => {
          if (userDataSnapshot && userDataSnapshot.exists()) {
            const userData = userDataSnapshot.val();
            populateFormFields(userData); // Function to populate fields with fetched data
          } else if (userDataSnapshot === null) {
            // Handle case when username is not found under the UID
            console.log("No data found for this user.");
          }
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  });

}

//Function to populate data from db into the Form fields. This function is called in preChecks function
function populateFormFields(data) {
  console.log("Fetched data:", data);
  template.value = data.template || "companytemplate1";
  companyLogo.value = data.companyLogo || "Not Provided";
  companyName.value = data.companyName || "Not Provided";
  companyTagline.value = data.companyTagline || "Not Provided";
  qrcodelink.value = data.qrcodelink || "Not Provided";
  companyBanner.value = data.companyBanner || "Not Provided";
  representativeName.value = data.representativeName || "Not Provided";
  representativePicture.value = data.representativePicture || "Not Provided";
  representativeDesignation.value = data.representativeDesignation || "Not Provided";
  repPhoneNumber.value = data.repPhoneNumber || "Not Provided";
  repWhatsappNumber.value = data.repWhatsappNumber || "Not Provided";
  email.value = data.email || "Not Provided";
  about.value = data.about || "Not Provided";
  legalInfo.value = data.legalInfo || "Not Provided";
  catalog.value = data.catalog || "Not Provided";
  services.value = data.services || "Not Provided";
  address.value = data.address || "Not Provided";
  gallery1.value = data.gallery1 || "Not Provided";
  gallery2.value = data.gallery2 || "Not Provided";
  gallery3.value = data.gallery3 || "Not Provided";
  website.value = data.website || "Not Provided";
  facebook.value = data.facebook || "Not Provided";
  instagram.value = data.instagram || "Not Provided";
  youtube.value = data.youtube || "Not Provided";
  twitter.value = data.twitter || "Not Provided";
  linkedin.value = data.linkedin || "Not Provided";
  getDirections.value = data.getDirections || "Not Provided";
  toggleViewMode(true); // Start in view mode

}

//Function that is called on the click of save button. Accessing DOM elements value and passing it into saveMessage function
function submitForm() {
  // DOM elements
  let template = document.getElementById('template').value;
  let companyLogo = document.getElementById('companyLogo').value;
  let companyName = document.getElementById('companyName').value;
  let companyTagline = document.getElementById('companyTagline').value;
  let qrcodelink = document.getElementById('qrcodelink').value;
  let companyBanner = document.getElementById('companyBanner').value;
  let representativePicture = document.getElementById('representativePicture').value;
  let representativeName = document.getElementById('representativeName').value;
  let representativeDesignation = document.getElementById('representativeDesignation').value;
  let repPhoneNumber = document.getElementById('repPhoneNumber').value;
  let repWhatsappNumber = document.getElementById('repWhatsappNumber').value;
  let email = document.getElementById('email').value;
  let about = document.getElementById('about').value;
  let legalInfo = document.getElementById('legalInfo').value;
  let catalog = document.getElementById('catalog').value;
  let services = document.getElementById('services').value;
  let address = document.getElementById('address').value;
  let gallery1 = document.getElementById('gallery1').value;
  let gallery2 = document.getElementById('gallery2').value;
  let gallery3 = document.getElementById('gallery3').value;
  let website = document.getElementById('website').value;
  let facebook = document.getElementById('facebook').value;
  let instagram = document.getElementById('instagram').value;
  let youtube = document.getElementById('youtube').value;
  let twitter = document.getElementById('twitter').value;
  let linkedin = document.getElementById('linkedin').value;
  let getDirections = document.getElementById('getDirections').value;
  let editBtn = document.getElementById('editBtn').value;
  let saveBtn = document.getElementById('saveBtn').value;
  saveMessage(template, companyLogo, companyName, companyTagline, qrcodelink, companyBanner, representativeName, representativePicture, representativeDesignation, repPhoneNumber, repWhatsappNumber, email, about, legalInfo, catalog, services, address, gallery1, gallery2, gallery3, website, facebook, instagram, youtube, twitter, linkedin, getDirections);
}


// Function to update Data on Card Dashboard Page & if saved successfully, toggle the save button back to edit
function saveMessage(template, companyLogo, companyName, companyTagline, qrcodelink, companyBanner, representativeName, representativePicture, representativeDesignation, repPhoneNumber, repWhatsappNumber, email, about, legalInfo, catalog, services, address, gallery1, gallery2, gallery3, website, facebook, instagram, youtube, twitter, linkedin, getDirections) {
  let userRef = dbRef.child(`Collected Data/${username}`);
  userRef.set({
    template: template,
    companyLogo: companyLogo,
    companyName: companyName,
    companyTagline: companyTagline,
    qrcodelink: qrcodelink,
    companyBanner: companyBanner,
    representativeName: representativeName,
    representativePicture: representativePicture,
    representativeDesignation: representativeDesignation,
    repPhoneNumber: repPhoneNumber,
    repWhatsappNumber: repWhatsappNumber,
    email: email,
    about: about,
    legalInfo: legalInfo,
    catalog: catalog,
    services: services,
    gallery1: gallery1,
    gallery2: gallery2,
    gallery3: gallery3,
    address: address,
    website: website,
    facebook: facebook,
    instagram: instagram,
    youtube: youtube,
    twitter: twitter,
    linkedin: linkedin,
    getDirections: getDirections,
  });

  dbRef.set(userRef).then(() => {
    alert("Data saved successfully!");
    toggleViewMode(true);
  }).catch((error) => {
    console.error("Error saving data:", error);
  });
};



//Function to toggle between Edit mode and View mode. This function is called in the SaveMessage function.
function toggleViewMode(isViewMode) {
  template.disabled = isViewMode;
  companyLogo.readOnly = isViewMode;
  companyName.readOnly = isViewMode;
  companyTagline.readOnly = isViewMode;
  qrcodelink.readOnly = isViewMode;
  companyBanner.readOnly = isViewMode;
  representativeName.readOnly = isViewMode;
  representativePicture.readOnly = isViewMode;
  representativeDesignation.readOnly = isViewMode;
  repPhoneNumber.readOnly = isViewMode;
  repWhatsappNumber.readOnly = isViewMode;
  email.readOnly = isViewMode;
  about.readOnly = isViewMode;
  legalInfo.readOnly = isViewMode;
  catalog.readOnly = isViewMode;
  services.readOnly = isViewMode;
  address.readOnly = isViewMode;
  gallery1.readOnly = isViewMode;
  gallery2.readOnly = isViewMode;
  gallery3.readOnly = isViewMode;
  website.readOnly = isViewMode;
  facebook.readOnly = isViewMode;
  instagram.readOnly = isViewMode;
  youtube.readOnly = isViewMode;
  twitter.readOnly = isViewMode;
  linkedin.readOnly = isViewMode;
  getDirections.readOnly = isViewMode;
  // Set other fields to readonly in view mode
  editBtn.style.display = isViewMode ? "inline" : "none";
  saveBtn.style.display = isViewMode ? "none" : "inline";
}




// Helper function to sanitize usernames. Used to prevent special characters in usernames. The funtion is called in the fetchUserData function
function sanitizeUsername(username) {
  return username.replace(/[.#$[\]]/g, '_');
}


// Extracting the template from the database based on the username and then calling the injectCSS function with the fetched template value. This function is called in the fetchUserData function 
function extractTemplate(username_param) {
  username = username_param;
  const userRef = dbRef.child(`Collected Data/${username}`);

  userRef.once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const templateValue = data.template; // Fetch the template field
        console.log("Fetched template:", templateValue);

        // Call the injectCSS function with the fetched template value
        injectCSS(templateValue);
      } else {
        console.error("No data available for the specified username.");
      }
    })
    .catch(error => {
      console.error("Error fetching template data:", error);
    });
}

// Injecting the CSS based on the template value fetched from the database. This function is called in the extractTemplate function
function injectCSS(data) {

  // Remove any previously injected stylesheet links if needed
  const existingStyles = document.querySelectorAll('link[rel="stylesheet"][data-dynamic="true"]');
  existingStyles.forEach((style) => style.remove());

  // Determine the CSS file based on data.template using a switch statement
  let cssFile;
  switch (data) {
    case 'companytemplate1':
      cssFile = './companytemplate1.css';
      break;
    case 'professionaltemplate':
      cssFile = './professionaltemplate.css';
      break;
    case 'companytemplate2':
      cssFile = './companytemplate2.css';
      break;
    case 'companytemplate3':
      cssFile = './companytemplate3.css';
      break;
    case 'companytemplate4':
      cssFile = './companytemplate4.css';
      break;
    case 'companytemplate5':
      cssFile = './companytemplate5.css';
      break;
    default:
      cssFile = './companytemplate1.css'; // Fallback CSS
      break;
  }

  // Inject the determined CSS file
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssFile;
  link.setAttribute('data-dynamic', 'true'); // Mark this as dynamically added for easy removal
  document.head.appendChild(link);

  // Inject Font Awesome CDN
  const faLink = document.createElement('link');
  faLink.rel = 'stylesheet';
  faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
  faLink.setAttribute('data-dynamic', 'true'); // Mark as dynamic
  document.head.appendChild(faLink);
}


// Function to toggle the share options in the User Page. This function is used in FetchUser Data    
function toggleShareOptions() {
  const shareOptions = document.getElementById('shareOptions');
  if (shareOptions.style.display === 'block') {
    shareOptions.style.display = 'none';
  } else {
    shareOptions.style.display = 'block';
  }
}

// Functions to close the share options in the User Page. This function is used in FetchUser Data
function closeShareOptions() {
  document.getElementById('shareOptions').style.display = 'none';

}


// Function to Copy the profile link to the clipboard. This function is used in FectchUserData
function copyLink() {
  const profileLink = window.location.href; // Use the current page URL
  navigator.clipboard.writeText(profileLink).then(function () {
    alert('Link copied to clipboard!');
  }).catch(function (err) {
    console.error('Error copying text: ', err);
  });
}

// Share on WhatsApp using mobile app link (works on mobile). Used in FetchUser Data function for Users Card Page
function shareWhatsApp() {
  const profileLink = window.location.href;
  // Try opening WhatsApp mobile app (works only on mobile devices)
  if (navigator.userAgent.match(/iPhone|Android/i)) {
    window.open(`whatsapp://send?text=${encodeURIComponent(profileLink)}`, '_blank');
  } else {
    // Fallback for desktop users: WhatsApp Web
    window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(profileLink)}`, '_blank');
  }
}

// Share on Instagram. Used in FetchUser Data function for Users Card Page.
function shareInstagram() {
  const profileLink = window.location.href;
  window.open(`https://www.instagram.com/sharer/sharer.php?u=${encodeURIComponent(profileLink)}`, '_blank');
}

// Share via Email. Used in FetchUser Data function for Users Card Page
function shareEmail() {
  const profileLink = window.location.href;
  window.open(`mailto:?subject=Check out this profile&body=${encodeURIComponent(profileLink)}`, '_blank');
}

// Share on Facebook. Used in FetchUser Data function for Users Card Page
function shareFacebook() {
  const profileLink = window.location.href;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileLink)}`, '_blank');
}

// Function to generate and download dynamic VCF file. Used in FetchUser Data function for Users Card Page
function generateDynamicVCF(username) {
  let userRef = dbRef.child(`Collected Data/${username}`);
  userRef.once('value', (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      // Construct the VCF content
      const vcfContent = `BEGIN:VCARD
VERSION:3.0
N:${data.representativeName || ''}
FN:${data.representativeName || ''}
ORG:${data.companyName || ''}
TITLE:${data.representativeDesignation || ''}
TEL;TYPE=WORK,VOICE:${data.repPhoneNumber || ''}
TEL;TYPE=CELL,WHATSAPP:${data.repWhatsappNumber || ''}
EMAIL;TYPE=WORK:${data.email || ''}
ADR;TYPE=WORK:;;${data.address || ''}
URL:${data.website || ''}
NOTE:${data.services || ''}
END:VCARD`;

      // Create a Blob object for the VCF content
      const blob = new Blob([vcfContent], { type: 'text/vcard' });

      // Trigger download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${username}_contact.vcf`;

      // Programmatically click the link and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Unable to generate VCF. User data not found.');
    }
  });
}

// Function to fetch user data from the database and populate the HTML structure in User.html Page
function fetchUserData() {

  const pathSegments = window.location.pathname.split('/');
  let username = pathSegments[pathSegments.length - 1];
  username = sanitizeUsername(username);
  extractTemplate(username);
  let userRef = dbRef.child(`Collected Data/${username}`);
  userRef.once('value', (snapshot) => {
    const userDataContainer = document.getElementById('userDataContainer');
    if (snapshot.exists()) {
      const data = snapshot.val();
      // Dynamically create the HTML structure
      const htmlContent = `
                  <head>    
                  <title>Digital Business Card ${username}</title>
                  <head>
                  <div id="main-look">
                    <div id="main-look2">
                      <div id="logo-container">
                          <img src="${data.companyLogo || 'default-logo.png'}" id="companyLogo" alt="Company Logo">
                          <div class="logo-text">
                              <h2 id="companyName">${data.companyName || 'Company Name'}</h2>
                              <p>${data.companyTagline || 'Not Provided'}</p>
                          </div>
                      </div>
  
                      <div id="banner">
                          <img src="${data.companyBanner || 'default-banner.png'}" id="companyBanner" alt="Company Banner">
                      </div>
  
                       <div class="intro">
                          <div class="wave-container">
                              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 209 33">
                                  <path fill="white" d="..."></path>
                              </svg>
                          </div>
  
                          <div class="profile-section">
                               
  
                               <div class="profile-image">
                                  <img src="${data.representativePicture || 'default-profile.png'}" id="representativePicture" alt="Representative Image">
                                  <h2 id="repsentativeName">${data.representativeName || 'Representative Name'}</h2>
                                  <p id="representativeDesignation">${data.representativeDesignation || 'Designation'}</p>
                              </div>
  
                              
                          </div>
                          <div class="section">
                           <div class="line-container">
                               <hr class="line-left">
                                  <span class="line-text">About me</span>
                                  <hr class="line-right">
                                  </div>
                                 <p id="aboutme">${data.about || 'About'}</p>
                                  
                            
                               
                      </div>
  
                           <div class="contact-icons" >
                              <div class="icon">
                                      <i class="fas fa-qrcode" id= "qricon"></i>
                                      <p>QR </p>
                              </div>
                              <div class="icon">
                                  <a href="tel:${data.repPhoneNumber}" style=" color:#2a4a95; text-decoration:none;"><i class="fas fa-phone" id="phonenumber"></i></a>
                                  <p id="repPhoneNumber">Number</p>
                              </div>

                               <div class="icon">
                                 <a style="text-decoration:none;" href="https://wa.me/+91${data.repWhatsappNumber}" target="_blank" style="color:#2a4a95;"> <i  class="fab fa-whatsapp" id="whatsapp"></i> </a>
                                 <p id="repWhatsappNumber">WhatsApp</p>
                              </div>

                              <div class="icon">
                                  <a href="mailto:${data.email}" style="color:#2a4a95; text-decoration:none;" id="emailicon"> <i class="fas fa-envelope" ></i> </a>
                                  <p id="email">Email</p>
                              </div>  
                          </div>
  
                           <div class="section">
                               <div class="line-container">
                                  <hr class="line-left">
                                  <span class="line-text">Company Details</span>
                                  <hr class="line-right">
                               </div>                                                    
                              
                              
                                <div class="icon-row">
                                    <div class="icon" >
                                      <i class="fa-solid fa-handshake" id="abouticon" ></i>
                                      <p>About</p>
                                   </div>
                                   <div class="icon">
                                      <i class="fas fa-book" id="catalogicon" onclick="window.open('${data.catalog}', '_blank')"></i>
                                      <p>Catalog</p>
                                   </div>
                                  
                                   <div class="icon">
                                      <i class="fas fa-info-circle" id="legal-icon"></i>
                                      <p>Legal Info</p>
                                   </div>

                                   <div class="icon" onclick="toggleShareOptions()">
                                      <i class="fa-solid fa-share-nodes"></i>
                                      <p> Share </p>
                                   </div>
                                   <div id="shareOptions" class="share-options" style="display:none;">

                                    <button class="share-option" onclick="copyLink()">
                                        <i class="fa-solid fa-link"></i> Copy Link
                                    </button>
                                    <button class="share-option" onclick="shareWhatsApp()">
                                        <i class="fab fa-whatsapp"></i> WhatsApp
                                    </button>
                                 
                                    <button class="share-option" onclick="shareEmail()">
                                        <i class="fas fa-envelope"></i> Email
                                    </button>
                                    <button class="share-option" onclick="shareFacebook()">
                                        <i class="fab fa-facebook"></i> Facebook
                                    </button>
                                    <button class="close-btn" onclick="closeShareOptions()">Close</button>
                                 </div>
                               </div>

                                 <div class="modal" id="myModal">
                                    <div class="modal-content">
                                    <p id="modalText">This is a modal box!</p>
                                    </div>
                                </div>

                         </div>

                          <div class="section">
                               <div class="line-container">
                                    <hr class="line-left">
                                    <span class="line-text">Services/Products</span>
                                     <hr class="line-right">
                              </div>
                               <p class="Bio"><p id="services">${data.services || 'Services/Products'}</p></p>
                            </div>
  
                          <div class="section">
                              <div class="line-container">
                                  <hr class="line-left">
                                  <span class="line-text">Social</span>
                                  <hr class="line-right">
                              </div>
                              <div class="icon-row2">
                                  <div class="icon">
                                      <i class="fa-brands fa-facebook" onclick="window.open('${data.facebook}', '_blank')"></i>
                                  </div>
                                  <div class="icon">
                                     <i class="fab fa-instagram" onclick="window.open('${data.instagram}', '_blank')"></i>
                                  </div>
                                  <div class="icon">
                                      <i class="fa-brands fa-youtube" onclick="window.open('${data.youtube}', '_blank')"></i>
                                  </div>
                                  <div class="icon">
                                      <i class="fas fa-globe" onclick="window.open('${data.website}', '_blank')"></i>
                                  </div>
                              </div>
                              
                       </div>

                          

                           <div class="slideshow-container" id="slideshow1">
                              <!-- Slide 1 -->
                              <div class="slide">
                               <img src="${data.gallery1}" alt="Slide 1">

                              </div>
                              
                              <!-- Slide 2 -->
                              <div class="slide">
                               <img src="${data.gallery2}" alt="Slide 2">
                              </div>
                              
                              <!-- Slide 3 -->
                              <div class="slide">
                               <img src="${data.gallery1}" alt="Slide 3">
                              </div>

                              <!-- Navigation buttons -->
                              <a class="prev" >&#10094;</a>
                              <a class="next" >&#10095;</a>
                          </div>
                           
                          
                          <div>
                          <div class="section">
                              <div class="line-container">
                               <hr class="line-left">
                                  <span class="line-text">Address & Directions</span>
                                  <hr class="line-right">
                                  </div>
                                  <p id="address">${data.address || 'Company Address'}</p>
                                   <button class="center-button1" onclick="window.open('${data.getDirections}', '_blank')">Get Directions</button>
                                   

                               
                      </div>
                      <div>
                                  <button class="center-button" onclick="generateDynamicVCF('${username}')">Add Contact</button></div>
                       </div>
    
                  </div>`;


      // Insert the created HTML into the container
      userDataContainer.innerHTML = htmlContent;

      initSlideshow("slideshow1");

      //modal box opening 
      var modal = document.getElementById("myModal");
      var modalText = document.getElementById("modalText");

      // Get the iconss
      var icon3 = document.getElementById("legal-icon");



      abouticon.onclick = function () {
        modal.style.display = "flex";
        modalText.textContent = `${data.about || 'About the company'}`;
      }


      qricon.onclick = function () {
        modal.style.display = "flex";
        modalText.innerHTML = `<img id="qrimg" src="${data.qrcodelink || 'QR Code'}">`;
      }


      icon3.onclick = function () {
        modal.style.display = "flex";
        modalText.textContent = `${data.legalInfo || 'Legal Information'}`;
      }


      // Close the modal when clicking anywhere outside the modal content
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      showInstallPrompt(); // Show the install prompt button

      // Hide the loading message
      if (loadingMessage) loadingMessage.style.display = "none";
    } else {
      loadingMessage.textContent = "User not found.";
    }
 });  
}


// Function to initialize the slideshow. This function is called in the fetchUserData function
function initSlideshow(slideshowId) {

  let slideIndex = 0;
  const slides = document.querySelectorAll(`#${slideshowId} .slide`);

  // Function to show the current slide
  function showSlide() {
    // Hide all slides
    slides.forEach(slide => {
      slide.style.display = "none";
    });

    // Show the current slide
    slides[slideIndex].style.display = "block";
  }

  // Function to change the slide when clicking the buttons
  function changeSlide(n) {
    slideIndex += n;
    console.log(`Current slide index: ${slideIndex}`);

    if (slideIndex >= slides.length) {
      slideIndex = 0; // Loop back to the first slide
    }
    if (slideIndex < 0) {
      slideIndex = slides.length - 1; // Loop to the last slide
    }

    showSlide();
  }

  // Initialize the slideshow
  showSlide();

  // Set interval for automatic slideshow every 3 seconds (3000ms)
  setInterval(() => {
    changeSlide(1); // Automatically move to the next slide
  }, 3000);

  // Attach event listeners to the buttons (optional if you want manual controls)
  const prevButton = document.querySelector(`#${slideshowId} .prev`);
  const nextButton = document.querySelector(`#${slideshowId} .next`);

  if (prevButton && nextButton) {
    prevButton.addEventListener('click', function () {
      changeSlide(-1);
    });

    nextButton.addEventListener('click', function () {
      changeSlide(1);
    });
  }
};



// Function to Register Service Worker for PWA.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw780.js").then(() => {
    console.log("Service Worker Registered");
  });
}


// Extract username from query parameters
function getUsernameFromURL() {
  const pathSegments = window.location.pathname.split("/");
  let username = pathSegments[pathSegments.length - 1];
  return username;
}

// Store username locally
function storeUsername(username) {
  if (username) {
    localStorage.setItem("username", username); // Store the username as a string
  }
}

// Load username from localStorage
function loadUsername() {
  return localStorage.getItem("username"); // Retrieve the stored username
}

// Initialize the app
function initApp() {
  let username = getUsernameFromURL(); // Get username from URL

  if (username) {
    storeUsername(username); // Save the username in localStorage
  } else {
    username = loadUsername(); // Fallback: Load the username from localStorage
  }

  if (!username) {
    return;
  }

  // Load user-specific content
  // Add your logic to load dynamic content for the user
}

// Call initApp on page load
document.addEventListener("DOMContentLoaded", initApp);
