const express = require("express");
const { v4, validate } = require("uuid");

const app = express();
app.use(express.json());

// ! VARIAVEL projects
const projects = [];

/**
 * * MIDDLEAWARE:
 * * é um interceptador de requisições que interrompe totalmente a requisição
 * * ou altera dados da requisição
 */

function logRequest(req, res, next) {
	const { method, url } = req;
	const logLabel = `[${method.toUpperCase()}] ${url}`;
	console.log(logLabel);

	return next(); // invoca o proximo middleware
}

app.use(logRequest); // * Utiliza o middleware em todas as rotas

// middleware para a validação de id
function validId(req, res, next) {
	const { id } = req.params;

	if (!validate(id)) {
		return res.status(404).json({ error: "Project Id isn't valid" });
	} else {
		console.log("Projet ID is valid :)");
	}

	return next();
}

app.use("/projects/change/:id", validId); // * Utiliza o middleware na rota /projects/change/:id

app.get("/projects/find", (req, res) => {
	const { name } = req.body;
	const results = name
		? projects.filter((project) => project.name.includes(name))
		: projects;
	return res.json(results);
});

app.post("/projects/add", (req, res) => {
	const { name } = req.body;
	const project = {
		id: v4(),
		name: name,
	};
	projects.push(project);
	return res.json(project);
});

app.put("/projects/change/:id", validId, (req, res) => {
	const { id } = req.params;
	const { name } = req.body;
	const projectIndex = projects.findIndex((project) => project.id == id);

	if (projectIndex < 0) {
		return res.status(400).json({ error: "Project not found" });
	}

	const project = {
		id,
		name,
	};

	projects[projectIndex] = project;

	return res.json(project);
});

app.delete("/projects/delete/:id", validId, (req, res) => {
	const { id } = req.params;
	const projectIndex = projects.findIndex((project) => project.id == id);

	if (projectIndex < 0) {
		return res.status(400).json({ error: "Project not found" });
	}

	projects.splice(projectIndex, 1);

	return res.status(204).json({ message: "Project deleted" });
});

app.listen(3333, () => {
	console.log("✔ Back-end started! ✔");
});
