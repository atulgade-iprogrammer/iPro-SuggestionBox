const feedback = document.getElementById("feedback_value");
const btn = document.getElementById("submit");
const loader_btn = document.getElementById("submit_loader");
// console.log(btn);
loader_btn.style.display = "none";
btn.addEventListener("click", () => {
  if (feedback.value == "") {
    alert("Please enter proper feedback!");
    return;
  }
 const text= feedback.value;
 const words = text.trim().split(/\s+/);
 if(words.length>500){
  alert("Please enter less than 500 words!");
  return;
 }

  btn.style.display = "none";
  loader_btn.style.display = "";

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;
  const info = {
    feedback: feedback.value,
    date: currentDate,
  };

  fetch("/insertIntoGoogleSheet", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(info),
  })
    .then((data) => {
      if (data.status == 400) {
        alert("Something Went Wrong!");
      } else if (data.status == 200) {
        alert("Your response submitted successfully!");
      }
    })
    .then((data) => {
      btn.style.display = "";
      loader_btn.style.display = "none";
      feedback.value = "";
    })
    .catch((error) => console.log(error));
});
