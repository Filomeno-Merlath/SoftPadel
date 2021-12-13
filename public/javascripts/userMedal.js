var userId = sessionStorage.getItem("userId");

window.onload = async function(){
    document.getElementsByTagName("button")[1].focus();
    document.getElementsByTagName("button")[1].click();
}

async function showMedal(){
    try {
        let medal = await $.ajax({
            url: `/api/users/${userId}/medals`,
            method: "get",
            dataType: "json"
        });
        getUserMedal(medal);
    } catch (error) {
        document.getElementById("medal").innerHTML=`MEDAL`;
        document.getElementById("conteiner").innerHTML=`<p>Looks like you don't have any medals yet.</p>`;
    }
}
async function showDescription(){
    document.getElementById("conteiner").innerHTML=`<h3>Tipos de medalha</h3>
                                                    <h4>Cobre</h4>
                                                    <p>Para obter esta medalha você precisa ter 5 jogos completados, 3 jogos ganhos, 5 km percorridos ou 3 diferentes campos visitados.</p>
                                                    <h4>Prata</h4>
                                                    <p>Para obter esta medalha você precisa ter 10 jogos completados, 6 jogos ganhos, 10 km percorridos ou 6 diferentes campos visitados.</p>
                                                    <h4>Ouro</h4>
                                                    <p>Para obter esta medalha você precisa ter 20 jogos completados, 10 jogos ganhos, 20 km percorridos ou 10 diferentes campos visitados.</p>
                                                    <h4>Platina</h4>
                                                    <p>Para obter esta medalha você precisa ter 30 jogos completados, 20 jogos ganhos, 30 km percorridos ou 20 diferentes campos visitados.</p>
                                                    <h4>Diamante</h4>
                                                    <p>Para obter esta medalha você precisa ter 50 jogos completados, 30 jogos ganhos, 50 km percorridos ou 30 diferentes campos visitados.</p>`;
}
async function getUserMedal(medal){
    document.getElementById("medal").innerHTML=`${medal.medal_level} MEDAL`;
    try {
        let data = await $.ajax({
            url: `api/users/medals/${medals.medals_fk_id}/users`,
            method: `get`,
            dataType: `json`
        })
        console.log(data);
    } catch (error) {
        
    }
}