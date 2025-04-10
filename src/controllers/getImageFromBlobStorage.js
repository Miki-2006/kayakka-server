import containerClient from "../config/blobStorage.js";

export const getImage = async (req, res) => {
  try {
    const { filename } = req.params;

    const blobClient = containerClient.getBlobClient(filename);

    // Проверка: существует ли файл
    const exists = await blobClient.exists();
    if (!exists) return res.status(406).send("Image not found");

    // Получаем поток blob
    const downloadBlockBlobResponse = await blobClient.download();
    res.setHeader("Content-Type", "image/jpeg"); // или определяй по mime
    downloadBlockBlobResponse.readableStreamBody.pipe(res);
  } catch (error) {
    console.error("Error:", err.message);
    res.status(500).send("Server error");
  }
};
