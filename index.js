const express = require('express');
const { create } = require('express-handlebars');
const {
	leerAnime,
	buscarPorNombre,
	agregarAnime,
	actualizarAnime,
	borrarAnime,
} = require('./src/utils/utils.js');

const app = express();
const hbs = create({
	partialsDir: ['src/views/partials/'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

app.use(express.json());

app.use(express.static('public'));
app.use(
	'/bootstrap',
	express.static(__dirname + '/node_modules/bootstrap/dist/')
);

const PORT = 3000;
let server = app.listen(
	PORT,
	console.log('Servidor escuchando en http://localhost:' + PORT)
);

// --RUTAS--//
// HOME
app.get(['/', '/home'], async (req, res) => {
	let data = await leerAnime();
	res.render('home', {
		home: true,
		animes: data.animes,
	});
});
// ADD ANIME
app.get('/animes/new', (req, res) => {
	res.render('newAnime', {
		new: true,
	});
});
// API DE ANIMES
app.get('/animes', async (req, res) => {
	let animes = await leerAnime();
	res.send(animes);
});

app.get('/animes/:id', async (req, res) => {
	const { id } = req.params;
	let data = await leerAnime();
	let found = data.animes.find((anime) => anime.id == id);
	res.render('actualizar', {
		anime: found,
	});

});
app.get('/anime/:nombre', async (req, res) => {
	try {
		let { nombre } = req.params;
		let encontrado = await buscarPorNombre(nombre);
		res.render('anime', {
			anime: encontrado,
		});
	} catch (error) {}
});

app.put('/animes/:id', async (req, res) => {
	try {
		const { id } = req.params;
		let { nombre, genero, year, autor } = req.body;
		let respuesta = await actualizarAnime(id, nombre, genero, year, autor);

		res.status(200).send({ code: 200, message: respuesta });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send({ code: 500, message: 'Error al intentar actualizar el anime' });
	}
});

// --RUTAS ENDPOINT--
// CREA ANIMES
app.post('/animes/new', async (req, res) => {
	try {
		let { nombre, genero, year, autor } = req.body;
		let respuesta = await agregarAnime(nombre, genero, year, autor);
		res.status(201).send({ code: 201, message: respuesta });
	} catch (error) {
		console.log(error);
		res.status(500).send({
			code: 500,
			message: 'Error al guardar anime en la Base de Datos',
		});
	}
});
// ELIMINA ANIME DE LA BASE DE DATOS
app.delete('/animes/:id', async (req, res) => {
	try {
		let { id } = req.params;
		let respuesta = await borrarAnime(id);
		res.status(200).send({ code: 200, message: respuesta });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.send({ code: 500, message: 'Error al eliminar anime en la Base de Datos' });
	}
});

app.all('*', (req, res) => {
	res.status(404).send('Ruta no encontrada');
});

module.exports = app;