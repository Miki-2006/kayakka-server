import containerClient from "../config/blobStorage.js";

export async function imageToStorage(nameToImage, fileBuffer) {
  try {
    const blobName = nameToImage
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9_-]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");
    const blobClient = containerClient.getBlockBlobClient(blobName);
    await blobClient.uploadData(fileBuffer);

    const imageUrl = `https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net/${containerClient.containerName}/${blobName}`;
    console.log(`File uploaded. Image URL: ${imageUrl}`);
    return blobName;
  } catch (err) {
    console.error("Error uploading file to Azure Blob:", err);
    throw err;
  }
}
