let tempSvData__keys = {};
let tempSvData__console = {};
let tempSvData__vars = {}

exports.insertLog = (req, res) => {
    if (!req.body.log && !req.body.key) {
        res.end("não há dados para inserir")
        return;
    }
    let privKey = req.body.key
    let log = req.body.log
    if (typeof tempSvData__console[privKey] != 'object' || tempSvData__console[privKey] == null) {
        tempSvData__console[privKey] = {}
        tempSvData__console[privKey][0] = log
        res.end("Dado Armazenado")
    } else {
        tempSvData__console[privKey][Object.keys(tempSvData__console[privKey]).length + 1] = log;
        res.end("Dado Armazenado em " + ( Object.keys(tempSvData__console[privKey]).length + 1))
    }
}

exports.getLogs = (req, res) => {
    let privKey = req.body.key
    if (typeof tempSvData__console[privKey] != 'object' || tempSvData__console[privKey] == null) {
        res.end({})
    } else {
        res.end(JSON.stringify(tempSvData__console[privKey]))
    }
}