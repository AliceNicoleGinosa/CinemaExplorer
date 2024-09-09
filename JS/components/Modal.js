import { createEl } from "../helpers.js";
import Text from "./Text.js";
import Image from "./Image.js";

const modal = ({ title, image, description, rate } = {}) => {
  const el = createEl("section");
  el.className = "modal";
  const internalEl = createEl("div");
  internalEl.className = "internalEl-modal";

  const modalImage = Image({
    className: "image-modal",
    src: image,
    alt: title,
  });
  const modalTitle = Text({ className: "title-modal", text: title });

  const modalDescription = Text({
    className: "modal-description",
    text: description,
  });
  const modalRate = Text({ className: "modal-rate", text: rate });
  const modalButton = Text({
    className: "modal-button",
    text: "Back to Homepage",
  });
  internalEl.append(modalTitle, modalDescription, modalRate);
  el.append(modalImage, internalEl, modalButton);
  return el;
};

export default modal;
