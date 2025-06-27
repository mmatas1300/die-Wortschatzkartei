import { getUserConfig } from "@/app/api/_services/userService";
import { decrypt } from "@/libs/crypto";

export const getWordByQuery = async (userId, query) => {
    const URL = `https://api.pons.com/v1/dictionary?q=${query}&l=deen&in=de&language=en`;
    const userConfig = await getUserConfig(userId);
    const ponsKey = decrypt(userConfig.ponsSecret, process.env.CRYPTO_KEY);
    const resp = await fetch(URL,
        {
            headers: {
                "X-Secret": ponsKey,
            }
        }
    )
    return ponsAdapter(await resp.json());
};