let wallet, private;
function onOpen() {
    console.log(window.location.href)
    if (window.location.href.includes("Inicio.html")) {
        setTimeout(() => {
            var settings = localStorage.getItem("lightSwitch");
            if (settings == "dark") {
                document.body.style.setProperty("--bg-color", "#292b2c");
                document.body.classList.add("bg-dark");
                for (i = 1; i < 4; i++) {
                    let at = "texto" + i;
                    document.getElementById(at).style.color = "white";
                }
            }
        }, 50)
    }
}
onOpen()

function sendInfo(__private, __wallet) {
    console.log("Inserindo informações no localStorage")
    localStorage.setItem("walletPrivateKey", __private);
    localStorage.setItem("walletWallet", __wallet);
    $("#detalhe").html("Aguarde, estamos enviando as informações necessárias para outra página através de Cookies.")
    setTimeout(() => {
        window.location.href = "carregamento.html";
    },1000)
}
function entrarComChavePrivada() {
    const chavePrivada = $("#privateKey").val();

    // if(!chavePrivada || chavePrivada.length < 1) {
    //     alert("Você não inseriu a chave privada")
    //     return;
    // }
    // $.ajax({
    //     url  : "http://localhost:300/returnWalletBalance",
    //     cache: false,
    //     type: "GET",
    //     data : {
    //         wallet: chavePrivada
    //     },
    //     success : resp=>{
    //         console.log(resp.search(resp, "[ERR]"))
    //         if(resp.includes("[ERR]"))   {
    //             alert("Erro encontrado: " + resp)
    //         } else {
    //             alert("Sucess: " + resp + " BNB");
    //         }
    //     }, error: (err)=>{
    //         alert(JSON.stringify(err));
    //     }

    // });
}

const loader = {
    start: (walletKey, privateKey) => {
        setTimeout(function () {
            const privateKey = wallet;
            const walletKey = private;
            console.log(private, wallet)
            if (walletKey != undefined && privateKey != undefined && privateKey.length >= 0 && walletKey.length >= 0) {
            } else {
                console.log('falha?', walletKey, privateKey);
                // window.location.href = "falha.html";    
            }
        }, 2000);
    }
}