import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { EntityChooser } from "./EntityChooser";
import ArticleCreation from "./createEditArticle";
// import { ToastContainer, toast } from "react-toastify";
import ArticlesList from "./articlesList";
import { useSelector } from "react-redux";
import LoginForm from "./loginForm";
import Summary from "./imageAndTextSummary";
import { useParams } from "react-router-dom";
import CrawlerButton from "./runCrawler";

type GovernmentsProps = {};

interface Option {
    value: string;
    label: string;
}

export const AdminMain: React.FC<GovernmentsProps> = ({}) => {
    const isLoggedIn = useSelector(
        (state: RootState) => state.data1.isLoggedIn
    );
    const allPartyMembers = useSelector(
        (state: RootState) => state.data1.partyMembers
    );
    const allGovernments = useSelector(
        (state: RootState) => state.data1.governments
    );
    const allParties = useSelector((state: RootState) => state.data1.parties);

    const { governmentUUID, partyUUID, partyMemberUUID } = useParams(); //url params

    const selectedPartyMember = allPartyMembers.find(
        (partyMemberI) => partyMemberI.entity_uuid == partyMemberUUID
    );
    
    const selectedGovernment = allGovernments.find(
        (governmentI) => governmentI.entity_uuid == governmentUUID
    );

    const selectedParty = allParties.find(
        (partyI) => partyI.entity_uuid == partyUUID
    );

    const notify = (str: string) => {
        // toast("created", {
        //     duration: 1000,
        //     position: "top-center",
        // });
    };

    if (isLoggedIn) {
        return (
            <div>
                <CrawlerButton url={""} />
                <EntityChooser isShowEditButtons={true} />
                {selectedPartyMember && selectedParty && selectedGovernment && (
                    <ArticleCreation notify={notify} article={undefined} />
                )}
                {selectedPartyMember && (
                    <React.Fragment>
                        <Summary
                            name={selectedPartyMember?.name}
                            imageUrl={selectedPartyMember?.image_url}
                            description={selectedPartyMember?.description}
                        />
                        <ArticlesList isEditable={true} />
                        
                    </React.Fragment>
                )}
                {/* <Toaster
                    toastOptions={{
                        className: "",
                        style: {
                            padding: "16px",
                            color: "white",
                            backgroundColor: "green",
                        },
                    }}
                /> */}
            </div>
        );
    } else {
        return <LoginForm />;
    }
};
