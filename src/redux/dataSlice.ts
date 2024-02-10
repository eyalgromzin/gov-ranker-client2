import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Article, EntityAndArticle, Government, Party, PartyAndGovernment, PartyMember, PartyMemberAndGovernment, PartyMemberAndParty } from "../models";

export interface DataState {
  governments: Government[];
  parties: Party[];
  partyMembers: PartyMember[];
  allArticles: Article[];
  currentArticles: Article[];
  entityAndArticles: EntityAndArticle[]
  partyMemberAndParty: PartyMemberAndParty[];
  partyMemberAndGovernment: PartyMemberAndGovernment[];
  partyAndGovernment: PartyAndGovernment[];
  selectedPartyMember: PartyMember | undefined;
  selectedParty: Party | undefined;
  selectedGovernment: Government | undefined;
  recentlyAddedArticles: Article[];
  isLoggedIn: boolean;
  jwtToken: string;
}

const initialState: DataState = {
  governments: [],
  parties: [],
  partyMembers: [],
  allArticles: [],
  currentArticles: [],
  entityAndArticles: [],
  partyAndGovernment: [],
  partyMemberAndParty: [],
  selectedGovernment: undefined,
  selectedParty: undefined,
  selectedPartyMember: undefined,
  recentlyAddedArticles: [],
  partyMemberAndGovernment: [],
  isLoggedIn: false,
  jwtToken: '',
};

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    setGovernments: (state: DataState, action: PayloadAction<Government[]>) => {
      state.governments = action.payload;
    },
    setParties: (state: DataState, action: PayloadAction<Party[]>) => {
      state.parties = action.payload;
    },
    setPartyMembers: (state: DataState, action: PayloadAction<PartyMember[]>) => {
      state.partyMembers = action.payload;
    },
    setArticles: (state: DataState, action: PayloadAction<Article[]>) => {
      state.allArticles = action.payload;
    },
    setCurrentArticles: (state: DataState, action: PayloadAction<Article[]>) => {
      state.currentArticles = action.payload;
    },
    setPartyToGovernment: (state: DataState, action: PayloadAction<{party_uuid: string, government_uuid:string}[]>) => {
      state.partyAndGovernment = action.payload;
    },
    setPartyMemberAndParty: (state: DataState, action: PayloadAction<PartyMemberAndParty[]>) => {
      state.partyMemberAndParty = action.payload;
    },
    setPartyMemberAndGovernment: (state: DataState, action: PayloadAction<PartyMemberAndGovernment[]>) => {
      state.partyMemberAndGovernment = action.payload;
    },
    setSelectedGovernment: (state: DataState, action: PayloadAction<Government | undefined>) => {
      state.selectedGovernment = action.payload;
    },
    setSelectedParty: (state: DataState, action: PayloadAction<Party | undefined>) => {
      state.selectedParty = action.payload;
    },
    setSelectedPartyMember: (state: DataState, action: PayloadAction<PartyMember | undefined>) => {
      state.selectedPartyMember = action.payload;
    },
    addGovernment: (state: DataState, action: PayloadAction<Government>) => {
      state.governments.push(action.payload);
    },
    addParty: (state: DataState, action: PayloadAction<Party>) => {
      state.parties.push(action.payload);
    },
    addArticle: (state: DataState, action: PayloadAction<Article>) => {
      state.allArticles.push(action.payload);
    },
    addPartyMember: (state: DataState, action: PayloadAction<PartyMember>) => {
      state.partyMembers.push(action.payload);
    },
    removeGovernment: (state: DataState, action: PayloadAction<any>) => {
      state.governments = state.governments.filter(governmentI => {
        return governmentI.entity_uuid != action.payload.governmentUUID
      });
    },
    removeParty: (state: DataState, action: PayloadAction<any>) => {
      state.parties = state.parties.filter(partyI => {
        return partyI.entity_uuid != action.payload.partyUUID
      });
    },
    removePartyMember: (state: DataState, action: PayloadAction<any>) => {
      state.partyMembers = state.partyMembers.filter(partyMemberI => {
        return partyMemberI.entity_uuid != action.payload.partyMemberUUID
      });
      let sasd = 4
    },
    removeArticle: (state: DataState, action: PayloadAction<any>) => {
      state.allArticles = state.allArticles.filter(articleI => {
        return articleI.entity_uuid != action.payload
      });
      let s = 4
      s += 1
    },
    setRecentlyAddedArticles: (state: DataState, action: PayloadAction<Article[]>) => {
      state.recentlyAddedArticles = (action.payload);
    },  
    setIsLoggedIn: (state: DataState, action: PayloadAction<boolean>) => {
      state.isLoggedIn = (action.payload);
    },


  }
});

// Action creators are generated for each case reducer function
export const { 
  setGovernments, setParties, setPartyMembers, 
  setArticles, setPartyToGovernment, setPartyMemberAndParty,
  addGovernment, addParty, addPartyMember, removeGovernment,
  removeParty, removePartyMember, addArticle,
  setSelectedGovernment, setSelectedParty, setSelectedPartyMember,
  removeArticle, setRecentlyAddedArticles, setPartyMemberAndGovernment,
  setCurrentArticles, setIsLoggedIn,
} = dataSlice.actions;


export default dataSlice.reducer;
