import { createEl } from "../helpers.js";

const YearInput = ({} = {}) => {
  const el = createEl("form");
  el.className = "year-form";
  const inputEl = createEl("input");
  inputEl.className = "input-year";
  inputEl.placeholder = "Explore by year...";
  inputEl.type = "number";

  const searchButton = createEl("button");
  searchButton.className = "button-year";
  searchButton.textContent = "Feel old yet?";

  el.append(inputEl, searchButton);

  return el;
};

export default YearInput;
