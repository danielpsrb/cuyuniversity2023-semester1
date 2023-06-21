const http = require('http');
const rupiah = require('rupiah-format');
const fs = require('fs');
const os = require('os');
const host = 'localhost'
const port = 3002

// request adalah data masuk dari luar
// response adalah data keluar dari sistem

const server = http.createServer(function (request, response) {
    const nama ="DANIEL PASARIBU";
    let uang = 600000;
    let jajan = 150000;
    let sisa = uang - jajan;

    uang = rupiah.convert(uang)
    jajan = rupiah.convert(jajan)
    sisa = rupiah.convert(sisa)

    fs.appendFile('sisauang.tx', sisa, () => {
        console.log('data uang berhasil disimpan')
    });

    const sisaRam = os.freemem();

    const hasil = `
    <head>
    <title>${nama}</title>
    </head>
    <body>
    <h1 style='background: black; color: white; padding: 20px; text-align: center'>NODE JS UANG JAJAN </h1>
    <p>
    Halo nama saya ${nama}. saya jajan sebanyak ${jajan}, uang saya tadinya ${uang}, sekarang menjadi ${sisa}. 
    <h5>sisa ram pc saya ${sisaRam}</h5>
    </p>
    </body>
    `

    response.statusCode = 203;
    response.end(hasil);
});

server.listen(port, host, '', function () {
    console.log(`server menyala di ${host}:${port}`);
});