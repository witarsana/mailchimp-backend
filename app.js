const express = require('express');
const cors = require('cors');
const app = express();
const { default: axios } = require('axios');
//change this
const mailchimpCredential = "40fc6ea3fead978e77dc3191c48027fc-us5"
//and this
const listId = "3fedf02f26"
const serverPrefix = mailchimpCredential.split("-")[1];
const key = mailchimpCredential.split("-")[0];

app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.json("hello world");
})

app.post("/new",async (req,res)=>{
    console.log("hello");
    const email = req.body["email"];
    const name = req.body["name"];
    const language = req.body["language"]
    console.log("name",language)
    try {
        const result = await axios({
            method : 'POST',
            url : `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`,
            headers : {
                'Authorization' : `Bearer ${key}`
            },
            data : {
                email_address: `${email}`,
                status: "subscribed",
                merge_fields: {
                    FNAME: `${name}`,
                    LNAME: ""
                },
                language : `${language}`
            }
        });
        console.log("new");
        res.json(result.data);
    } catch (error) {
        res.json(error);
        console.log(error);
    }

    

    
})

app.listen("8080",()=>{
    console.log("server run")
})