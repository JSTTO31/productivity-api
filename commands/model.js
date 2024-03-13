const fs = require('fs')
const name = process.argv.find(item => item.match(/Model$/)).replace('Model', '') 

if(!name){
    throw new Error('You forgot the name of the model!')
}

const filename_model = name.toLocaleLowerCase() + '.model.js'
const filename_controller = name.toLocaleLowerCase() + '.controller.js'

if(fs.existsSync('./models/' + filename_model) || fs.existsSync('./controllers/' + filename_controller)){
    throw new Error("The specified models or controllers name is already exists!")
}else{
///////////////////////////////// MODEL ////////////////////////////////////////

    let content = `const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ${name}Schema = new Schema({
    _id: Schema.Types.ObjectId,
})

module.exports = mongoose.model('${name}',${name}Schema)
    `;
    fs.writeFileSync('./models/' + filename_model, content)
///////////////////////////////// CONTROLLER ////////////////////////////////////////
    content = `const ${name}Model = require('../models/${name.toLocaleLowerCase()}.model.js')
const router = require('express').Router()

router.get('', async (req, res) => {
    try {
        const ${name.toLocaleLowerCase()}s = await ${name}Model.find()
        
        res.status(200).send({${name.toLocaleLowerCase()}s})
        
    } catch (error) {
        res.status(500).send({error})
    }
})

router.get('/:${name.toLocaleLowerCase()}Id', async (req, res) => {
    try {
        const ${name.toLocaleLowerCase()} = await ${name}Model.findOne({_id: req.params.${name.toLocaleLowerCase()}Id})
        
        res.status(200).send({${name.toLocaleLowerCase()}})
    } catch (error) {
        res.status(500).send({error})
    }
})

router.post('', async (req, res) => {
    try {
        
        res.send(null)
    } catch (error) {
        res.status(500).send({error})
    }
})


router.put('/:${name.toLocaleLowerCase()}Id', async (req, res) => {
    try {
   
        res.send(null)
    } catch (error) {
        res.status(500).send({error})
    }
})

router.delete('/:${name.toLocaleLowerCase()}Id', async (req, res) => {
    try {
        ${name}Model.deleteOne({_id: req.params.${name.toLocaleLowerCase()}Id})

        res.send(null)
    } catch (error) {
        res.status(500).send({error})
    }
})


module.exports = router`;


    fs.writeFileSync('./controllers/' + filename_controller, content)
}



