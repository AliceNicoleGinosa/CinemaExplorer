import { createEl } from "../helpers.js";

const LinkMenu = ({ text }) => {
  const el = createEl("p");
  el.textContent = text;
  el.className = "link--menu";

  return el;
};

export default LinkMenu;
