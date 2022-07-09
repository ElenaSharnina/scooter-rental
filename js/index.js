const init = () => {
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.7718, 37.6316],
      zoom: 16,
      controls: ["smallMapDefaultSet"],
    },
    {}
  );
  const myPlacemark = new ymaps.Placemark(
    [55.7724, 37.6252],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "images/marker.svg",
      iconImageSize: [70, 70],
      iconImageOffset: [-35, -70],
    }
  );
  myMap.geoObjects.add(myPlacemark);
};
ymaps.ready(init);

const disabledScroll = () => {
  document.body.scrollPosition = window.scrollY;
  document.body.style.cssText = `
  overflow: hidden;
  position: fixed;
  top: -${document.body.scrollPosition}px;
  left: 0;
  height: 100wh;
  width: 100wv;
  padding-right: ${window.innerWidth - document.body.offsetWidth}px;`
}

const enabledScroll = () => {
  document.body.style.cssText = '';
  window.scroll({
    top: document.body.scrollPosition
  })
}

const createElem = (tag, atrr) => {
  const elem = document.createElement(tag);

  return Object.assign(elem, { ...atrr });
};

const createModal = (title, description) => {
  const overlayElem = createElem("div", { className: "modal" });
  const modalElem = createElem("div", { className: "modal__block" });
  const modalContainerElem = createElem("div", {
    className: "modal__container",
  });
  const titleElem = createElem("h2", {
    className: "modal__title",
    textContent: `Заказать ${title}`,
  });
  const descriptionElem = createElem("p", {
    className: "modal__desc",
    textContent: description,
  });

  const formElem = createElem("form", {
    className: "modal__form",
    method: "post",
    action: "https://jsonplaceholder.typicode.com/posts",
    id: "order",
  });
  const nameLabelElem = createElem("label", { className: "modal__label" });
  const nameSpanElem = createElem("span", {
    className: "modal__test",
    textContent: "Имя",
  });
  const nameInputElem = createElem("input", {
    className: "modal__input",
    placeholder: "Введите Ваше имя",
    name: "name",
    required: true,
  });
  const phoneLabelElem = createElem("label", { className: "modal__label" });
  const phoneSpanElem = createElem("span", {
    className: "modal__test",
    textContent: "Телефон",
  });
  const phoneInputElem = createElem("input", {
    className: "modal__input",
    placeholder: "Введите Ваш телефон",
    name: "phone",
    required: true,
  });

  const hideInput = createElem("input", {
    type: "hidden",
    name: "product",
    value: title,
  });

  const bthSubmit = createElem("button", {
    className: "modal__button",
    textContent: "Заказать",
    type: "submit",
  });
  bthSubmit.setAttribute("form", "order");

  const closeModalBtn = createElem("button", {
    className: "modal__close",
    innerHTML: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#18171A"/>
  </svg>
  `,
  });
  overlayElem.addEventListener("click", (evt) => {
    const target = evt.target;
    if (target === overlayElem || target.closest(".modal__close")) {
      overlayElem.remove();
      enabledScroll();
    }
  });

  phoneLabelElem.append(phoneSpanElem, phoneInputElem);
  nameLabelElem.append(nameSpanElem, nameInputElem);
  formElem.append(nameLabelElem, phoneLabelElem, hideInput);

  modalContainerElem.append(
    titleElem,
    descriptionElem,
    formElem,
    bthSubmit,
    closeModalBtn
  );
  modalElem.append(modalContainerElem);
  overlayElem.append(modalElem);
  disabledScroll();
  return overlayElem;
};

const productTitle = document.querySelectorAll(".product__title");
const productDesc = document.querySelectorAll(".product__desc");
const productBtn = document.querySelectorAll(".product__btn");
console.log(productBtn);
for (let i = 0; i < productBtn.length; i++) {
  productBtn[i].addEventListener("click", () => {
    const title = productTitle[i].textContent;
    const description = productDesc[i].textContent;

    const modal = createModal(title, description);

    document.body.append(modal);
  });
}
