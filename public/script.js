const url = '/api/counter/';

const updateCounter = (div, load) => {
  const data = { load };

  fetch(`${url}${div.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then(json => {
      div.querySelector("p").textContent = `Counter: ${json.count}`
    });
};

const peopleDivs = document.querySelectorAll(".counter-container");

peopleDivs.forEach(div => {
  const addButton = div.querySelector(".add-button");
  const subtractButton = div.querySelector(".subtract-button");

  addButton.addEventListener("click", () => {
    updateCounter(div, 1);
  });

  subtractButton.addEventListener("click", () => {
    updateCounter(div, -1);
  });
});

const fetchCounters = () => {
  fetch(url)
    .then(res => res.json())
    .then(json => {
      peopleDivs.forEach(div => {
        div.querySelector("p").textContent = `Counter: ${json[div.id]}`
      })
    })
}

fetchCounters();