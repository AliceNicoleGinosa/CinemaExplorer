// da usare sia per titolo serie/film sia per description

import { createEl } from "../helpers.js";

const Text = ({ className, text }) => {
  const el = createEl("p");
  el.className = className;
  el.textContent = text;
  return el;
};

export default Text;
