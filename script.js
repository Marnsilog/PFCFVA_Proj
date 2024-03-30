var a = document.getElementById("")
document.getElementById("loginBtn").addEventListener("click", function() {
    document.querySelector(".container").style.display = "block";
});


function login(){
    var i = document.getElementById("navMenu")

    if(i.className ==="nav-menu"){
        i.className += "responsive"
    }else{
        i.className = "nav-menu";
    }
}

