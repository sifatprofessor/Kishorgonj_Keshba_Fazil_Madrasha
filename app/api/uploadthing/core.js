import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "5MB" } })

        .onUploadComplete(async ({ }) => {

            return { message: 'Image Upload Complete' };
        }),
    pdfUploader: f({ pdf: { maxFileSize: "3MB" } })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .onUploadComplete(async ({ file }) => {

            return { message: 'Pdf Upload Complete' };
        }),
    videoUploader: f({ video: { maxFileSize: "5MB" } })

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .onUploadComplete(async ({ file }) => {

            return { message: 'Video Upload Complete' };
        }),
};
