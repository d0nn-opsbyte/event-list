const form = document.getElementById("guest-form");
const guestList = document.getElementById("guest-list");
const guestNameInput = document.getElementById("guest-name");

let guests = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = guestNameInput.value.trim();
  if (name === "") return;

  if (guests.length >= 10) {
    alert("Guest limit of 10 exceeded!");
    return;
  }

  const guest = {
    id: Date.now(),
    name: name,
    attending: true,
  };

  guests.push(guest);
  guestNameInput.value = "";
  renderList();
});

function renderList() {
  guestList.innerHTML = "";

  guests.forEach((guest) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${guest.name} - ${guest.attending ? "Attending" : "Not Attending"}</span>
      <div>
        <button onclick="toggleRSVP(${guest.id})">Toggle RSVP</button>
        <button class="remove-btn" onclick="removeGuest(${guest.id})">Remove</button>
      </div>
    `;
    guestList.appendChild(li);
  });
}

function removeGuest(id) {
  guests = guests.filter((guest) => guest.id !== id);
  renderList();
}

function toggleRSVP(id) {
  guests = guests.map((guest) => {
    if (guest.id === id) {
      guest.attending = !guest.attending;
    }
    return guest;
  });
  renderList();
}