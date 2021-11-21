window.onload = async function(){
    loadUser();
}
/*
async function searchByUsername() {
    try {
        let username = document.getElementById("userPlayer").value;
        let user = await $.ajax({
            url: `/api/users/search/?name=${username}`,
            method: 'get',
            dataType: 'json'
        });
        createUsersHTML(user);
    } catch (error) {
        console.log(error);
    }  
}*/
async function logout(){
    sessionStorage.removeItem("userId");
    window.location="userLogin.html";
    console.log(sessionStorage.getItem("userId"));
}

async function loadUser(){
    try {
        let html="";
        let id= sessionStorage.getItem("userId");
        let data = await $.ajax({
            url: `api/users/${id}`,
            method:"get",
            dataType:"json"
        });
        document.getElementById("user").innerHTML = `<h1>${data.user_username}-</h1>`;
    } catch (error) {
        
    }
}