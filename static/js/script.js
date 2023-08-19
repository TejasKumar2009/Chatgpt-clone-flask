let sendbtn = document.getElementById("sendbtn");
let msginput = document.getElementById("msginput");
let question1 = document.querySelector(".question1");
let answer1 = document.querySelector(".answer1");


async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    return response.json(); 
  }

sendbtn.addEventListener("click", async ()=>{
    let question = msginput.value;
    msginput.value = "";

    document.getElementById("nochatmessages").style.display = "none"
    document.getElementById("chatmessages").style.display = "block"

    question1.innerHTML = question;

    answer1.innerHTML = "Loading...";

    let result = await postData("/api", {"question":question})
    answer1.innerHTML = result.result;
})