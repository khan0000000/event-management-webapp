let events = [
    {
        name: "Tech Conference",
        date: "2026-06-10",
        description: "A conference about modern web technologies."
    },
    {
        name: "Music Night",
        date: "2026-05-20",
        description: "Live music event in the city."
    }
];

const eventList = document.getElementById("eventList");
const form = document.getElementById("eventForm");
const errorMsg = document.getElementById("errorMsg");
const searchBar = document.getElementById("searchBar");

// DISPLAY EVENTS
function displayEvents(data) {
    eventList.innerHTML = "";

    let sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));

    sorted.forEach((event, index) => {
        const isPast = new Date(event.date) < new Date();

        const card = document.createElement("div");
        card.classList.add("event-card");
        if (isPast) card.classList.add("past");

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;

        eventList.appendChild(card);
    });
}

// ADD EVENT
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const desc = document.getElementById("eventDescription").value;

    if (!name || !date || !desc) {
        errorMsg.textContent = "⚠ Please fill all fields!";
        return;
    }

    errorMsg.textContent = "";

    events.push({
        name: name,
        date: date,
        description: desc
    });

    form.reset();
    displayEvents(events);
});

// DELETE EVENT
function deleteEvent(index) {
    events.splice(index, 1);
    displayEvents(events);
}

// SEARCH FUNCTION
searchBar.addEventListener("input", function() {
    let value = this.value.toLowerCase();

    let filtered = events.filter(event =>
        event.name.toLowerCase().includes(value) ||
        event.date.includes(value)
    );

    displayEvents(filtered);
});

// INITIAL LOAD
displayEvents(events);