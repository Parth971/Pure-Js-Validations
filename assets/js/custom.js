function validate() {
     let validationSuccess = true;

     // INITIALYSING ELEMENTS TO LOCAL VARIABLE
     let fName = document.getElementById("firstName");
     let lName = document.getElementById("lastName");
     let email = document.getElementById("userEmail");
     let url = document.getElementById("url");
     let pass = document.getElementById("userPassword");
     let cPass = document.getElementById("confirmPassword");
     let phone = document.getElementById("phone");
     let address = document.getElementById("address");
     let hobby = document.getElementById("hobby");
     let image = document.getElementById("imageFile");
     var gender = document.getElementsByName("gender");
     var previewImage = document.getElementById("previewImage");


     // CHEKING FOR ERRORS AND DISPLAYING THEM

     // REMOVING ERROR ELEMENTS AND ERROR CSS FROM DOM 
     let allElementArr = [fName, lName, email, url, pass, cPass, phone, address]
     for (let i = 0; i < allElementArr.length; i++) {
          allElementArr[i].nextElementSibling.innerHTML = "";
          allElementArr[i].classList.remove("redBorder");
     }

     // FIRST NAME 
     if (fName.value == "") {
          fName.nextElementSibling.innerHTML = "First Name is Empty";
          fName.classList.add("redBorder");
          validationSuccess = false;
     }
     else if (!isAlphabet(fName.value)) {
          fName.nextElementSibling.innerHTML = "First Name must contain only alphabets";
          fName.classList.add("redBorder");
          validationSuccess = false;
     }

     // LAST NAME
     if (lName.value == "") {
          lName.nextElementSibling.innerHTML = "Last Name is Empty";
          lName.classList.add("redBorder");
          validationSuccess = false;
     }
     else if (!isAlphabet(lName.value)) {
          lName.nextElementSibling.innerHTML = " Last Name must contain only alphabets";
          lName.classList.add("redBorder");
          validationSuccess = false;
     }

     // EMAIL
     if (email.value == "") {
          email.nextElementSibling.innerHTML = "Email Field is Empty";
          email.classList.add("redBorder");
          validationSuccess = false;
     }
     else if (!isCorrectEmail(email.value)) {
          email.nextElementSibling.innerHTML = "Email is Incorrect";
          email.classList.add("redBorder");
          validationSuccess = false;
     }

     // URL
     if (url.value != "" && !validURL(url.value)) {
          url.nextElementSibling.innerHTML = "Incorrect URL, Must start with http:// Or https://";
          url.classList.add("redBorder");
          validationSuccess = false;
     }

     // PASSWORD
     if (pass.value == "") {
          pass.nextElementSibling.innerHTML = "Password Field is Empty";
          pass.classList.add("redBorder");
          validationSuccess = false;
     }
     else {
          let isValid = isValidPassword(pass.value);
          if (!isValid.valid) {
               pass.nextElementSibling.innerHTML = "Password not Valid. Reason - must include " + isValid.errorMsg;
               pass.classList.add("redBorder");
               validationSuccess = false;
          }

     }

     // CONFIRM PASSWORD
     if (cPass.value == "") {
          cPass.nextElementSibling.innerHTML = "Confirm Password Field is Empty";
          cPass.classList.add("redBorder");
          validationSuccess = false;
     }
     else if (pass.value == "") {
          cPass.nextElementSibling.innerHTML = "Password Field is Empty, first fill Password";
          cPass.classList.add("redBorder");
          validationSuccess = false;
     }
     else if (cPass.value != pass.value) {
          cPass.nextElementSibling.innerHTML = "Password didn't Matched";
          cPass.classList.add("redBorder");
          validationSuccess = false;
     }

     // PHONE NUMBER
     if (phone.value == "") {
          phone.nextElementSibling.innerHTML = "Phone number is Empty";
          phone.classList.add("redBorder");
          validationSuccess = false;
     }
     else if (phone.value.length != 10) {
          phone.nextElementSibling.innerHTML = "Phone number length must be 10 digits";
          phone.classList.add("redBorder");
          validationSuccess = false;
     }
     else if (!validPhone(phone.value)) {
          phone.nextElementSibling.innerHTML = "Phone number is Incorrect";
          phone.classList.add("redBorder");
          validationSuccess = false;
     }

     // ADDRESS
     if (address.value == "") {
          address.nextElementSibling.innerHTML = "Address Field is Empty";
          address.classList.add("redBorder");
          validationSuccess = false;
     }
     else if (!validAddress(address.value)) {
          address.nextElementSibling.innerHTML = "Address must be less than 125 character in length";
          address.classList.add("redBorder");
          validationSuccess = false;
     }

     // GENDER
     let pEle = gender[0].closest(".form-group").children[3];
     pEle.innerHTML = "";
     if (!(gender[0].checked || gender[1].checked)) {
          pEle.innerHTML = "Must Choose one gender";
          validationSuccess = false;
     }

     // HOBBY
     hobby.nextElementSibling.innerHTML = "";
     if (hobby.value == "Select Hobby") {
          hobby.nextElementSibling.innerHTML = "Must select Hobby";
          validationSuccess = false;
     }

     // IMAGE FILE
     image.nextElementSibling.innerHTML = "";
     if (image.files.length == 0) {
          image.nextElementSibling.innerHTML = "Must Choose one Image of type: jpg, jpeg or png";
          previewImage.classList.add('hidden');
          validationSuccess = false;
     }
     else if (!validFile(image)) {
          image.nextElementSibling.innerHTML = "File Should be JPG, JPEG or PNG";
          image.value = "";
          previewImage.classList.add('hidden');
          validationSuccess = false;
     }

     // IF ALL ERRORS ARE GONE THEN validationSuccess VAR WILL BE TRUE
     if (validationSuccess) {
          document.getElementById('success').classList.remove('hidden');
          let data = document.getElementById('data');
          let innerText = ""
          for (let i = 0; i < allElementArr.length; i++) {
               innerText += `<tr>
               <th>`+ allElementArr[i].placeholder + `</th>
               <th>`+ allElementArr[i].value + `</th>
             </tr>`;
               allElementArr[i].value = ""
          }
          // FOR IMAGE DATA RETRIVAL
          let pathArr = image.value.split("\\")
          innerText += `<tr>
               <th> Image </th>
               <th>`+ pathArr[pathArr.length - 1] + `</th>
             </tr>`;
          image.value = "";
          // FOR HOBBY DATA RETRIVAL
          innerText += `<tr>
               <th> Hobby </th>
               <th>`+ hobby.value + `</th>
             </tr>`;
          hobby.value = "";
          // FOR GENDER DATA RETRIVAL
          let gen = gender[0].checked ? "Male" : "Femal"
          innerText += `<tr>
               <th> Gender </th>
               <th>`+ gen + `</th>
             </tr>`;
          gender[0].checked = false;
          gender[1].checked = false;
          data.innerHTML = innerText;
          document.getElementById("overlay").style.display = "block";
     }
}
//VALIDATE FUNCTIONS ENDS----

