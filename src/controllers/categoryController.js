import {getAllCategories} from '../models/categoryModels.js'

export const getCategories = async (req, res) => {
    try{
        const categories = await getAllCategories()
        res.status(200).json(categories)
    }catch(err){
        console.error("Ошибка при обработке запроса:", err);
        res.status(500).json({ message: "Ошибка сервера", err });
    }
}