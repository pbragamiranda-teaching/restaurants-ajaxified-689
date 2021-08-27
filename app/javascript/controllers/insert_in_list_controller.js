import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";

export default class extends Controller {
  static targets = ['items', 'form' ];

  connect() {
    // console.log(this.element);
    // console.log(this.itemsTarget);
    console.log(this.formTarget.action);
  }

  send(event) {
    event.preventDefault();

    fetch(this.formTarget.action, {
      method: 'POST',
      headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json())
    .then((data) => {
      if (data.inserted_item) {
          this.itemsTarget.insertAdjacentHTML("beforeend", data.inserted_item);
        }
        this.formTarget.outerHTML = data.form;
        });
};



// in the view (html)
// data-controller -> wraps the divs you want to work with
// data-controler-name-target = "my-target" -> creates the target to be select
// create a listener -> data-action or action: 'event->controllername#fucntion'


// in my stimulus js controller
// to select my targets -> static targets = [ 'my-target-1', 'my-target-2', ... ]
// to access the targest -> this.targetnameTarget i.e this.formTarget

