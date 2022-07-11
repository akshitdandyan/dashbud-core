import axios from "axios";
import { SERVER_URL } from "../Config/envs";
import { RestControllerResponse } from "../types/rest";

export const uploadMedia = async ({
    file,
    instituteId,
    uploaderId,
}: {
    file: File;
    instituteId?: string;
    uploaderId?: string;
}): Promise<RestControllerResponse<{ logoUrl: string }>> => {
    return new Promise(async (resolve) => {
        try {
            const fileReader = new FileReader();
            fileReader.onloadend = async () => {
                const {
                    data,
                }: { data: RestControllerResponse<{ logoUrl: string }> } =
                    await axios.post(`${SERVER_URL}/upload`, {
                        file: fileReader.result,
                        filename: file.name,
                        instituteId,
                        uploaderId,
                    });
                resolve(data);
            };
            fileReader.onerror = (e) => {
                console.log("fileReader.onerror:", e);
                resolve({ error: "Cannot upload this file" });
            };
            fileReader.readAsDataURL(file);
        } catch (error) {
            console.log("error:", error);
            resolve({ error: "Cannot upload this file" });
        }
    });
};
