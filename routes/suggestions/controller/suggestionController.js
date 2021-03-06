const Suggestion = require("../model/Suggestion");

async function getAllSuggestions (req, res) {
    try {
        let getAllSuggest = await Suggestion.find({})
        res.json({ message: "success", data: getAllSuggest })
    } catch (e) {
        res.status(500).json({ message: "failure", error: e.message })
    }
}

async function getSingleSuggestion (req, res) {
    try {
        let findOne = await Suggestion.findById(req.params.id)
        res.json({message:"success", findOne}) 
    } catch (error) {
        res.status(500).json({message:"error", error:error.message})
    }
};

async function createSuggestion(req, res){
    const {title, likes, anonymous, suggestion, author} = req.body
    
    let errorObj = {}
    
        if(Object.keys(errorObj).length > 0){
            return res.status(500).json({message:"error", payload: errorObj})
        }
        
        try {
            let createNewSuggest = new Suggestion ({
                title, 
                author, 
                suggestion, 
                likes,
                anonymous,
                timeCreated:Date.now()
            })

            let save = await createNewSuggest.save()
            res.json({message:"Success", save})
        } catch (error) {
            res.status(500).json({message:"error", error: error.message})
        }
}

async function updateSuggestion(req,res){
    let errorObj = {};

    if(Object.keys(errorObj).length > 0){
        return res.status(500).json({message:"error", payload: errorObj})
    }

    try {
        let title = req.body.title;

        let suggestion = req.body.suggestion;

        let update = await Suggestion.findByIdAndUpdate(req.params.id, {$set: { title: title, suggestion: suggestion}}, {new:true})

        res.json({message: 'success', payload: update})
    } catch {
        res.status(500).json({message:'error'})
    }
};

async function deleteSuggestion (req, res) {
    try {
        console.log('path hit')
        let delSuggestion = await Suggestion.findByIdAndRemove(req.params.id)
        res.json({message:"success", delSuggestion})
    } catch (error) {
        res.status(500).json({message:'error', error:error.message})
    }
};



module.exports = {
getAllSuggestions,
getSingleSuggestion, 
createSuggestion,
updateSuggestion,
deleteSuggestion, 
}