import { UI } from "./view.js";
import { STORAGE } from "./storage.js";
import { format } from "date-fns";
import Cookies from "js-cookie";


const URL_USER = 'https://mighty-cove-31255.herokuapp.com/api/user';
const URL_MASSEGE = 'https://mighty-cove-31255.herokuapp.com/api/messages';



UI.FORM_NAME.addEventListener('submit', setName);

function setName() {
  const user = {
    name: UI.INPUT_NAME.value
  };
  Cookies.set('name', user.name, { expires: 14 });

  const token = Cookies.get('token');

  fetch(URL_USER, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  UI.FORM_NAME.reset();
};

UI.FORM_MASSEGE.addEventListener('submit', sendMassege);

function sendMassege() {
  const myName = Cookies.get('name');
  const myMassege = UI.INPUT_MASSEGE.value;
  const currentTime = format(new Date(), 'HH:mm');
  createMessage(myName, myMassege, currentTime);
}

function createMessage(name, text, time) {
  const nameSender = UI.TEMPLATE.content.getElementById('name');
  const textMassege = UI.TEMPLATE.content.getElementById('textMassege');
  const timeDeparture = UI.TEMPLATE.content.getElementById('date');
  nameSender.textContent = name;
  textMassege.textContent = text;
  timeDeparture.textContent = time;
  UI.WINDOW_MASSENGES.append(UI.TEMPLATE.content.cloneNode(true));
  UI.WINDOW_MASSENGES.scrollTop = UI.WINDOW_MASSENGES.scrollHeight;
}

UI.FORM_MAIL.addEventListener('submit', sendEmail);

function sendEmail() {
  const email = {
    email: UI.INPUT_MAIL.value
  };
  fetch(URL_USER, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(email)
  })
};

UI.FORM_CONFIRM.addEventListener('submit', setCookie);

function setCookie() {
  Cookies.set('token', UI.INPUT_CONFIRM.value, { expires: 14 });
};

document.addEventListener("DOMContentLoaded", showHistori);

function showHistori() {
  fetch('https://mighty-cove-31255.herokuapp.com/api/messages')
    .then(promise => promise.json())
    .then(response => console.log(response.messages.forEach(element => {
      const name = element.user.name;
      const massege = element.text;
      const time = format(new Date(element.createdAt), 'HH:mm');
      createMessage(name, massege, time);
    })))
};