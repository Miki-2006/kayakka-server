import multer from 'multer'

const storage = multer.memoryStorage(); // Храним файл в памяти (или укажи путь)
const upload = multer({ storage });

export default upload;