// USED IN FIRST NAME AND LAST NAME VERIFICATION FOR VALIDATING ALL CHARATERS IN STRING IS CHARACTER
function isAlphabet(string) {
     let isAlpa = true;
     string = string.trim()
     for (let i = 0; i < string.length; i++) {
          let code = string[i].codePointAt();
          if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
               continue;
          }
          isAlpa = false;
          break;
     }
     return isAlpa;
}

// Email VERIFICATION
function isCorrectEmail(string) {
     // CHEKKING IF @ SYMBOL IS PRESENT OR NOT IN EMAIL
     if (!(string.indexOf('@') > -1)) {
          return false;
     }
     // CHEKKING IF ERRORS IN STRING BEFORE @ SYMBOL IN EMAIL
     let beforeAtStr = string.slice(0, string.indexOf('@'))
     if ((beforeAtStr.length < 3) || (charCount(beforeAtStr) < 3)) {
          return false;
     }

     let afterAtStr = string.slice(string.indexOf('@') + 1,)
     // CHEKKING IF . IS PRESENT OR NOT IN STRING AFTER @ SYMBOL
     if (!(afterAtStr.indexOf('.') > -1)) {
          return false;
     }
     // CHEKKING IF ERRORS IN STRING AFTER @ SYMBOL BUT BEFORE . IN EMAIL
     let afterAtBeforeDot = afterAtStr.slice(0, afterAtStr.indexOf('.'));
     if ((afterAtBeforeDot.length < 2) || (onlyCharCount(afterAtBeforeDot) < 2)) {
          return false;
     }

     // CHEKKING IF ERRORS IN STRING AFTER . SYMBOL IN EMAIL
     let afterDot = afterAtStr.slice(afterAtStr.indexOf('.') + 1,);
     if ((afterDot.length < 2) || (onlyCharCount(afterDot) < 2)) {
          return false;
     }

     return true;
}

