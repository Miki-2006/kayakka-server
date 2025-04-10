import {BlobServiceClient, StorageSharedKeyCredential} from '@azure/storage-blob'

const accountName = process.env.AZURE_BLOB_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_BLOB_STORAGE_ACCESS_KEY;
const containerName = process.env.CONTAINER_NAME_FROM_BLOB_STORAGE; 

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey)
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential)

const containerClient = blobServiceClient.getContainerClient(containerName);

export default containerClient;