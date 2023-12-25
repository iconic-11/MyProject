for (var i = 1; i <= 12; i++) {
  var option = document.createElement("option");
  option.value = i < 10 ? "0" + i : i;
  option.text = i < 10 ? "0" + i : i;
  document.getElementById("medicationHour").appendChild(option);
}

for (var i = 0; i < 60; i++) {
  var option = document.createElement("option");
  option.value = i < 10 ? "0" + i : i;
  option.text = i < 10 ? "0" + i : i;
  document.getElementById("medicationMinute").appendChild(option);
}

var audio;

document.getElementById("medicationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  var medicationName = document.getElementById("medicationName").value;
  var medicationHour = document.getElementById("medicationHour").value;
  var medicationMinute = document.getElementById("medicationMinute").value;
  var medicationPeriod = document.getElementById("medicationPeriod").value;

  var alarmCard = document.createElement("div");

  alarmCard.className = "card";

  alarmCard.innerHTML = `
  <article>
    <i class="fas fa-bell"></i> <!-- This is the icon -->
    <div class="inner-div">
      <strong class="alarm-text">
        <span>Alarm set for ${medicationName} at ${medicationHour}:${medicationMinute} ${medicationPeriod}</span>
      </strong>
    </div>
  </article>
`;

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    alarmCard.remove();
  });

  alarmCard.appendChild(deleteButton);

  document.getElementById("alarms").appendChild(alarmCard);

  document.getElementById("medicationForm").reset();

  var medicationTimeDate = new Date();

  medicationTimeDate.setHours((medicationHour % 12) + (medicationPeriod === "PM" ? 12 : 0));
  medicationTimeDate.setMinutes(medicationMinute);

  var timeDifference = medicationTimeDate - new Date();

  if (timeDifference < 0) {
    timeDifference += 24 * 60 * 60 * 1000;
  }

  setTimeout(function () {
    audio = new Audio("FM9B3TC-alarm.mp3");
    audio.loop = true;
    audio.play();
  }, timeDifference);

  document.getElementById("message").textContent =
    "The alarm is set for " +
    medicationName +
    " at " +
    medicationHour +
    ":" +
    medicationMinute +
    " " +
    medicationPeriod;
});

document.getElementById("stopSound").addEventListener("click", function () {
  if (audio) {
    audio.pause();
  }
});
