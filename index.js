import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hey there...");
});
app.use(express.json());

let teaData = [];
let nextId = 1;

//Adding the the data
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newData = { id: nextId++, name, price };
  teaData.push(newData);
  res.status(201).send(newData);
});

//List al the id
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//This is for the showing the tea using id.
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//Update the data for the tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  let { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//Delete the data for the tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  res.status(200).send("Deleted..");
});

app.get("/tea", (req, res) => {
  res.send("Would you prefer a lemon tea?");
});

app.get("/cofee", (req, res) => {
  res.send("What type of cofee would you prefer?");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}..`);
});
