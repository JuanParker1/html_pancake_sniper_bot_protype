const fs = require('fs');
const Cronr = require('cronr');
const Web3 = require('web3');
const url = 'https://bsc-dataseed.binance.org/';

exports.getWalletBalance = (req, res) => {
    if (!req.body.wallet) {
        res.end("[ERR]<b>Erro:</b> wallet não inserido");
        return;
    }
    var wallet = req.body.wallet;
    let web3 = new Web3(new Web3.providers.HttpProvider(url));
    try {
        web3.eth.getBalance(wallet, (errors, resposta) => {
            if (!errors) {
                res.end(web3.utils.fromWei(resposta, 'ether').toString())
            } else {
                res.end("[ERR]Um erro foi encontrado.")
            }
        });
    } catch (e) {
        res.end("[ERR]Foi encontrado um erro. Solicitação não pôde ser processada ")
    }
}
