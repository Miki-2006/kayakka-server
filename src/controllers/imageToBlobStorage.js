import containerClient from "../config/blobStorage.js";
import fs from 'fs'

export async function imageToStorage(nameToImage, filePath) {
    try {
        const blobName = nameToImage;
        const blobClient = containerClient.getBlobClient(blobName);
        const fileStream = fs.createReadStream(filePath);
        await blobClient.uploadStream(fileStream);

        const imageUrl = `https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net/${containerClient.containerName}/${blobName}`;
        console.log(`File uploaded. Image URL: ${imageUrl}`);
        return nameToImage;
    } catch (err) {
        console.error('Error uploading file to Azure Blob:', err);
        throw err;
    }
}