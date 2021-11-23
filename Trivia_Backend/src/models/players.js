const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jws = require("jsonwebtoken")


const playerSchema = new mongoose.Schema({
    name:{ //crear usuario 
        // reglas que tiene que tener nombre
        type: String, //tipo de variable
        required:true,//obligatorio ingresar este campo true:si es obligatorio false:no es obligatorio
        trim:true,//eliminar los espacios antes o despues del campo requerido true:si  false:no
        unique:true,//para que sea unico el usuario true:si  false:no
        lowercase:true//nombre de usuario siempre este con minuscula true:si  false:no
    },
    password:{// crear clave
        // reglas que tiene que tener clave
        type: String, //tipo de variable
        required:true,//obligatorio ingresar este campo true:si es obligatorio false:no es obligatorio
        minlength: 8, // minimo de carcacteres para la clave 
        trim:true,//eliminar los espacios antes o despues del campo requerido true:si  false:no
        validate(value){
            if(value == "12345678"){
                throw new Error("La Contraseña No Puede Ser 12345678") // te lanza a la consola error
            }
        }
        
    },
 tokens:[
     {token:{
         type: String,
         required:true

     }}
 ],
 score:{
     type: Number,
     default: 0
      
 }

})

playerSchema.methods.hashpassword= async function(){ //hasseo de la clave, encripta la contraseña //async: avisa que se va a demorar es asincrono await: espera }
    this.password = await bcrypt.hash(this.password,5)
}
playerSchema.methods.verifypassword = async function(password){// verificar si la contraseña es igual a el password encriptdao
const isEqual= await bcrypt.compare(password,this.password)
return isEqual
}
playerSchema.methods.generatetoken = function(){ // funcion jws.sing generar un token
    const token = jws.sign({_id:this.name.toString()},process.env.AUTH_PASSWORD)
    this.tokens = [...this.tokens,{token}]// se agrege este token nuevo
    this.save()
    return token
}

const Player = mongoose.model("Player",playerSchema)
module.exports = Player