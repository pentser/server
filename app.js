import express from "express";
import cors from "cors";
import Joi from "joi";
import fs from "fs/promises";

const app = express();
const PORT= process.env.PORT | 3000;

app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({msg:"Hello"});
})



const schema = Joi.object({
    user: Joi.string().alphanum().min(4).max(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[$]).{5,10}$")).required(),
    confirm: Joi.ref('password')
});



app.post("/validate",(req,res)=>{
    const { error, value } = schema.validate(req.body);
 
    // If validation fails, return an error response
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    // If validation succeeds, return a success response
    WriteUserDataFile(value);
  
    return res.json({ message: 'Data is valid', data: value });
    
});

app.get("/home",(req,res)=>{ 
   res.json(req.body);
})




app.listen(PORT,()=> {
    console.log("start server...")
})


async function WriteUserDataFile(data) {

    try {
        await fs.writeFile("./server/users.txt",JSON.stringify(data));
    }

    catch(err) {
        console.log(err)

    }

}

