import { createEl } from "../helpers.js";
import Text from "./Text.js";
import Image from "./Image.js";

const Wrapper = ({ title, image, id, mediaType } = {}) => {
  const el = createEl("div");
  el.className = "wrapper";
  el.id = id;

  //const TitleEl = Text({ className: "wrapper--title", text: title });

  const ImageEl = Image({
    className: "image--wrapper",
    src: image,
    alt: title,
    id: id,
  });
  ImageEl.dataset.mediaType = mediaType;
  // const buttonEl = Text({ className: "button-wrapper" });
  // buttonEl.textContent = "Show me more!";

  el.append(ImageEl);

  return el;
};

export default Wrapper;
