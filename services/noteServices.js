const noteModel= require('../models/note');

class noteServices{
async savedNote(){
    return newNote.save();
}

async updatedNote(req, newNote){ 
    return noteModel.findByIdAndUpdate(req.params.id, newNote, {new:true} );
}

async deletedNote(req){ 
    return noteModel.findByIdAndRemove(req.params.id);
}

async getedNote(req){ 
    return noteModel.find({userId: req.userId});
}
}

module.exports=  new noteServices();