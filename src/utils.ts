import { Party, PartyAndGovernment, PartyMember, PartyMemberAndParty } from "./models";


export const getGovernmentParties = (govUUID: string, PartyAndGovernments: PartyAndGovernment[], allParties: Party[]):Party[] => {
    const partiesUUIDs: string[] = []

    PartyAndGovernments.forEach(PartyAndGovernmentI => {
        if(PartyAndGovernmentI.government_uuid == govUUID){
            partiesUUIDs.push(PartyAndGovernmentI.party_uuid)
        }
    })

    const resParties: Party[] = partiesUUIDs.map(partyUUID => {
        return allParties.filter(partyI => partyI.entity_uuid == partyUUID)[0]
    })

    return resParties
}

export const getPartyMembers = (partyUUID: string, partyMembersAndParty: PartyMemberAndParty[], allPartyMembers: PartyMember[]):PartyMember[] => {
    
    if (!allPartyMembers){
        return []
    }

    const partyMemberUUIDs: string[] = []
    partyMembersAndParty.forEach(partyMemberAndPartyI => {
        if(partyMemberAndPartyI.party_uuid == partyUUID){
            partyMemberUUIDs.push(partyMemberAndPartyI.party_member_uuid)
        }
    })

    const resPartyMembers = partyMemberUUIDs.map(partyMemberUUID => {
        return allPartyMembers.filter(partyMemberI => partyMemberI.entity_uuid == partyMemberUUID)[0]
    })

    return resPartyMembers
}