import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.CONTAINER_NAME_FROM_BLOB_STORAGE;

if (!connectionString || !containerName) {
  throw new Error("Connection string or container name is missing");
}

// Инициализация клиента
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

export default containerClient;
