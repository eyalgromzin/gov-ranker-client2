import { APIResult } from "../models";
import { addParty, removeParty, setParties } from "../redux/dataSlice";

export const getAllParties = (dispatch: any) => {
    fetch("http://127.0.0.1:3000/party/getAllParties")
        .then((res) => res.json())
        .then((res) => {
            dispatch(setParties(res.data));
        });
};

export const createParty = async (
    dispatch: Function,
    name: string,
    imageUrl: string,
    description: string,
    parentUUID: string
): Promise<APIResult> => {
    const customHeaders = {
        "Content-Type": "application/json",
    };

    const fullUrl = `http://127.0.0.1:3000/party/createParty`;
    try {
        const data = { name, imageUrl, description, govUUID: parentUUID };

        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            console.log(await res.json());
        }

        const resData = await res.json();
        dispatch(addParty(resData.res));

        return {
            data: resData.res,
            error: undefined,
        };
    } catch (error) {
        return {
            data: undefined,
            error: error + "",
        };
    }
};

export const deleteParty = async (
    dispatch: Function,
    partyUUID: string
): Promise<APIResult> => {
const customHeaders = {
        "Content-Type": "application/json",
    };

    const fullUrl = `http://127.0.0.1:3000/party/deleteParty`;
    try {
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify({ partyUUID }),
        });
        if (!res.ok) {
            console.log(await res.json());
        }

        const resData = await res.json();

        dispatch(removeParty(resData.res));

        return resData.res;
    } catch (error) {
        return {
            data: undefined,
            error: error + "",
        };
    }
};
