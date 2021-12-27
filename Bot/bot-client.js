

let usuario = {
    privateKey: "",
    walletKey: "",
}

let ready = false 
let apenasComprar = true;
let botStarted = false;
let botComprarValorAbaixo = false;
let botComprarEmHorario = false;

let lightSwitch;

let visualMode_actual = {
    dispIcons: {
        "Escuro": "🌙",
        "Claro": "☀️",
    },
    dispText: {
        "Escuro": "Modo noturno(Escuro)",
        "Claro": "Modo diurno(Claro)",
    },
    actualUsing: "Claro"
}

const enableSweetAlert2Theme = (theme) => {
    document.head.querySelector('#swal2-theme-styles').setAttribute('href', `https://cdn.jsdelivr.net/npm/@sweetalert2/theme-${theme}/${theme}.css`)
}

function atualizarBase() {
    usuario.privateKey = localStorage.getItem("walletPrivateKey")
    usuario.walletKey = localStorage.getItem("walletWallet")
    $("#privateKey").html("<br> Seu id privado MetaMask:" + usuario.privateKey + " </br>")
    $("#walletKey").html("<br> Sua carteira Metamask:" + usuario.walletKey + " </br>")
    getBalance(usuario.walletKey)
}
function switchVisualMode() {
    if (visualMode_actual.actualUsing == "Escuro") {
        visualMode_actual.actualUsing = "Claro"
        $("#Tudo").css("background-color", "white")
        $("#areaDeDados").css("color", "black")
        $("#visualMode").css("color", "black")
        $("#tituloCompraDeTokens").css("color", "black")
    } else {
        visualMode_actual.actualUsing = "Escuro"
        $("#visualMode").css("color", "white")
        $("#Tudo").css("background-color", "darkgrey")
        $("#areaDeDados").css("color", "white")
        $("#tituloCompraDeTokens").css("color", "white")

    }
    $('body').toggleClass('light dark')
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Modo visual alterado para ' + visualMode_actual.dispText[visualMode_actual.actualUsing],
        showConfirmButton: false,
        timer: 1500
    })
    document.getElementById("visualMode").innerHTML = "Você está no modo " + visualMode_actual.dispText[visualMode_actual.actualUsing]
}

let DefaultPlaceholderdisables = ["pank-horario", "pank-lessValue"]

function desabilitarDaLista() {
    setTimeout(() => {
        console.log("desabilitarDaLista OK")
        DefaultPlaceholderdisables.forEach(element => {
            document.getElementById(element).disabled = true;
        });
        lightSwitch = document.getElementById("lightSwitch");
        setup();
        setTimeout(() => {
            onToggleMode();
            atualizarBase();
            ready = true;
        }, 500);
    }, 50)
}
desabilitarDaLista()

function setUserData(privateKey, walletKey) {
    usuario.privateKey = privateKey;
    usuario.walletKey = walletKey;
}

function copy(text) {
    var blob = new Blob([text],
        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "static.botCfg");
}

function updateBalanceHTML(newBalance) {
    $("#saldoBnb").html("<br> Seu saldo atual: " + newBalance + " BNB</br>")
}
function updateBalanceERR() {
    window.location.href = "../inicio/falha2.html"
    $("#saldoBnb").html("<br> ERRO. Tente denovo(Vá para a página de Inicio e reinsira suas informações, do jeito que está, o bot não funciona :)")
}
function getBalance(privateKey) {
    const chavePrivada = privateKey;
    if (!chavePrivada || chavePrivada.length < 1) {
        updateBalanceERR()
        return;
    }
    $.ajax({
        url: "http://localhost:300/modules/wallet/getWalletBalance",
        cache: false,
        type: "POST",
        data: {
            wallet: chavePrivada
        },
        success: resp => {
            console.log(resp.search(resp, "[ERR]"))
            if (resp.includes("[ERR]")) {
                updateBalanceERR()
            } else {
                updateBalanceHTML(resp)
            }
        }, error: (err) => {
            updateBalanceERR()
        }
    });
}

const checks = {
    check1: () => {
        if (document.getElementById("lessValueCheckBox").checked == true) {
            document.getElementById("pank-lessValue").disabled = false;
        }
        else {
            document.getElementById("pank-lessValue").disabled = true;
            document.getElementById("pank-lessValue").value = ""
        }
    },
    check2: () => {
        if (document.getElementById("horarioCheckBox").checked == true) {
            document.getElementById("pank-horario").disabled = false;
        }
        else {
            document.getElementById("pank-horario").disabled = true;
            document.getElementById("pank-horario").value = ""
        }
    }
}



function abrirPoocoin() {
    let base = "http://poocoin.app/tokens/"
    let token = document.getElementById("tokenHash").value
    if (token.length < 1) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Não há nenhum token no campo',
            showConfirmButton: false,
            timer: 1500
        })
        return;
    }
    let url = base + token
    Swal.fire({
        title: 'Abrir url ' + url + "? O link será aberto em uma nova guia",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: `Não. Voltar ao trabalho`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.open(url, '_blank');
        } else if (result.isDenied) {
        }
    })
}


