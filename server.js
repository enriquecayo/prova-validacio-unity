const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Dades simulades
let usuarisLogejats = [
    { id: 1, nom: "Albert", hora: "09:30" },
    { id: 2, nom: "Zoe", hora: "10:15" },
    { id: 3, nom: "Marc", hora: "08:45" },
    { id: 4, nom: "Berta", hora: "11:00" }
];

// ENDPOINT 1: Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Intent de login: ${username}`);

    if (username && password) {
        // Simulem que qualsevol usuari amb password "1234" entra
        if (password === "1234") {
            res.status(200).send({ message: "Login correcte", token: "abc-123" });
        } else {
            res.status(401).send({ message: "Password incorrecte" });
        }
    } else {
        res.status(400).send({ message: "Falten dades" });
    }
});

// ENDPOINT 2: Llista d'usuaris
app.get('/users', (req, res) => {
    const ordenar = req.query.sort === 'true';
    let llista = [...usuarisLogejats];

    if (ordenar) {
        llista.sort((a, b) => a.nom.localeCompare(b.nom));
        console.log("Llista enviada (ordenada)");
    } else {
        console.log("Llista enviada (sense ordenar)");
    }

    res.status(200).json(llista);
});

app.listen(port, () => {
    console.log(`Servidor d'examen corrent a http://localhost:${port}`);
});