
var AddEmp = document.querySelector(".btn");
var NewCard = document.querySelector(".addcard");
var Exit = document.querySelector("#exit");
var ProfilePic = document.querySelector("#profilepic")
var Register = document.querySelector("#registerbtn");
var UpdateBtn = document.querySelector("#UpdateBtn");



AddEmp.addEventListener("click", NewEmp);
Exit.addEventListener("click", ExitCard);



function NewEmp() {
    NewCard.style.opacity = 1;
    NewCard.style.width = "65%";
    UpdateBtn.disabled = true;
    RegistrationForm.reset();
    imgurl = undefined;
    ProfilePic.src = "img/business-man-512.webp";
    
}



function ExitCard() {
    AddEmp.removeEventListener("click", NewCard);
    NewCard.style.opacity = 0
    NewCard.style.width = "0%";
}


Register.addEventListener("click", Registration);
Register.addEventListener("click", pulltopage); 

// Start of all registration data //
var userData = [];
var ID = document.querySelector("#ID");
var Fname = document.querySelector("#f-name");
var Lname = document.querySelector("#l-name");
var email = document.querySelector("#mail");
var office = document.querySelector("#offcode");
var Job = document.querySelector("#jobtitle");
var imgurl
var RegistrationForm = document.querySelector("#registration-form")
// End of all registration data //

// start registration coding //
if (localStorage.getItem("userDetails") != null) {                   //if there is already data in array this condition will keep pushing//
    userData = JSON.parse(localStorage.getItem("userDetails"));     //getting the data from userDetails ln-51 and converting to object and storing in the array//

}



function Registration(event) {
    event.preventDefault();
    pulltopage();
    if (ID.value.trim() === "" || Fname.value.trim() === "" || Lname.value.trim() === "" || email.value.trim() === "" || office.value.trim() === "" || Job.value.trim() === "") {
        alert("Please fill in all required fields.");
        return; 
    }
    userData.push({
        id: ID.value,
        Name: Fname.value,
        LName: Lname.value,
        Email: email.value,
        Office: office.value,
        Role: Job.value,
        ProfilePic: imgurl == undefined ? "img/business-man-512.webp" : imgurl

    });

    var userString = JSON.stringify(userData);      //converting data into string so can be stored in local storage//
    localStorage.setItem("userDetails", userString)     //setting the converted data(userString) into keyword "userData"//

    RegistrationForm.reset('');                       //to make form empty for new registration after registration of previous data//
    Exit.click();
    setTimeout(function () {
    alert("Data Added Successfully");
}, 250);

}

//display the data on page//
var tableDetails = document.querySelector("#tableDetails")
function pulltopage() {
    tableDetails.innerHTML = "";
    userData.forEach(function (data, index) {
        tableDetails.innerHTML += `
         <tr index='${index}'>
            <td>${index + 1}</td>
            <td><img src="${data.ProfilePic}" width="65" height="65"</td>
            <td>${data.id}</td>
            <td>${data.Name}</td>
            <td>${data.LName}</td>
            <td>${data.Email}</td>
            <td>${data.Office}</td>
            <td>${data.Role}</td>
            <td><button class="editbtn" style="color: white; background-color: rgb(12, 117, 254); cursor: pointer;"><i class="fa fa-eye" id="vis" style="background-color: rgb(12, 117, 254);"></i></button>
             <button class="delbtn" style="background-color: red; color: white; cursor: pointer;"><i class="fa fa-trash" style="background-color: red;"> </i></button></td>
         </tr>`
    });

    //delete button coding//
    var i;
    var DelBtn = document.querySelectorAll(".delbtn")
    for (i = 0; i < DelBtn.length; i++) {
        DelBtn[i].addEventListener("click", function () {
            if (confirm("Are You Sure? You want to delete this Data")) {
                var tr = this.parentElement.parentElement;
                var GetA = tr.getAttribute("index");
                tr.remove();
                userData.splice(GetA, 1);
                localStorage.setItem("userDetails", JSON.stringify(userData));
            }
        }
        )
    }



    //update coding//
    var EditBtn = document.querySelectorAll(".editbtn");
    for (i = 0; i < EditBtn.length; i++) {
        EditBtn[i].addEventListener("click", update);
        function update() {
            var tr = this.parentElement.parentElement;
            var td = tr.getElementsByTagName("TD")
            var index = tr.getAttribute("index");
            var imgTag = td[1].getElementsByTagName("IMG");
            var profilepic = imgTag[0];
            var id = td[2].innerHTML;
            var fname = td[3].innerHTML;
            var lname = td[4].innerHTML;
            var Email = td[5].innerHTML;
            var officeCode = td[6].innerHTML;
            var title = td[7].innerHTML;
            NewCard.style.opacity = 1;
            NewCard.style.width = "65%";
            Register.disabled = true;
            UpdateBtn.disabled = false;
            ID.value = id;
            Fname.value = fname;
            Lname.value = lname;
            email.value = Email;
            office.value = officeCode;
            Job.value = title;
            ProfilePic.src = profilepic.src;
            


            UpdateBtn.addEventListener("click",finalupdate)
            function finalupdate(){
                
                if (confirm("Are You Sure? You Want To Save The Changes You Made")) 
                {
                    userData[index] = {
                        id: ID.value,
                        Name: Fname.value,
                        LName: Lname.value,
                        Email: email.value,
                        Office: office.value,
                        Role: Job.value,
                        ProfilePic: UploadImg.value == "" ? profilepic.src : imgurl
                    }
                    localStorage.setItem("profilePicURL", profilepic.src);
                    Exit.click();
                    window.location.reload();
                    
                }
                localStorage.setItem("userDetails", JSON.stringify(userData));
            }

        }
        


    }



    //uploading image//
    var ProfilePic = document.querySelector("#profilepic")
    var UploadImg = document.querySelector("#uploadimg")
    UploadImg.addEventListener("change", Image)
    function Image() {

        var reader = new FileReader();
        reader.onload = function (event) {
            imgurl = event.target.result;
            ProfilePic.src = imgurl
        }
        reader.readAsDataURL(UploadImg.files[0]);
    }


}
//search coding//

var search=document.querySelector("#search");
search.addEventListener("input",searchfun)
search.addEventListener("click",searchfun)

function searchfun() {
    var tr = tableDetails.querySelectorAll("TR");
    var filter = search.value.toLowerCase();
    var i
    for ( i=0;i<tr.length;i++){
        var td = tr[i].getElementsByTagName("TD")[2];
        var id =td.innerHTML;
        if (id.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        }else{
            tr[i].style.display = "none";

        }
    }
        
    }
    var clearFilter = document.querySelector(".clear")
    clearFilter.addEventListener("click", clear)
    function clear() {
        window.location.reload();
    }




pulltopage()
