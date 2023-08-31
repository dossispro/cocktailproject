import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

let drinkInfo = []

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/alcohol_type", async (req, res) => {
    try { 
        let alcohol_type = req.body.alcohol;
        const result = await axios.get(`${API_URL}filter.php?i=${alcohol_type}`);
        console.log(result.data.drinks);
        console.log(drinkInfo.data);
        res.render("index.ejs", { content: result.data });
    } catch (error) {
        console.log(error);
    }
}); 

app.get('/drink/:idDrink', async (req, res) => {
    const drinkID = req.params.idDrink;
    const result = await axios.get(`${API_URL}lookup.php?i=${drinkID}`)
    res.render("drink.ejs", { content: result.data.drinks[0] })
  })



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
