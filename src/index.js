import { showEmptyInputMessage, showError404, validateInput, internetError, error504 } from "./utils/utils.js";

// Validación de entrada
validateInput();

// Función principal para obtener imágenes de gatos
const getCats = async (characteristics) => {
  try {
    showLoader(); 
    const response = await catImage(characteristics);
    showImageCats(response, characteristics);
  } catch (error) {
    showErrors(error);
  }
}

// Fetch y manejo de errores
const catImage = async (characteristics) => {
  const url = `https://cataas.com/cat/${characteristics}`;
  console.log(`Fetching image from URL: ${url}`);

  const timeout = 10000;   // Tiempo de espera límite (10 segundos)
  const controller = new AbortController(); // Usado para abortar la solicitud en caso de tiempo excedido
  const signal = controller.signal; // La señal se usa para cancelar la solicitud

  setTimeout(() => {
    controller.abort();
  }, timeout);

  const response = await fetch(url, { signal });

  if (!response.ok) {
    console.log(`Error status: ${response.status}`)
    if (response.status === 404) {
      throw new Error("Característica no encontrada");
    } else if (response.status === 504) {
      throw new Error("Error de tiempo de espera del servidor");
    } else if (response.status >= 500) {
      throw new Error("Error del servidor");
    } else {
      throw new Error("La solicitud no fue exitosa");
    }
  }

  return response; // Retorna la respuesta de fetch
}

const showErrors = (error) => {
  console.log("Error details:", error);
  hideLoader(); 

  if (error.name === 'AbortError') {  // Verifica si es un error de tiempo de espera
    error504();
  } else if (error instanceof TypeError && error.message === "Failed to fetch") { 
    internetError();
  } else if (error.message === "Característica no encontrada") {
    showError404();
  } else if (error.message === "Error del servidor") {
    console.log("Error del servidor");
  } else {
    console.log("Otro tipo de error:", error.message);
  }
}

const hideLoader = () => {
  const loaderContainer = document.querySelector(".container");
  if (loaderContainer) {
    loaderContainer.remove();
  }
}

// Mostrar loader inmediatamente
const showLoader = () => {
  const container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);

  const loaderContainer = document.createElement("div");
  loaderContainer.classList.add("loader-container");
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loaderContainer.appendChild(loader);
  container.appendChild(loaderContainer);
}

// Mostrar imagen y opciones de interacción
const showImageCats = (response, characteristics) => {
  const container = document.querySelector(".container");
  const loaderContainer = container.querySelector(".loader-container");
  const imageUrl = response.url;

  const cats = document.createElement("img");
  cats.classList.add("imageCats");
  cats.src = imageUrl;

  cats.addEventListener('load', function () {
    container.removeChild(loaderContainer);
    container.appendChild(cats);
    createInputsImage(container, imageUrl, characteristics, cats);
  });
}

const createInputsImage = (container, imageUrl, characteristics, cats) => {
  const containerButtons = document.createElement("div");
  containerButtons.classList.add("containerButtons");
  container.appendChild(containerButtons);

  createInputGoBack(container, containerButtons, imageUrl, characteristics, cats);
  createInputSelectImage(container, containerButtons, imageUrl, characteristics, cats);
  createSeeMoreInput(container, containerButtons, imageUrl, characteristics, cats);
};

const createInputGoBack = (container, containerButtons, imageUrl, characteristics, cats) => {
  let goBackInput = document.createElement("button");
  goBackInput.classList.add("goBackInput");
  goBackInput.textContent = "Regresar";
  containerButtons.appendChild(goBackInput);

  goBackInput.addEventListener("click", function () {
    container.classList.add("hidden");
    console.log("buenas noches");
  });
}

