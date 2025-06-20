import { google } from 'googleapis';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const KEYFILEPATH = './credentials.json'; // Letakkan credentials di sini

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

export async function uploadToDrive(filePath, fileName, folderId = null) {
  const drive = google.drive({ version: 'v3', auth: await auth.getClient() });
  const fileMetadata = {
    name: fileName,
    ...(folderId && { parents: [folderId] }),
  };
  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id, webViewLink, webContentLink',
  });

  return response.data;
}