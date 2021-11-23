
const express = require ("express")
const router = new express.Router()
const verifyToken = require("../middleware/auth")
const {getSingleTriviaQuestions,verifyAnswer,updatePlayerScore} = require ("./utils")
router.get("/questions/single",verifyToken,async (req,res)=>{
    try{
        const question = await getSingleTriviaQuestions()
    res.status(200).send({data:{question}, status:true, message: "consulta exitosa"})
    }catch(error){
        console.log(error)  
        res.status(200).send({data:{error: error.toString()}, status:false, message: "error"})
    }
   })
router.post("/questions/response",verifyToken,async(req,res)=>{
 try{const request = req.body
  const winner = await verifyAnswer(request.question,request.answer)
  const score = await updatePlayerScore(req.headers["user"],winner)
  res.status(200).send({data:{score},status: true, message: "ACTUALIZACIÓN CORRECTA"})
}catch(error){
    console.log(error)  
        res.status(200).send({data:{error: error.toString()}, status:false, message: "error"})
}

})





module.exports = router 