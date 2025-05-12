const express = require("express")
const { v4: uuidv4 } = require('uuid')
const router = express.Router();
   /** @type {import('mongoose').Model} */
const Todo = require('../models/todoModel')


router.get('/', async (req,res) => {
    const todoList = await Todo.find().select("todo completed")
    res.status(200).json(todoList)
}); 


router.post('/',async (req,res,next) => {
    try {
        const { todo } = req.body;
    // if(!("todo" in req.body)){
    //     const error = {
    //         status:400,
    //         fields:{
    //             body:req.body,
    //             required:"todo",
    //         }}
    //    return next(error)};

    // const newTodo = new  Todo(req.body);
    // await newTodo.save();
    
       await Todo.create(req.body);
       const newTodo = await Todo.find().select("todo completed") 
        res.json(newTodo);

    } catch (error) {
        res.status(400).json({
            message:error.message,
        })
    }
});

router.patch('/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;
        const todoItem = await Todo.findById(id);

        if (!todoItem) {
            return res.status(404).json({ message: "Todo not found" });
        }

        todoItem.completed = !todoItem.completed;
        await todoItem.save();

        const todoList = await Todo.find().select("todo completed");
        res.json(todoList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.put('/',async (req,res)=> {
   try {
    const { _id, todo, completed}=  req.body;
    const fieldsToUpdate={
        todo,
        completed
    }
    await Todo.findByIdAndUpdate(_id, fieldsToUpdate,{
        new:true
    });
    
    const updatedData= await Todo.find().select("todo completed");

    if (updatedData) return res.json(updatedData);
    
    res.status(404).json({
        message:`Item with id:${_id}Does Not Exist`
    });
   } catch (error) {
        console.log(error.message );  
   }
});


router.delete("/",async(req,res)=>{
    try {
        const { _id } =req.body;
        await Todo.findByIdAndDelete(_id)
         const deletedField = await Todo.find().select("todo completed");
        if(deletedField){
            return  res.json(deletedField)
        }
        res.status(404).json({ message: "Item does not exist"})
    
    } catch (error) {
       res.status(404).json({message: error.message })
    }
});


module.exports = router;