var userId = sessionStorage.getItem("userId");

window.onload = async function () {
  document.getElementsByTagName("button")[1].focus();
  document.getElementsByTagName("button")[1].click();
};

async function ShowGroupUsers() {
  let group = await $.ajax({
    url: `/api/users/${userId}/group`,
    method: "get",
    dataType: "json",
  });
  createGroupHtml(group);
}

async function createGroupHtml(group) {
  console.log(group);
  html = ``;
  if (group.lenght < 0) {
    html += `<h5>${group}</h5>`;
  }
}
