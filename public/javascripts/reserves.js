var uId = sessionStorage.getItem("userId");
window.onload = function () {
  loadReserves();
};

async function loadReserves() {
  try {
    let data = await $.ajax({
      url: `/api/users/${uId}/reserves`,
      method: `get`,
      dataType: `json`,
    });
    console.log(data);
    createReservesHtml(data);
  } catch (error) {
    console.log(error);
  }
}
function createReservesHtml(data) {
  let html = ``;

  for (let dat of data) {
    let some = parseInt(dat.reserve_hour.slice(0, 2)) + 1;

    html += `<section class=reserve>
            <p>${dat.field_name}</p>
            
            <p>Time:${dat.reserve_hour.slice(0, 5)}-${some}:00</p>
            <p>Date:${dat.reserve_date.slice(0, 10)}</p>
            </section>`;
  }
  document.getElementById("reserves").innerHTML = html;
}
