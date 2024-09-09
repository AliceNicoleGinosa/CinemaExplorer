import { createEl } from "../helpers.js";

const SearchInput = ({} = {}) => {
  const el = createEl("form");
  el.className = "form";
  const inputEl = createEl("input");
  inputEl.className = "input-wrapper";
  inputEl.placeholder = "Explore by keyword...";

  const searchButton = createEl("button");
  searchButton.className = "button-input";
  searchButton.textContent = "That title was...?";

  el.append(inputEl, searchButton);

  return el;
};

export default SearchInput;