// Email VERIFICATION FUNCTION USING THIS FUNCTION FOR - IF CHARACTER THEN COUNT AND IGNORE '_' , '.' NUMBER SYMBOL 
// AND IF OTHER SYMBOL PRESENT THEN RETURN -1 VALUE
function charCount(string) {
     let count = 0;
     for (let i = 0; i < string.length; i++) {
          let code = string[i].codePointAt();
          if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57)) {
               count++;
          }
          else if (!(code == 46 || code == 95)) {
               return -1;
          }
     }
     return count;
}

// Email VERIFICATION FUNCTION USING THIS FUNCTION FOR - IF CHARACTER THEN COUNT AND IF OTHER SYMBOL PRESENT THEN RETURN -1 VALUE
function onlyCharCount(string) {
     let count = 0;
     for (let i = 0; i < string.length; i++) {
          let code = string[i].codePointAt();
          if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
               count++;
               continue;
          }
          return -1;
     }
     return count;
}

// URL 
function validURL(string) {
     return (string.indexOf("http://") > -1 || string.indexOf("https://") > -1);
}

// PASSWORD VERIFICATION 
function isValidPassword(string) {
     if (string.length > 14 || string.length < 8) {
          return { valid: false, errorMsg: "proper length which is max: 14 and min: 8" };
     }
     // LOWERCASE CHARACTER
     if (!isContainChar(string, 97, 122)) {
          return { valid: false, errorMsg: "lowercase character" };
     }
     // UPPERCASE CHARACTER
     if (!isContainChar(string, 65, 90)) {
          return { valid: false, errorMsg: "uppercase character" };
     }
     // DIGIT
     if (!isContainChar(string, 48, 57)) {
          return { valid: false, errorMsg: "digit" };
     }
     // SPECIAL CHARACTER
     if (!(isContainChar(string, 33, 47) || isContainChar(string, 58, 64))) {
          return { valid: false, errorMsg: "special character" };
     }
     return { valid: true };
}

// PASSWORD VERIFICATION CALLS THIS FUNCTION FOR - CHEKING IF SPECIFIC ANSCII RANGE IS PRESENT IN STRING OR NOT
function isContainChar(string, low, high) {
     for (let i = 0; i < string.length; i++) {
          if (string[i].codePointAt() >= low && string[i].codePointAt() <= high) {
               return true;
          }
     }
     return false;
}

// PHONE VERIFICATION
function validPhone(string) {
     for (let i = 0; i < string.length; i++) {
          if (i == 0 && !(string[i].codePointAt() == 57 || string[i].codePointAt() == 56 || string[i].codePointAt() == 55)) {
               return false;
          }
          if (!(string[i].codePointAt() >= 48 || string[i].codePointAt() <= 57)) {
               return false;
          }
     }
     return true;
}

// ADDRESS VERIFICATION
function validAddress(string) {
     return !(string.length > 125);
}

// IMAGE FILE VERIFICATION 
function validFile(image) {
     let obj = image.value.split(".");
     let extension = obj[obj.length - 1].toLowerCase();
     return (extension == 'jpg' || extension == 'jpeg' || extension == 'png');
}

// onchange CALLS THIS FUNCTION FOR PREVIEW IMAGE 
function preview() {
     var previewImage = document.getElementById("previewImage");
     let image = document.getElementById("imageFile");
     previewImage.classList.remove('hidden');

     var file = image.files;
     if (file.length > 0) {
          var reader = new FileReader();
          reader.onload = function (event) {
               previewImage.setAttribute("src", event.target.result);
          };
          reader.readAsDataURL(file[0]);
     }
     else {
          previewImage.classList.add('hidden');
          image.value = "";
     }
}

// FOR REMOVING OVERLAY 
function off() {
     document.getElementById("overlay").style.display = "none";
}