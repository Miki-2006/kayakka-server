import { getAllEvents } from "../models/eventModels.js"

export const getEvents = async (req, res) => {
    try{
        const events = await getAllEvents()
        res.status(200).json(events)
    }catch(err){
        res.status(500).json({ message: "Ошибка сервера", err });
        
    }
}
