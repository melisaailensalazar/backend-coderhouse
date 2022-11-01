const Contenedor = require('./Contenedor');
const express = require('express');

const PORT = 8080;
const app = express();
const server = app.listen(process.env.PORT || PORT, () =>
	console.log(`Server listening on PORT ${PORT}`)
);
server.on('error', err => console.log(`Error: ${err}`));

const productos = new Contenedor('productos.txt');

app.get('/productos', async (req, res) => {
	const mostrarProductos = await productos.getAll();
	res.send(mostrarProductos);
});

app.get('/productorandom', async (req, res) => {
	const products = await productos.getAll();
	const numeroRandom = Math.floor(Math.random() * products.length);
	res.send(products[numeroRandom]);
});