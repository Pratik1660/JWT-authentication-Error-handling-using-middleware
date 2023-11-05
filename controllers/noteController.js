const noteModel= require("../models/note");

const noteServices= require("../services/noteServices");

//create note
const createNote= async (req,res)=>{
    const {title, description}= req.body;

    const newNote= new noteModel({
        title: title,
        description: description,
        userId: req.userId
    });

    try{
        await noteServices.savedNote(); //1
        res.status(201).json(newNote)
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
    }

}


//update note
const updateNote= async (req,res)=>{
    // const id= req.params.id;
    const {title, description}= req.body;

    const newNote= {
        title: title,
        description: description,
        userId: req.userId
    }
    
    try{
        await noteServices.updatedNote(req, newNote); //2
        res.status(200).json(newNote);
    }
    catch{
        console.log(error);
        res.staus(500).json({message:"Something went wrong"})
    } 
}


//delete note
const deleteNote= async(req,res)=>{
    // const id= req.params.id;

    try{
        const note= await noteServices.deletedNote(req); //3
        res.status(202).json(note);
    }
    catch(error){
        console.log(error);
        res.staus(500).json({message:"Something went wrong"})
    }
}


//get notes
const getNotes= async(req,res)=>{
    try{
        const notes= await noteServices.getedNote(req); //4
        res.status(200).json(notes);
    }
    catch(error){
        console.log(error);
        res.staus(500).json({message:"Something went wrong"})
    }
}

module.exports= {createNote, updateNote, deleteNote, getNotes}