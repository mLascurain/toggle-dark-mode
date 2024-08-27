const $body = document.querySelector("body");
const template = document.createElement("template");
template.innerHTML = `

  <style>
    #toggle-dark-mode {
      visibility: hidden;
    }

    .tdm-label {
      position: absolute;
      width: 80px;
      height: 40px;
      background-color: lightgray;
      border-radius: 20px;
      cursor: pointer;
    }

    .tdm-circle {
      width: 34px;
      background-color: white;
      height: 34px;
      border-radius: 50%;
      top: 3px;
      position: absolute;
      left: 3px;
      animation: toggleOff 0s linear forwards;
    }

    #toggle-dark-mode:checked + .tdm-label {
      background-color: white;
    }

    #toggle-dark-mode:checked + .tdm-label .tdm-circle {
      animation: toggleOn 0s linear forwards;
      background-color: black;
    }

    @keyframes toggleOn {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(40px);
      }
    }

    @keyframes toggleOff {
      0% {
        transform: translateX(40px);
      }
      100% {
        transform: translateX(0);
      }
    }
  </style>

  <input type="checkbox" id="toggle-dark-mode" />
  <label for="toggle-dark-mode" class="tdm-label">
    <div class="tdm-circle"></div>
  </label>
`;

class ToggleDarkMode extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$input = this.shadowRoot.querySelector("#toggle-dark-mode");
    this.$input.checked = JSON.parse(localStorage.getItem("mode"));
    this.$input.addEventListener("change", () => {
      changeMode();
      updateLocalStorage();
    });
    changeMode();
  }
}

window.customElements.define("toggle-dark-mode", ToggleDarkMode);

function changeMode() {
  const $input = document
    .querySelector("toggle-dark-mode")
    .shadowRoot.querySelector("#toggle-dark-mode");
  if ($input.checked) {
    $body.classList.add("dark-mode");
    $body.classList.remove("light-mode");
  } else {
    $body.classList.add("light-mode");
    $body.classList.remove("dark-mode");
  }
}

function updateLocalStorage() {
  const $input = document
    .querySelector("toggle-dark-mode")
    .shadowRoot.querySelector("#toggle-dark-mode");
  localStorage.setItem("mode", JSON.stringify($input.checked));
}
