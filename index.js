const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2607";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let events = [];
let selectedEvent;

async function getEvents() {
  try {
    const response = await fetch(API);
    const result = await response.json();

    events = result.data;
    render();
  } catch (err) {
    console.error(err);
  }
}

async function getEvent(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();

    selectedEvent = result.data;
    render();
  } catch (err) {
    console.error(err);
  }
}

function EventListItem(event) {
  const $li = document.createElement("li");
  $li.innerHTML = ` 
    <a href = "#selected"> ${event.name}</a>`;
  $li.addEventListener("click", () => getEvent(event.id));
  return $li;
}

function EventLists() {
  const $ul = document.createElement("ul");
  $ul.classList.add("UpcomingParties");

  const $events = events.map(EventListItem);
  $ul.replaceChildren(...$events);

  return $ul;
}

function EventDetails() {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = " Please select an event to learn more.";
    return $p;
  }

  const $event = document.createElement("section");
  $event.classList.add("events");
  $event.innerHTML = ` <h3> ${selectedEvent.name}#${selectedEvent.id}</h3>
    <h3>#${selectedEvent.date}</h3> <h3>#${selectedEvent.location}</h3><p>${selectedEvent.description}</p>`;
  return $event;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main> 
        <section>
            <h2>Upcoming Parties</h2>
            <EventLists></EventLists>
        </section>
        <section id = "seleted">
            <h2> Event Details </h2>
            <EventDetails></EventDetails>
        </section>
    </main>`;
  $app.querySelector("EventLists").replaceWith(EventLists());
  $app.querySelector("EventDetails").replaceWith(EventDetails());
}

async function init() {
  await getEvents();
  render();
}

init();
