import containerClient from "../config/blobStorage.js";

export async function imageToStorage(nameToImage, fileBuffer) {
  try {
    const blobName = nameToImage;
    const blobClient = containerClient.getBlockBlobClient(blobName);
    await blobClient.uploadData(fileBuffer);

    const imageUrl = `https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net/${containerClient.containerName}/${blobName}`;
    console.log(`File uploaded. Image URL: ${imageUrl}`);
    return `${blobName}.jpg`;
  } catch (err) {
    console.error("Error uploading file to Azure Blob:", err);
    throw err;
  }
}
