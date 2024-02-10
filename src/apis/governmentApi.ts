import { useDispatch } from 'react-redux';
import {addGovernment, setGovernments, removeGovernment} from '../redux/dataSlice'
import { APIResult } from '../models';

export const getAllGovernments = (dispatch: any) => {
    fetch('http://127.0.0.1:3000/government/getAllGovernments').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setGovernments(res.data))
        }
    )
}

export const createGovernment = async (dispatch: Function, name: string, imageUrl: string, description: string):Promise<APIResult> => {
    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    const data = {name, imageUrl, description}

    const fullUrl = `http://127.0.0.1:3000/government/createGovernment`
    try{
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        })
        if (!res.ok){
            console.log(await res.json())
        }
    
        const resData = await res.json();
        dispatch(addGovernment(resData.res))

        return resData.res
    }catch(error){
        return {
            data: undefined,
            error: error + ''
        }
    }
}

export const deleteGovernment = async (dispatch: Function, governmentUUID: string):Promise<APIResult> => {
    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    const fullUrl = `http://127.0.0.1:3000/government/deleteGovernment`
    try{
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify({governmentUUID}),
        })
        if (!res.ok){
            console.log(await res.json())
        }
    
        const resData = await res.json();

        dispatch(removeGovernment(resData.res))

        return resData.res
    }catch(error){
        return {
            data: undefined,
            error: error + ''
        }
    }
}



