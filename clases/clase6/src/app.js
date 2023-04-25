const express = require("express");
//import express from "express";

const app = express();
const port = 3000;
let usuarios = [
    {id: 0, nomnbre: "Gaston", dni: 123456},
    {id: 1, nomnbre: "Federico", dni: 321456},

]

app.listen(port,()=>{
    console.log(`Exaple app listening on port: ${port}`);
})

app.get("/", (req,res)=>{
    res.send("Hello World")
});

app.get("/usuarios",(req,res)=>{
    res.json(usuarios)
})
app.get("/usuarios/:id",(req,res)=>{
    const IdDelUser = req.params.id;
    res.send(IdDelUser);
})