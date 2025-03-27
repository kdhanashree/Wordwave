import express from 'express'
const app = express();
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin:['https://word-wave-frontend.vercel.app','http://localhost:5173'],
    credentials:true,
}));

app.get("/",(req,res)=>{
    res.send(`Server is Working`);
});
app.post("/translate",async(req,res)=>{
    //console.log(`Request came to backend!!`);
    let {sourceLang , targetLang , text} = req.body;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${sourceLang}|${targetLang}`;
    const response = await fetch(url);
    const json = await response.json();
    //console.log(`The  response is: ${JSON.stringify(json)}`);
// json.matches:
// In the context of the MyMemory Translated API, the matches property is typically an array of translation results or matches related to the query you sent. Each "match" corresponds to a potential translation or segment returned by the API.
    const matches = await json.matches;
    const translatedText = matches[matches.length - 1].translation || 'No translation found';
    console.log(`The response sent to frontend is:${translatedText}`);
    res.send({translatedText});
});

app.listen(port,(req,res)=>{
    console.log(`Server listening on port :${port}`);
});

