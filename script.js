document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los campos del formulario de registro
    const emailInput = document.getElementById("email");
    const telefonoInput = document.getElementById("telefono");
    const contraseñaInput = document.getElementById("contraseña");
    const confirmarContraseñaInput = document.getElementById("confirmarContraseña");

    // Formulario de análisis de texto
    const mainText = document.getElementById("mainText");
    const searchText = document.getElementById("searchText");
    const replaceText = document.getElementById("replaceText");
    const results = document.getElementById("results");
    const buttons = document.querySelectorAll("#analisis-texto button");

    // Función para validar el formulario de registro
    document.querySelector("#registro form").addEventListener("submit", (e) => {
        e.preventDefault();

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        // Validar teléfono
        const telefonoRegex = /^9\d{8}$/;
        if (!telefonoRegex.test(telefonoInput.value)) {
            alert("El número de teléfono debe tener 9 dígitos y empezar con 9.");
            return;
        }

        // Validar contraseña
        const contraseñaRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).{6,}$/;
        if (!contraseñaRegex.test(contraseñaInput.value)) {
            alert("La contraseña debe tener al menos 6 caracteres, incluir un número y un carácter especial.");
            return;
        }

        // Validar confirmación de contraseña
        if (contraseñaInput.value !== confirmarContraseñaInput.value) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        alert("Formulario enviado correctamente.");
    });

    // Función: Buscar texto
    buttons[0].addEventListener("click", () => {
        const mainContent = mainText.innerHTML;
        const searchValue = searchText.value.trim();

        if (!searchValue) {
            alert("Por favor, ingresa un texto para buscar.");
            return;
        }

        const searchRegex = new RegExp(searchValue, "gi");
        const matches = [...mainContent.matchAll(searchRegex)];

        if (matches.length === 0) {
            results.classList.remove("d-none");
            results.textContent = "El texto buscado no se encuentra en el texto principal.";
        } else {
            results.classList.add("d-none");
            mainText.innerHTML = mainContent.replace(searchRegex, (match) => `<mark>${match}</mark>`);
        }
    });

    // Función: Reemplazar texto
    buttons[1].addEventListener("click", () => {
        const searchValue = searchText.value.trim();
        const replaceValue = replaceText.value.trim();

        if (!searchValue || !replaceValue) {
            alert("Por favor, ingresa texto para buscar y reemplazar.");
            return;
        }

        const searchRegex = new RegExp(searchValue, "gi");
        const mainContent = mainText.innerHTML;

        if (!searchRegex.test(mainContent)) {
            alert("El texto a reemplazar no se encuentra en el texto principal.");
            return;
        }

        mainText.innerHTML = mainContent.replace(searchRegex, replaceValue);
    });

    // Función: Analizar texto
    buttons[2].addEventListener("click", () => {
        const plainText = mainText.textContent;

        // Contar palabras y caracteres
        const palabras = plainText.match(/\b\w+\b/g) || [];
        const caracteres = plainText.match(/\S/g) || [];

        results.classList.remove("d-none");
        results.innerHTML = `
            <p><strong>Palabras:</strong> ${palabras.length}</p>
            <p><strong>Caracteres (sin espacios):</strong> ${caracteres.length}</p>
        `;
    });
});
