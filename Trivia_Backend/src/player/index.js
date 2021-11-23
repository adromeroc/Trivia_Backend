const Player = require("../models/players")
const express = require("express")
const router = new express.Router()

router.post("/players/register",async(req,res)=>{
    try{ const request = req.body
        const player = await Player.create({
            name : request.name,
            password : request.password
    
        }).catch(error =>{
    console.log(error)
    throw new Error("EXISTING USER")
        })
        
        await player.hashpassword(request.password)
        await player.save()
         const token = player.generatetoken() 
        res.status(200).send({data:{token}, status:true, message: "registro exitoso"})
    }catch(error){
      console.log(error)  
        res.status(200).send({data:{error: error.toString()}, status:false, message: "error"})
    }
   
   })
   router.post("/players/login",async(req,res)=>{
    try{ const request = req.body
        const player = await Player.findOne({
            name : request.name,
    
        }).catch(error =>{
            console.log(error)
            throw new Error("USER NOT FOUND")
                })
        if(player==null){
            throw new Error("NO SE ENCONTRO EL USUARIO")
        }
    const match = await player.verifypassword(request.password)
    if(match==false){
        throw new Error("CONTRASEÑA INCORRECTA")

    }
    const token = player.generatetoken() 
    res.status(200).send({data:{token}, status:true, message: "registro exitoso"})
}catch (error) {
        console.log("Error",error)
        res.status(200).send({data: {error:error.toString()}, status: false, message: "¡Errorrrrr!!"})
    }
   })
   module.exports = router 
