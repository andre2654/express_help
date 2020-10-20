const express = require("express");

const app = express(); //! inicia o express na variavel app

// ? POR PADRÃO O EXPRESS NÃO ENTENDE REQUISIÇÕES FEITAS EM JSON
app.use(express.json()); // ! Faz o express entender json

// * GET significa que queremos buscar informação
app.get("/projects/find", (req, res) => {
	/**
	 * ? REQ OU REQUEST É A VARIAVEL QUE GUARDA OS PARAMETROS ENVIADOS PELO USUÁRIO
	 * ? RES OU RESPONSE É A VARIAVEL QUE IREMOS RETORNAR PARA O USUÁRIO
	 */
	// * Param query
	const { id } = req.query;
	return res.json([
		"Projeto 1",
		"Projeto 2",
		"Projeto 3",
		"Projeto 4",
		"Projeto 5",
		"Projeto 6",
		"Projeto 7",
		"Projeto 8",
		`Projeto dinamico ${id}`,
	]); // ? retorna apenas um json
}); // ? detecta o caminho para retornar respostas

// * POST significa que queremos inserir informação
app.post("/projects/add", (req, res) => {
	const { qtd } = req.body;
	return res.json({
		add_projects: [
			"Projeto 1",
			"Projeto 2",
			"Projeto 3",
			"Projeto 4",
			"Projeto 5",
			"Projeto 6",
			"Projeto 7",
			"Projeto 8",
			"Projeto 9",
			"Projeto 10",
			`Projeto ${qtd}`,
		],
	});
});

// * PUT significa que queremos alterar informação
app.put("/projects/change/:id", (req, res) => {
	// * Param
	const { id } = req.params;
	return res.json([
		{
			project: {
				from: "Projeto 1",
				to: "Projeto 9999",
			},
		},
		{
			dinamic_project: {
				from: `Projeto ${id}`,
				to: "Projeto 9999",
			},
		},
	]);
});

// * DELETE significa que queremos deletar informação
app.delete("/projects/delete/:id", (req, res) => {
	return res.json({
		project: {
			name: "Projeto 1",
			state: "Excluded",
		},
	});
});

app.listen(3333, () => {
	/**
	 * * Função chamada quando o servidor inicia
	 */
	console.log("✔ Back-end started! ✔");
}); // ! porta que vai escutar
