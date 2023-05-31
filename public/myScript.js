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
  const text = feedback.value;
  const words = text.trim().split(/\s+/);
  if (words.length > 500) {
    alert("Please enter less than 500 words!");
    return;
  }
  try {
    // let locationObject = trackLocation();
    console.log(locationObject);
  } catch (error) {
    console.log(error);
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
      if (data.status == 406) {
        alert("Something Went Wrong!");
      } else if (data.status == 202) {
        // alert("Your response submitted successfully!");
        location.href = "/responseSubmitted";
      }
    })
    .then((data) => {
      btn.style.display = "";
      loader_btn.style.display = "none";
      feedback.value = "";
    })
    .catch((error) => console.log(error));
});

// async function trackLocation() {
//   let locationObject;
//   if (navigator.geolocation) {
//     await navigator.geolocation.getCurrentPosition(function (position) {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       locationObject = {
//         latitude: latitude,
//         longitude: longitude,
//       };
//       document.cookie = `location=${latitude},${longitude};path=/`;
//       // Send an event to Google Analytics
//       gtag("event", "location_tracked", {
//         location: `${latitude},${longitude}`,
//       });
//     });
//   }
//   return locationObject;
// }

countWord = (text) => {
  let spaces = text.value.match(/\s+/g);
  let words = spaces
    ? spaces.length < 10
      ? "0" + spaces.length
      : spaces.length
    : "00";
  document.getElementById("wordCounter").innerHTML = "Words: " + words + "/500";
};
