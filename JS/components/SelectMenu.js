import { createEl } from "../helpers.js";

const SelectMenu = ({ text, id }) => {
  const optionEl = createEl("option");
  optionEl.className = "option";
  optionEl.value = id;
  optionEl.id = id;
  optionEl.textContent = text;

  return optionEl;
};

export default SelectMenu;
