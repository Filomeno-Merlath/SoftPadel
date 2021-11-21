window.onload = async function(){
    document.getElementsByTagName('button')[1].focus();
    document.getElementsByTagName('button')[1].click();
    loadUser();
}
async function showResults(val) {
    if (val == '') {
      return;
    }
    try {
         data = await $.ajax({
            url: `api/users/suggest?q=` + val,
            method:"get",
            dataType: "json"
        });
        createUsersHTML(data);
    } catch (error) {
        console.warn('Something went wrong.', err);
        return false;
    }
    
}
function createUsersHTML(data) {
    let list = '';
       let userId= sessionStorage.getItem("userId");
        res = document.getElementById("result");
        res.innerHTML = '';
        for (i=0; i<data.length; i++) {
            if(data[i].user_id==userId){
            list += ``;
            }else{
            list += `
            <br><section id="users" onclick="toUser(${data[i].user_id})">  
            <p>${data[i].user_username}</p> 
            </section>`;}
          }
          res.innerHTML =`<section id="friends">`+list+`</section>`;
          return true;
}
async function toUser(id){
    sessionStorage.setItem("id", id);
    window.location = "user.html";
}
async function logout(){
    sessionStorage.removeItem("userId");
    window.location="userLogin.html";
    console.log(sessionStorage.getItem("userId"));
}
async function ShowSearch(){
    res = document.getElementById("conteiner");
    res.innerHTML ='<section id="search">'+
    '<input type="text" id="userPlayer" placeholder="Search by username:" onkeyup="showResults(this.value)">'+
    '<button id="myCheck" type="button" onclick="searchByUsername()"><h5>SEARCH</h5></button> '+
    '</section>'+
    '<section id="result"></section>';
}
async function ShowFriends(){
    try {
        let userId = sessionStorage.getItem("userId");
        let userFriends = await $.ajax({
            url: `/api/users/${userId}/friends`,
            method:"get",
            dataType: "json"
        });
        let html =``;
        for(let userFriend of userFriends){
             html+=`
            <br><section>
            <p>${userFriend.user_username}</p>
            <p>${userFriend.user_firstname} ${userFriend.user_lastname} </p>
            </section>`}
            document.getElementById("conteiner").innerHTML = `<h1>Friends(${userFriends.length})</h1>`+`<section id="friends" >`+html+`</section>`;
    } catch (error) {
        console.log(error);
    }
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
        document.getElementById("user").innerHTML = `<h1>${data.user_username}</h1>`;
    } catch (error) {
        
    }
}