function configuracaoPadrao() {
    Swal.fire({
        title: 'Tem certeza que quer substituir a sua configuração e aplicar as padrões?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Aplicar configuração padrão',
        denyButtonText: `Não aplicar configuração padrão`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            TokenHash = "Insira o token Hash aqui"
            tokensBuy = 1
            GasMaximo = 200000000
            buyTimes = 1
            SlipageMaximo = 60
            Gwei = 20
            console.log("Setando configuração padrão: ")
            console.log("TokenHash: " + TokenHash)
            console.log("tokensBuy: " + tokensBuy)
            console.log("GasMaximo: " + GasMaximo)
            console.log("buyTimes: " + buyTimes)
            console.log("SlipageMaximo: " + SlipageMaximo)
            console.log("Gwei: " + Gwei)
            document.getElementById("tokenHash").value = TokenHash
            document.getElementById("tokenQnt").value = tokensBuy
            document.getElementById("maxGas").value = GasMaximo
            document.getElementById("buyTimes").value = buyTimes
            document.getElementById("slipageMaximo").value = SlipageMaximo
            document.getElementById("gwei").value = Gwei
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Configuração padrão aplicada com sucesso!',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (result.isDenied) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Configuração padrão não aplicada',
                showConfirmButton: false,
                timer: 1500
            })
        }
    })
}

function darkMode() {
    enableSweetAlert2Theme('dark');
    $("#visualMode").css("color", "white")
    // $("#Tudo").css("background-color", "darkgrey")
    $("#areaDeDados").css("color", "white")
    $("#tituloCompraDeTokens").css("color", "white")
    $("#lessValueLABEL").css("color", "white")
    $("#lessValueLABEL2").css("color", "white")

    document.querySelectorAll(".bg-light").forEach((element) => {
        element.className = element.className.replace(/-light/g, "-dark");
    });

    // #292b2c
    document.body.style.setProperty("--bg-color", "#292b2c");
    document.body.classList.add("bg-dark");

    if (document.body.classList.contains("text-dark")) {
        document.body.classList.replace("text-dark", "text-light");
    } else {
        document.body.classList.add("text-light");
    }

    // set light switch input to true
    if (!lightSwitch.checked) {
        lightSwitch.checked = true;
    }
    localStorage.setItem("lightSwitch", "dark");
}
function lightMode() {
    enableSweetAlert2Theme('light');
    $("#areaDeDados").css("color", "black")
    $("#visualMode").css("color", "black")
    $("#tituloCompraDeTokens").css("color", "black")
    $("#lessValueLABEL").css("color", "black")
    $("#lessValueLABEL2").css("color", "black")
    document.querySelectorAll(".bg-dark").forEach((element) => {
        element.className = element.className.replace(/-dark/g, "-light");
    });

    document.body.classList.add("bg-light");

    if (document.body.classList.contains("text-light")) {
        document.body.classList.replace("text-light", "text-dark");
    } else {
        document.body.classList.add("text-dark");
    }

    if (lightSwitch.checked) {
        lightSwitch.checked = false;
    }
    localStorage.setItem("lightSwitch", "light");
}

function onToggleMode() {
    if (lightSwitch.checked) {
        console.log("Ativando tema escuro/noite")
        darkMode();
    } else {
        console.log("Ativando tema claro/dia")
        lightMode();
    }
}

function getSystemDefaultTheme() {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
        return "dark";
    }
    return "light";
}

function setup() {
    var settings = localStorage.getItem("lightSwitch");
    if (settings == null) {
        settings = getSystemDefaultTheme();
    }

    if (settings == "dark") {
        lightSwitch.checked = true;
    }

    // lightSwitch.addEventListener("change", onToggleMode);
}


function iniciarBot() {
    if (!botStarted) {
        botStarted = true
        console.log("Operação iniciada")
        let checks = {}
        checks["byTime"] = document.getElementById("horarioCheckBox").checked
        checks["byTokenValue"] = document.getElementById("lessValueCheckBox").checked
        let condicoes_de_compra = {}
        let reqs = 0;
        if (checks["byTime"]) {
            reqs += 1
            botComprarEmHorario = true
            condicoes_de_compra["byTime"] = "tentar comprar apenas ás " + document.getElementById("pank-horario").value
        }
        if (checks["byTokenValue"]) {
            reqs += 1
            botComprarValorAbaixo = true
            condicoes_de_compra["byTokenValue"] = "tentar comprar apenas quando o valor estiver abaixo de : " + document.getElementById("pank-lessValue").value
        }

        if (reqs > 0) {
            console.log(" ** Condições especiais de Compra ** ")
            for (i = 0; i < Object.keys(condicoes_de_compra).length; i++) {
                console.log(" ***" + Object.keys(condicoes_de_compra)[i] + "::" + condicoes_de_compra[Object.keys(condicoes_de_compra)[i]] + " *** ")
            }
        }

    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'O bot já está iniciado',
            showConfirmButton: false,
            timer: 1500
        })
    }
}


function sendServerTempLog(log) {
    if(!ready){return}
    let privateKey = usuario.privateKey;
    $.ajax({
        url: "http://localhost:300/modules/logStorer/insertlog",
        cache: false,
        type: "POST",
        data: {
            key: privateKey,
            log: log
        },
        success: resp => {
            
        }, error: (err) => {
            
        }
    });
}