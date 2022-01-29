const url = '/api/counter/';

const peopleDivs = document.querySelectorAll('.counter-container');

const updateCounterServer = async (username, load) => {
  const data = { load };
  const fetchOptions = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = await fetch(`${url}${username}`, fetchOptions);
  const json = await res.json();

  return json.count;
};

const updateCounterDOM = (div, count) => {
  const myDiv = div;
  myDiv.querySelector('p').textContent = `Counter: ${count}`;
};

peopleDivs.forEach((div) => {
  const addButton = div.querySelector('.add-button');
  const subtractButton = div.querySelector('.subtract-button');

  addButton.addEventListener('click', async () => {
    const counter = await updateCounterServer(div.id, 1);
    updateCounterDOM(div, counter);
  });

  subtractButton.addEventListener('click', async () => {
    const counter = await updateCounterServer(div.id, -1);
    updateCounterDOM(div, counter);
  });
});

const fetchCounters = async () => {
  const res = await fetch(url);
  const json = await res.json();
  peopleDivs.forEach((div) => updateCounterDOM(div, json[div.id]));
};

fetchCounters();
