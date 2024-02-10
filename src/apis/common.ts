import { useDispatch } from 'react-redux';
import {setPartyMemberAndGovernment, setPartyMemberAndParty, setPartyToGovernment} from '../redux/dataSlice'

export const getAllPartyToGovernment = (dispatch: Function) => {
    fetch('http://127.0.0.1:3000/common/getAllPartyToGovernment').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setPartyToGovernment(res.data))
        }
    )
}

export const getAllPartyMembersToParty = (dispatch: Function) => {
    fetch('http://127.0.0.1:3000/common/getAllPartyMemberToParty').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setPartyMemberAndParty(res.data))
        }
    )
}

export const getAllPartyMembersToGovernment = (dispatch: Function) => {
    fetch('http://127.0.0.1:3000/common/getAllPartyMemberToGovernment').then(
        res => res.json()
    ).then(
        res => {
            dispatch(setPartyMemberAndGovernment(res.data))
        }
    )
}

export const addEntity = async (path: string, data: any) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify(data),
      };

    const res = await (await fetch(`http://127.0.0.1:3000/${path}`, requestOptions)).text()

    return res
}

