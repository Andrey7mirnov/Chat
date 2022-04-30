import { UI } from "./view.js";
import { STORAGE } from "./storage.js";
import { format } from "date-fns";
import Cookies from "js-cookie";

function User(name) {
  this.name = name;
};

const URL_USER = "https://mighty-cove-31255.herokuapp.com/api/user";

UI.FORM_NAME.addEventListener('submit', setName);

function setName() {
  const name = UI.INPUT_NAME.value;
  const user = new User(name);
  STORAGE.SET_USER(user);
  const token = Cookies.get('token');
  fetch(URL_USER, {
    method: "PATCH",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  })
  UI.FORM_NAME.reset();
};

UI.FORM_MASSEGE.addEventListener('submit', sendMassege);

function sendMassege() {
  const myName = UI.TEMPLATE.content.getElementById('name');
  const text = UI.TEMPLATE.content.getElementById('textMassege');
  const date = UI.TEMPLATE.content.getElementById('date');
  const user = STORAGE.GET_USER();
  myName.textContent = user.name;
  text.textContent = UI.INPUT_MASSEGE.value;
  date.textContent = format(new Date(), 'HH:mm');
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
