const protocolo = 'http://'
const baseURL = 'localhost:3002'

/* async function cadastrarEvento() {
    //pega os inputs que contém os valores que o usuário digitou
    let nomeInput = document.querySelector('#nomeInput')
    let descricaoInput = document.querySelector('#descricaoInput')
    let urlBannerInput = document.querySelector('#urlBannerInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let dataFimInput = document.querySelector('#dataFimInput')
    let horarioInicioInput = document.querySelector('#horarioInicioInput')
    let horarioFimInput = document.querySelector('#horarioFimInput')
    let valorInput = document.querySelector('#valorInput')
    let urlIngressoInput = document.querySelector('#urlIngressoInput')
    let ruaInput = document.querySelector('#ruaInput')
    let numeroInput = document.querySelector('#numeroInput')
    let bairroInput = document.querySelector('#bairroInput')
    let estadoInput = document.querySelector('#estadoInput')
    let cidadeInput = document.querySelector('#cidadeInput')
    let cepInput = document.querySelector('#cepInput')
    let complementoInput = document.querySelector('#complementoInput')
    let categoriaInput = document.querySelector('#categoriaInput')

    //pega os valores digitados pelo usuário
    let nome = nomeInput.value
    let descricao = descricaoInput.value
    let urlBanner = urlBannerInput.value
    let dataInicio = dataInicioInput.value
    let dataFim = dataFimInput.value
    let horarioInicio = horarioInicioInput.value
    let horarioFim = horarioFimInput.value

    let ingresso = {
        valor: valorInput.value,
        urlIngresso: urlIngressoInput.value
    }

    let endereco = {
        rua: ruaInput.value,
        numero: numeroInput.value,
        bairro: bairroInput.value,
        estado: estadoInput.value,
        cidade: cidadeInput.value,
        cep: cepInput.value,
        complemento: complementoInput.value
    }

    let categoria = {
        nome: categoriaInput.value,
        descricao: ""
    }

    if (!nome || !descricao || !dataInicio || !horarioInicio || !horarioFim || !endereco.bairro || !endereco.cep || !endereco.estado || !endereco.cidade || !endereco.numero || !endereco.rua){
        alert("Preencha os campos obrigatórios!")
        return 
    }
    //limpa os campos que o usuário digitou
    nomeInput.value = ""
    descricaoInput.value = ""
    urlBannerInput.value = ""
    dataInicioInput.value = ""
    dataFimInput.value = ""
    horarioInicioInput.value = ""
    horarioFimInput.value = ""
    valorInput.value = ""
    urlIngressoInput.value = ""
    ruaInput.value = ""
    numeroInput.value = ""
    bairroInput.value = ""
    estadoInput.value = ""
    cepInput.value = ""
    complementoInput.value = ""

    const usuario = JSON.parse(localStorage.getItem("Usuario"))
    console.log(usuario._id)
    if(!usuario){
        alert("Faça login antes de cadastrar um evento!")
        return
    }

    try{
        //envia os dados ao servidor (back end)
        const eventosEndpoint = '/evento'
        const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`

        const eventos = (await axios.post(URLCompleta, {
                    nome,
                    descricao,
                    usuario,
                    urlBanner,
                    dataInicio,
                    dataFim,
                    horarioInicio,
                    horarioFim,
                    ingresso,
                    endereco,
                    categoria
                }
            )
        ).data
        console.log(eventos)
        const divAlerta = document.getElementById('alert-evento')
        divAlerta.classList.add('alert-success')
        divAlerta.style.display = "block"
        divAlerta.innerHTML = "Evento cadastrado com sucesso!"
    }catch(error){
        console.log(error)
        const divAlerta = document.getElementById('alert-evento')
        divAlerta.classList.add('alert-danger')
        divAlerta.style.display = "block"
        divAlerta.innerHTML = "Ocorreu um erro ao cadastrar evento"
    }
} */
    document.getElementById('eventoForm').addEventListener('submit', async (evento) => {
        evento.preventDefault(); 
        await cadastrarEvento();
    });
    
    async function cadastrarEvento() {
        const usuario = JSON.parse(localStorage.getItem("Usuario"));
        if (!usuario) {
            alert("Faça login antes de cadastrar um evento!");
            return;
        }
 
        const nome = document.querySelector('#nomeInput').value;
        const descricao = document.querySelector('#descricaoInput').value;
        const bannerInput = document.querySelector('#urlBannerInput');
        const dataInicio = document.querySelector('#dataInicioInput').value;
        const dataFim = document.querySelector('#dataFimInput').value;
        const horarioInicio = document.querySelector('#horarioInicioInput').value;
        const horarioFim = document.querySelector('#horarioFimInput').value;
        const valor = document.querySelector('#valorInput').value;
        const urlIngresso = document.querySelector('#urlIngressoInput').value;
        const rua = document.querySelector('#ruaInput').value;
        const numero = document.querySelector('#numeroInput').value;
        const bairro = document.querySelector('#bairroInput').value;
        const estado = document.querySelector('#estadoInput').value;
        const cidade = document.querySelector('#cidadeInput').value;
        const cep = document.querySelector('#cepInput').value;
        const complemento = document.querySelector('#complementoInput').value;
        const categoria = document.querySelector('#categoriaInput').value;
/*     
        if (!nome || !descricao || !dataInicio || !horarioInicio || !horarioFim || !rua || !numero || !bairro || !estado || !cidade || !cep) {
            alert("Preencha os campos obrigatórios!");
            return;
        } */
    
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('descricao', descricao);
        formData.append('usuarioId', usuario._id);
        formData.append('dataInicio', dataInicio);
        formData.append('dataFim', dataFim);
        formData.append('horarioInicio', horarioInicio);
        formData.append('horarioFim', horarioFim);
        formData.append('ingresso[valor]', valor ? parseFloat(valor) : null);
        formData.append('ingresso[urlIngresso]', urlIngresso);
        formData.append('endereco[rua]', rua);
        formData.append('endereco[numero]', numero);
        formData.append('endereco[bairro]', bairro);
        formData.append('endereco[estado]', estado);
        formData.append('endereco[cidade]', cidade);
        formData.append('endereco[cep]', cep);
        formData.append('endereco[complemento]', complemento);
        formData.append('categoria[nome]', categoria);
        formData.append('categoria[descricao]', '');

        if (bannerInput.files.length > 0) {
            formData.append('banner', bannerInput.files[0]);
        }
    
        try {
            const eventosEndpoint = '/evento';
            const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`;
    
            const response = await axios.post(URLCompleta, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            document.getElementById('eventoForm').reset();

            const divAlerta = document.getElementById('alert-evento');
            divAlerta.classList.add('alert-success');
            divAlerta.style.display = "block";
            divAlerta.innerHTML = "Evento cadastrado com sucesso!";
        } catch (error) {
            console.error("Erro ao cadastrar evento:", error);
            const divAlerta = document.getElementById('alert-evento');
            divAlerta.classList.add('alert-danger');
            divAlerta.style.display = "block";
            divAlerta.innerHTML = "Ocorreu um erro ao cadastrar evento.";
        }
    }

async function buscarEventos(){
    const eventosEndpoint = '/eventos'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`
    const eventos = (await axios.get(URLCompleta)).data

    eventos.forEach(evento => {
        let dataInicio = evento.dataInicio 
        let dataInicioSeparada = dataInicio.split('-')
        dataInicio = `${dataInicioSeparada[2]}/${dataInicioSeparada[1]}`
        evento.dataInicio = dataInicio

        let dataFim = evento.dataFim
        let dataFimSeparada = dataInicio.split('-')
        dataFim = `${dataFimSeparada[2]}/${dataFimSeparada[1]}`
        evento.dataFim = dataFim

        addHtml(evento)
    })
}

function addHtml(evento){
    const eventoHtml = document.createElement('div')
    eventoHtml.classList.add('col-sm-4','evento-card')
    eventoHtml.dataset.eventoId = evento._id
    eventoHtml.dataset.eventoNome = evento.nome
    const imageSrc = evento.url_banner && evento.url_banner.data
        ? `data:${evento.url_banner.contentType};base64,${evento.url_banner.data.toString('base64')}`
        : "img/capa-evento.png";
    eventoHtml.innerHTML = `
        <div class="card">
            <img src="${imageSrc}" class="card-img-top" alt="Imagem do evento">
            <div class="card-body">
                <h5 class="card-title">${evento.nome}</h5>
                <h6 class="card-subtitle">${evento.dataInicio} - ${evento.horarioInicio}</h6>
                <p class="card-text">${evento.descricao}</p>
                <div class="categories">
                    <span class="card-link">${evento.categoria.nome}</span>
                </div>
            </div>
        </div>
    `
    eventoHtml.addEventListener('click', () => {
        window.location.href = `evento.html?id=${evento._id}`
    })

    const eventos = document.querySelector('#eventos-list-2')
    const row = document.createElement('div')
    row.classList.add('row')
    row.classList.add('eventos-carousel-3')
    eventos.appendChild(row)
    row.appendChild(eventoHtml)
}

async function carregarEvento(id){
    const meses = ["jan","fev","mar","abr","maio","jun","jul","ago","set","out","nov","dez"]

    const eventosEndpoint = `/evento/${id}`
    const URLCompletaEvento = `${protocolo}${baseURL}${eventosEndpoint}`
    const evento = (await axios.get(URLCompletaEvento)).data

    const titulo = document.querySelector('.event-title')
    titulo.innerHTML = evento.nome

    const descricao = document.querySelector('.event-description-text')
    descricao.innerHTML = evento.descricao

    const descricao1 = document.querySelector('.event-description-text1')
    descricao1.innerHTML = evento.descricao

    const ingresso = document.querySelector('.ticket-value')
    if(evento.ingresso.valor){
        ingresso.innerHTML = "R$" + evento.ingresso.valor + ",00"
    }else{
        ingresso.innerHTML = "R$0,00"
    }

    const datahora = document.querySelector('.event-date-time')
    let dataInicio = evento.dataInicio 
    let dataInicioSeparada = dataInicio.split('-')
    dataInicio = `${dataInicioSeparada[2]} de ${meses[parseInt(dataInicioSeparada[1]-1)]}. de ${dataInicioSeparada[0]}`
    
    evento.dataInicio = dataInicio

    datahora.innerHTML = evento.dataInicio + " | " + evento.horarioInicio + " às " + evento.horarioFim

    const local = document.querySelector('.event-location')
    local.innerHTML = evento.endereco.rua + ", " + evento.endereco.numero + " - " +evento.endereco.bairro + " - " + evento.endereco.estado

    const categoria = document.querySelector('.event-categories a')
    categoria.innerHTML = evento.categoria.nome

    const usuarioEndpoint = `/usuario/${evento.usuarioId}`
    const URLCompletaUsuario = `${protocolo}${baseURL}${usuarioEndpoint}`
    const usuario = (await axios.get(URLCompletaUsuario)).data
    console.log(usuario)
    const organizador = document.querySelector('.organizer-name')
    organizador.innerHTML = usuario.nome

    const telefone = document.querySelector('.telefone')
    telefone.innerHTML = usuario.telefone
    
}

async function cadastrarUsuario() {
    let nomeInput = document.querySelector('#nomeCadastroInput')
    let nomeUsuarioInput = document.querySelector('#usuarioCadastroInput')
    let emailInput = document.querySelector('#emailCadastroInput')
    let senhaInput = document.querySelector('#senhaCadastroInput')
    let telefoneInput = document.querySelector('#telefoneCadastroInput')
    let cpfInput = document.querySelector('#cpfCadastroInput')

    let nome = nomeInput.value
    let nomeUsuario = nomeUsuarioInput.value
    let email = emailInput.value
    let senha = senhaInput.value
    let telefone = telefoneInput.value
    let cpf = cpfInput.value

    try {
        const cadastroEndpoint = '/cadastro'
        const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`

        const usuario = (await axios.post(URLCompleta, {
                    nome,
                    nomeUsuario,
                    email,
                    senha,
                    telefone,
                    cpf
                }
            )
        ).data

        localStorage.setItem("Usuario",JSON.stringify(usuario))
        console.log(localStorage.getItem("Usuario"))

        nomeUsuarioInput.value = ""
        senhaInput.value = ""
        emailInput.value = ""
        cpfInput.value = ""

        console.log(usuario)
        
        const divAlerta = document.getElementById('alert-cadastro')
        divAlerta.classList.add('alert-success')
        divAlerta.style.display = "block"
        divAlerta.innerHTML = "Usuário cadastrado com sucesso!"
        console.log(divAlerta)
    }
    catch (error) {
        const divAlerta = document.getElementById('alert-cadastro')
        divAlerta.classList.add('alert-danger')
        divAlerta.style.display = "block"
        divAlerta.innerHTML = "Ocorreu um erro ao cadastrar usuário"
        console.log(error)
    }
}

const fazerLogin = async () => {
    let emailLoginInput = document.querySelector('#emailLoginInput')
    let senhaLoginInput = document.querySelector('#senhaLoginInput')

    let email = emailLoginInput.value
    let senha = senhaLoginInput.value

    try {
        const loginEndpoint = '/login'
        const URLCompleta = `${protocolo}${baseURL}${loginEndpoint}`
        const resposta = (await axios.post(URLCompleta, {
                    email: email,
                    senha: senha
                }
            )   
        ).data
        console.log(resposta.usuario)
        localStorage.setItem("Usuario",JSON.stringify(resposta.usuario))
        console.log(localStorage.getItem("Usuario"))

        emailLoginInput.value=""
        senhaLoginInput.value=""
        window.location.href = "index.html"
        alert("Bem-vindo!")

        console.log(divAlerta)
    }catch (error) {
        const divAlerta = document.getElementById('alert-login')
        divAlerta.classList.add('alert-danger')
        divAlerta.style.display = "block"
        divAlerta.innerHTML = "Ocorreu um erro ao fazer login"
        console.log(error)
    }
}

function exibirAlerta(alerta, classe){
    let divAlerta = document.getElementById('alert')

    console.log(divAlerta)
    divAlerta.style.display = "block"
    divAlerta.classList.add(classe)
    
    divAlerta.innerHTML = alerta
}

async function getData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
}

function toggleChatbot() {
    let chatbot = document.getElementById("chatbot-container");
    chatbot.style.display = chatbot.style.display === "none" || chatbot.style.display === "" ? "flex" : "none";
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    let inputField = document.getElementById("chatbot-input");
    let message = inputField.value.trim();
    if (message === "") return;

    let chatBox = document.getElementById("chatbot-messages");
    chatBox.innerHTML += `<div><strong>Você:</strong> ${message}</div>`;

    inputField.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    fetchChatbotResponse(message);
}

async function fetchChatbotResponse(userMessage) {
    let chatBox = document.getElementById("chatbot-messages");

    if (!userMessage.trim()) return;

    chatBox.innerHTML += `<div><strong>Você:</strong> ${userMessage}</div>`;

    let loadingMessage = document.createElement("div");
    loadingMessage.innerHTML = `<strong>Bot:</strong> Digitando...`;
    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let response = await axios.post("/api/chatbot", { message: userMessage });

        let botResponse = response?.data?.reply || "Não entendi sua pergunta. Pode reformular?";

        loadingMessage.remove();
        chatBox.innerHTML += `<div><strong>Bot:</strong> ${botResponse}</div>`;
    } catch (error) {
        console.error("Erro na API:", error);

        loadingMessage.remove();
        chatBox.innerHTML += `<div><strong>Bot:</strong> Ocorreu um erro, tente novamente.</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}


function getBotReply(message) {
    message = message.toLowerCase();
    if (message.includes("evento")) return "Você pode conferir os eventos na página principal!";
    if (message.includes("ingresso")) return "Os ingressos estão disponíveis na seção de eventos!";
    if (message.includes("localização")) return "Os eventos ocorrem em diversas localidades, confira os detalhes do evento!";
    return "Desculpe, não entendi. Você pode reformular a pergunta?";
}
 
let mediaRecorder;
let audioChunks = [];

document.getElementById("recordButton").addEventListener("click", async function () {
    if (!mediaRecorder || mediaRecorder.state === "inactive") {
        startRecording();
    } else {
        stopRecording();
    }
});

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            sendAudioToAPI(audioBlob);
        };

        mediaRecorder.start();
        document.getElementById("recordButton").innerHTML = '<i class="fa-solid fa-stop"></i>';
    } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Microphone access is needed for transcription.");
    }
}

function stopRecording() {
    mediaRecorder.stop();
    document.getElementById("recordButton").innerHTML = '<i class="fa-solid fa-microphone"></i>';
}

async function sendAudioToAPI(audioBlob) {
    let formData = new FormData();
    formData.append("audio_file", audioBlob, "recorded_audio.wav");

    try {
        const audioEndpoint = '/asr';
        const URLCompleta = `${protocolo}${baseURL}${audioEndpoint}`;
        let response = await axios.post(URLCompleta, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        const transcript = await response.data.text;
        document.getElementById("searchInput").value = transcript;
    } catch (error) {
        console.error("Error during transcription:", error);
        alert("Failed to transcribe the audio.");
    }
}
