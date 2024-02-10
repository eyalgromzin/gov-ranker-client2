import { APIResult, PartyMember } from "../models";
import { addPartyMember, setPartyMembers, removeGovernment, removePartyMember } from "../redux/dataSlice";

export const getAllPartyMembers = (dispatch: any) => {
    fetch("http://127.0.0.1:3000/partyMember/getAllPartyMembers")
        .then((res) => res.json())
        .then((res) => {
            dispatch(setPartyMembers(res.data));
        });
};

export const createPartyMember = async (
    dispatch: Function,
    name: string,
    imageUrl: string,
    description: string,
    parentUUID: string
): Promise<APIResult> => {
    try{
        const customHeaders = {
            "Content-Type": "application/json",
        };
    
        const data = {name: name, imageUrl:imageUrl, description:description, partyUUID:parentUUID, uuid: ''}
    
        const fullUrl = `http://127.0.0.1:3000/partyMember/createPartyMember`;
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            return {
                data: undefined,
                error: 'failed to createPartyMember',
            };
        }
    
        const addedPartyMember = await res.json()
        data.uuid = addedPartyMember.res.newPartyMemberUUID
    
        const partyMemberToAdd:PartyMember = {
            entity_uuid: addedPartyMember.res.newPartyMemberUUID,
            name: addedPartyMember.res.name,
            description: addedPartyMember.res.description,
            image_url: addedPartyMember.res.imageUrl
        } 
        dispatch(addPartyMember(partyMemberToAdd));
    
        return {
            data: partyMemberToAdd,
            error: undefined,
        };
    }catch(e){
        return {
            data: undefined,
            error: e + '',
        };
    }
};


export const deletePartyMember = async (dispatch: Function, partyMemberUUID: string):Promise<APIResult> => {
    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    const fullUrl = `http://127.0.0.1:3000/government/deletePartyMember`
    try{
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify({partyMemberUUID}),
        })
        if (!res.ok){
            console.log(await res.json())
        }
    
        const resData = await res.json();

        dispatch(removePartyMember(resData.res))

        return resData.res
    }catch(error){
        return {
            data: undefined,
            error: error + ''
        }
    }
}