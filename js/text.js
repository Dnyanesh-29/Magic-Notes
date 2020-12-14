import autosize from "https://unpkg.com/autosize@4.0.2/src/autosize.js";

class AutoSize extends HTMLTextAreaElement {
  constructor() {
    super();
    autosize(this);
  }
}
    
customElements.define(
  "auto-size",
  AutoSize,
  { extends: "textarea" }
);