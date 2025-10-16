const nome = document.getElementById('nome');
const email = document.getElementById('email');
const btn = document.getElementById('btn');
const messageError = document.getElementById('message-error')
const errorEmail = document.getElementById('email-error')
const ingresso = document.getElementById('ingresso')
const esconder = document.querySelector('.esconder')
const errorUpload = document.getElementById('desc-upload')
const imgInput = document.getElementById('img');
const gitHub = document.getElementById('github');

imgInput.addEventListener("change", () => {
    if (imgInput.files.length > 0) {
        alert("Arquivo adicionado: " + imgInput.files[0].name);
    }
})

btn.addEventListener("click", () => {
    event.preventDefault();

    let imgValido = false;
    let nomeValido = false;
    let emailValido = false;

    if (nome.value.trim() !== "") {
        nome.style.border = "2px solid green"
        messageError.style.display = "none";
        nomeValido = true;
    } else {
        messageError.style.display = "block";
        nome.style.border = "2px solid red"
    }

    if (email.value.trim() !== "" && email.value.includes("@")) {
        email.style.border = "2px solid green"
        errorEmail.style.display = "none";
        emailValido = true;
    } else {
        errorEmail.style.display = "block";
        email.style.border = "2px solid red"
    }

    const imgUpload = document.querySelector('.img-upload');

    if (imgInput.files.length !== 0) {
        errorUpload.textContent = "Arquivo correto";
        errorUpload.style.color = "green";
        const file = imgInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imgUpload.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        imgValido = true;
    } else {
        errorUpload.textContent = "Por favor, selecione um arquivo.";
        errorUpload.style.color = "#ff4d4d";
    }

    if (emailValido && nomeValido && imgValido) {
        esconder.style.display = "none";
        // 🔹 Gera a data do evento automaticamente (exemplo fixo: 31 Jan 2025)
        const eventDate = new Date(2025, 0, 31); // 0 = Janeiro
        const options = { month: "short", day: "numeric", year: "numeric" };
        const formattedDate = eventDate.toLocaleDateString("en-US", options);
        const location = "Curitiba, PR";
        // 🔹 Gera número do ingresso aleatório (ex: #01609)
        const ticketNumber = "#" + String(Math.floor(Math.random() * 99999)).padStart(5, "0");

        ingresso.innerHTML = `
        <H1>Congrats, <span class="nome">${nome.value}!</span> <br> Your ticket is ready.</H1>
        <p>We've emailed your ticket to <br> <span class="email">${email.value}</span> and will send updates in <br> the run up to the event.</p>
        <div class="ticket-container">
            <div class="topo-ingresso">
                <img class="logo-full" src="../../assets/images/logo-mark.svg"/>
                <h2>Coding Conf</h2>
            </div>
            <p class="data-local">${formattedDate} / ${location}</p>
            <img class="ticket" src="../../assets/images/pattern-ticket.svg" alt="ticket"/>
            <img class="perfil" src="${URL.createObjectURL(imgInput.files[0])}" alt="avatar"/>
            <div class="info-ticket">
                <p class="nome-ticket">${nome.value}</p>
                <div class="github-info">
                    <img style="height: 30px; width: 30px;" src="../../assets/images/icon-github.svg"
                    <p class="github-username">${gitHub.value}</p>
                </div>
            </div>
            <p class="ticket-number">${ticketNumber}</p>
        </div>
    `
    }
})
