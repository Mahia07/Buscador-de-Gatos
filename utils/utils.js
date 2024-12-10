export const showEmptyInputMessage = () => {

    let card = document.createElement("div");
    card.classList.add("card");
    let message = document.createElement("p");
    message.classList.add("message");
    message.textContent = "Este espacio no puede estar en blanco";
  
    let input = document.createElement("div");
    input.classList.add("input");
    input.textContent = "Entendido";
  
    card.appendChild(message);
    card.appendChild(input);
  
    document.body.appendChild(card);
  
    input.addEventListener("click", function () {
      document.body.removeChild(card);
    });
  };
  
  export const showError404 = () => {
    let imageError = document.createElement("div");
    imageError.classList.add("cardError");
    imageError.textContent = "Error al obtener imagen. Por favor comprueba que las características estén en inglés y bien escritas.";
  
    let inputError = document.createElement("button");
    inputError.classList.add("inputError");
    inputError.textContent = "Entendido";
  
    document.body.appendChild(imageError);
    imageError.appendChild(inputError)
  
    inputError.addEventListener("click", function () {
      document.body.removeChild(imageError);
      document.body.removeChild(inputError);
    });
  };
  
  export const internetError = () => {
    let imageInternetError = document.createElement("div")
    imageInternetError.classList.add("cardInternetError")
    imageInternetError.textContent = "Error al obtener imagen. Comprueba tu conexion a Internet"
  
    let inputError = document.createElement("button")
    inputError.classList.add("inputError");
    inputError.textContent = "Entendido";
  
    imageInternetError.appendChild(inputError)
    document.body.appendChild(imageInternetError)
  
    inputError.addEventListener("click", function () {
      document.body.removeChild(imageInternetError);
    });
  }
  export let error504 = () => {
    let imageError504 = document.createElement("div")
    imageError504.classList.add("imageError504")
    imageError504.textContent = 'Error al obtener imagen. No se pudo completar la solicitud, Intentelo mas tarde'
    
  
    let inputError = document.createElement("button")
    inputError.classList.add("inputError");
    inputError.textContent = "Entendido";
  
    imageError504.appendChild(inputError)
    document.body.appendChild(imageError504)
  
    inputError.addEventListener("click", function () {
      document.body.removeChild(imageError504);
    });
  }
  
  
  export const validateInput = (inputValue) => {
    const inputText = document.getElementById("characteristicsCat");
    const errorMessage = document.getElementById("errorMessage");
    const regex = /^[a-zA-Z\s]+$/;
  
    inputText.addEventListener("input", function () {
      const inputValue = inputText.value;
  
  
  
      if (inputValue === "") {
        errorMessage.textContent = "";
      } else if (regex.test(inputValue)) {
        errorMessage.textContent = "";
      } else {
        errorMessage.textContent = "No se permiten números ni caracteres especiales";
      };
  
    });
  }
  