const createInputSelectImage = (container, containerButtons, imageUrl, characteristics, cats) => {
  let buttonSelectImage = document.createElement("button");
  buttonSelectImage.classList.add("selectImage");
  buttonSelectImage.textContent = 'Seleccionar';
  containerButtons.appendChild(buttonSelectImage);

  buttonSelectImage.addEventListener("click", function () {
    document.body.removeChild(container);
    showTextImageInput(imageUrl);
  });
}

const createSeeMoreInput = (container, containerButtons, imageUrl, characteristics, cats) => {
  let seeMoreInput = document.createElement("button");
  seeMoreInput.classList.add("seeMoreInput");
  seeMoreInput.textContent = "Ver más";
  containerButtons.appendChild(seeMoreInput);

  seeMoreInput.addEventListener("click", async function () {
    container.removeChild(cats);
    document.body.removeChild(container);
    await getCats(characteristics);
  });
}

// Mostrar texto sobre la imagen
const showTextImageInput = (imageUrl) => {
  let containerTextImage = document.querySelector(".containerTextImage");
  if (!containerTextImage) {
    containerTextImage = document.createElement("div");
    containerTextImage.classList.add("containerTextImage");
    document.body.appendChild(containerTextImage);
  } else {
    containerTextImage.innerHTML = "";
  }

  const titleTextImage = document.createElement("h2");
  titleTextImage.classList.add("titleTextImage");
  titleTextImage.textContent = 'Texto Para tu imagen';
  containerTextImage.appendChild(titleTextImage);

  const textImage = document.createElement("input");
  textImage.setAttribute("type", "text");
  textImage.setAttribute("placeholder", "Ingresa el texto que deseas para tu imagen");
  textImage.classList.add("textImage");
  containerTextImage.appendChild(textImage);

  const containerButtonTextImage = document.createElement("div");
  containerButtonTextImage.classList.add("containerButtonTextImage");
  containerTextImage.appendChild(containerButtonTextImage);

  const buttonCreateText = document.createElement("button");
  buttonCreateText.setAttribute("type", "button");
  buttonCreateText.classList.add("buttonCreateText");
  buttonCreateText.textContent = 'Crear';
  buttonCreateText.addEventListener("click", function () {
    const inputTextValue = textImage.value.trim();
    if (inputTextValue === "") {
      showEmptyInputMessage()
    } else {
      createCardWithTextAndImage(imageUrl, inputTextValue);
    }
  });
  containerButtonTextImage.appendChild(buttonCreateText);
}

// Crear tarjeta con texto sobre la imagen
const createCardWithTextAndImage = (imageUrl, text) => {
  let cardContainer = document.querySelector(".cardContainer");
  if (!cardContainer) {
    cardContainer = document.createElement("div");
    cardContainer.classList.add("cardContainer");
    document.body.appendChild(cardContainer);
  }

  cardContainer.innerHTML = "";

  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = imageUrl;
  image.classList.add("imageCats");
  card.appendChild(image);

  const textOverlay = document.createElement("h2");
  textOverlay.classList.add("textOverlay");
  textOverlay.textContent = text;
  card.appendChild(textOverlay);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttonContainer");

  const buttonOk = document.createElement("button");
  buttonOk.setAttribute("type", "button");
  buttonOk.classList.add("buttonOk");
  buttonOk.textContent = "Ok";
  buttonOk.addEventListener("click", () => {
    cardContainer.removeChild(card);
  });

  buttonContainer.appendChild(buttonOk);
  card.appendChild(buttonContainer);

  cardContainer.appendChild(card);
}

// Event listener para buscar gatos al hacer click
const setupEventListeners = () => {
  const inputSearch = document.getElementsByClassName("searchInput")[0];
  inputSearch.addEventListener("click", () => {
    const inputText = document.getElementsByClassName("inputText")[0];
    const text = inputText.value.trim();
    const catsContainer = document.getElementById("catsContainer");
    catsContainer.innerHTML = "";

    if (text === "") {
      showEmptyInputMessage();
    } else {
      getCats(text);
    }
  });
}

setupEventListeners();

