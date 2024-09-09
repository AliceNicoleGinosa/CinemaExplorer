import { createEl } from "../helpers.js";

const Image = ({ className, src, alt, id } = {}) => {
  const el = createEl("img");
  el.className = className;
  el.src = src;
  el.alt = alt;
  el.id = id;

  return el;
};

export default Image;
