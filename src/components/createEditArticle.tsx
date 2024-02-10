import React, { CSSProperties, useState } from "react";
import { createArticle, updateArticle } from "../apis/articleAPi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Article } from "../models";
import { useParams } from "react-router-dom";

interface MyComponentProps {
    notify: Function;
    article: Article | undefined;
}

const CreateArticle: React.FC<MyComponentProps> = ({ notify, article }) => {
    // State for each field
    const [url, setUrl] = useState(article?.url || "");
    const [date, setDate] = useState(article?.date || "");
    const [description, setDescription] = useState(article?.description || "");
    const [imageUrl, setImageUrl] = useState(article?.image_url || "");
    const [rating, setRating] = useState<number>(article?.rating || 0);
    const [title, setTitle] = useState(article?.title || "");

    // const selectedPartyMember = useSelector(
    //     (state: RootState) => state.data1.selectedPartyMember
    // );

    // const selectedParty = useSelector(
    //     (state: RootState) => state.data1.selectedParty
    // );

    // const selectedGovernment = useSelector(
    //     (state: RootState) => state.data1.selectedGovernment
    // );

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

    const dispatch = useDispatch();

    // Function to handle the "create" button click
    const handleCreateClick = async () => {
        if (article) {
            await updateArticle(
                article.entity_uuid,
                dispatch,
                url,
                date,
                description,
                imageUrl,
                rating,
                title
            );

            notify("updated article");
        } else {
            if (selectedPartyMember && selectedParty && selectedGovernment) {
                await createArticle(
                    dispatch,
                    url,
                    date,
                    description,
                    imageUrl,
                    rating,
                    title,
                    selectedPartyMember?.entity_uuid
                );

                notify("created article");
            } else {
                alert("plz select party member");
            }
        }
    };

    const urlContainerStyle: CSSProperties = {
        // margin: "0 40px",
        display: "flex",
    };
    const regularFieldContainerStyle: CSSProperties = {
        // margin: "0 40px",
        marginTop: "10px",
    };
    const textAreaContainerStyle: CSSProperties = {
        marginTop: "10px",
    };
    const fieldTitleStyles: CSSProperties = {
        width: "100px",
    };

    return (
        <div style={{ padding: "10px", backgroundColor: "lightcoral" }}>
            <div style={{ textAlign: "center", marginBottom: '20px', fontSize: '25px', fontWeight: 'bold' }}>article creation</div>
            <div className="fieldsContainer">
                <div
                    className="urlsContainer"
                    style={{ display: "flex", marginBottom: "10px" }}
                >
                    <div
                        style={{
                            display: "flex",
                            flex: 1,
                            marginRight: "10px",
                        }}
                    >
                        <span style={fieldTitleStyles}>URL:</span>
                        <input
                            type="text"
                            value={url}
                            style={{ flex: 1 }}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div style={{ display: "flex", flex: 1 }}>
                        <span style={fieldTitleStyles}>IMAGE URL:</span>
                        <input
                            type="text"
                            value={imageUrl}
                            style={{ flex: 1 }}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                </div>
                <div
                    className="titleContainer"
                    style={regularFieldContainerStyle}
                >
                    <div style={{ display: "flex" }}>
                        <span style={fieldTitleStyles}>title:</span>
                        <input
                            type="text"
                            style={{ flex: 1 }}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div style={textAreaContainerStyle}>
                    <div style={{ display: "flex" }}>
                        <span style={fieldTitleStyles}>Description:</span>
                        <textarea
                            value={description}
                            style={{ flex: 1, height: "50px" }}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ display: "flex", marginTop: "10px" }}>
                    <div style={{ display: "flex", flex: 1 }}>
                        <span style={fieldTitleStyles}>Date:</span>
                        <input
                            type="text"
                            style={{ flex: 1 }}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div style={{ display: "flex", flex: 1 }}>
                        <span style={fieldTitleStyles}>Rating:</span>
                        <input
                            type="number"
                            value={rating}
                            style={{ flex: 1 }}
                            onChange={(e) => setRating(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleCreateClick}
                style={{
                    marginTop: "20px",
                    padding: "10px 30px",
                    backgroundColor: "lightgoldenrodyellow",
                    borderRadius: "5px",
                }}
            >
                {article ? "save" : "create"}
            </button>
        </div>
    );
};

export default CreateArticle;
