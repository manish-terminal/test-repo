import "dotenv/config";
import express from "express";
const app = express();

const PORT = process.env.PORT || 3000; //if we deploy it will crash

app.use(express.json()); //any data which comes in json format we accept that
let teaData = [];
let nextId = 1;

//accepting a data

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(teaData);
});
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});
//update tea
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  } else {
    return res.status(200).send(tea);
  }
});
//for urls we use params

//updation
app.put("/teas/:id", (req, res) => {
  const teaId = req.params.id;
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  } else {
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.send(tea);
  }
});

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index == -1) {
    return res.status(404).send("Tea not found");
  } else {
    teaData.splice(index, 1); //teaData.splice(index, 1) removes the item at the found index from the teaData array. The splice method modifies the array in place, removing 1 element at the specified index.
    return res.status(204).send("deleted");
  }
});
//findIndex returns -1 if not found
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
