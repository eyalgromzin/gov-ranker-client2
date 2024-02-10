import { Fragment, FunctionComponent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { PartyMember } from "../models";
import { EntityChooser } from "./EntityChooser";
// import { ToastContainer, toast } from "react-toastify";
import ArticlesList from "./articlesList";
import RecentlyAdded from "./recentlyAdded";
import Summary from "./imageAndTextSummary";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getAndShowPartyArticles } from "../apis/articleAPi";

type HomeProps = {};

export const Main: React.FC<HomeProps> = ({}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isGettingArticles = useRef(false)

    let selectedEntity: PartyMember | undefined = undefined;

    

    const RecentlyAddedArticles = useSelector(
        (state: RootState) => state.data1.recentlyAddedArticles
    );

    const allPartyMembers = useSelector(
        (state: RootState) => state.data1.partyMembers
    );
    const allParties = useSelector((state: RootState) => {
        return state.data1.parties;
    });
    const allGovernments = useSelector((state: RootState) => {
        return state.data1.governments;
    });

    const { governmentUUID, partyUUID, partyMemberUUID } = useParams(); //url params

    const selectedGovernment = allGovernments.find(
        (governmentI) => governmentI.entity_uuid == governmentUUID
    );

    const selectedParty = allParties.find((partyI) => partyI.entity_uuid == partyUUID);

    const selectedPartyMember = allPartyMembers.find(
        (partyMemberI) => partyMemberI.entity_uuid == partyMemberUUID
    );

    if (selectedGovernment) selectedEntity = selectedGovernment;
    if (selectedParty) selectedEntity = selectedParty;
    if (selectedPartyMember) selectedEntity = selectedPartyMember;

    if(selectedParty && !isGettingArticles.current){
        console.log('getting articles')
        getAndShowPartyArticles(dispatch, selectedParty.entity_uuid, () => {});    
        isGettingArticles.current = true
    }

    return (
        <div style={{ position: "relative" }}>
            <div style={{ height: "40px", position: "relative" }}>
                <img
                    src="https://cdn.icon-icons.com/icons2/1674/PNG/512/arrowiosback_111116.png"
                    style={{
                        height: "40px",
                        left: "25px",
                        position: "absolute",
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate("/")}
                />
            </div>
            {!partyMemberUUID &&
                RecentlyAddedArticles &&
                RecentlyAddedArticles.length > 0 && (
                    <RecentlyAdded articles={RecentlyAddedArticles} />
                )}

            <div style={{ marginTop: "70px" }}>
                <EntityChooser
                    isShowEditButtons={false}
                    // selectedGovernment={selectedGovernment}
                    // selectedParty={selectedParty}
                    // selectedPartyMember={selectedPartyMember}
                />
            </div>
            <div>
                {(partyUUID || partyUUID || governmentUUID) && (
                    <Summary
                        name={selectedEntity?.name}
                        imageUrl={selectedEntity?.image_url}
                        description={selectedEntity?.description}
                    />
                )}
            </div>
            <div style={{ height: "50px" }} />
            <ArticlesList isEditable={false} />
        </div>
    );
};
