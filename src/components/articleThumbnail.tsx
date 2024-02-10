import React, { useState } from "react";
import { deleteArticle } from "../apis/articleAPi";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDialog from "./confirmDialog";
import CreateEditArticle from "./createEditArticle";
import { Article } from "../models";

interface ThumbnailProps {
    article: Article;
    isEditable: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ article, isEditable }) => {
    const dispatch = useDispatch();

    const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
        useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const divStyles: React.CSSProperties = {
        display: "flex",
        marginTop: "20px",
    };

    function handleDeleteArticle(uuid: string): void {
        deleteArticle(dispatch, uuid);
        setIsConfirmDialogOpen(false);
    }

    const previewItem = (
        <a href={article?.url} style={{ cursor: "pointer", margin: "0 auto" }}>
            <div key={article?.entity_uuid} style={divStyles} className="thumbnail">
                <div>
                    <img
                        src={article?.image_url}
                        style={{
                            margin: "0 auto",
                            maxWidth: "288px",
                        }}
                    />
                </div>
                <div style={{ cursor: "pointer", margin: "0 15px", textAlign: 'right' }}>
                    <div className="thumbnail-details">
                        <h1 style={{fontSize: '20px', fontWeight: 'bold'}}>{article?.title}</h1>
                        <p>{article?.description}</p>
                        {/* <p>Date: {article?.date}</p> */}
                        {/* <p>Rating: {article?.rating}</p> */}
                        {/* <p>Creation Date: {article?.creationDate}</p> */}
                    </div>
                </div>
            </div>
        </a>
    );

    const editItem = (
        <CreateEditArticle article={article} notify={() => alert("updated")} />
    );

    return (
        <div>
            {isEdit ? editItem : previewItem}

            {isEditable && (
                <div>
                    <div style={{ display: "flex" }}>
                        <img
                            src="https://cdn.iconscout.com/icon/free/png-256/free-delete-736-470378.png"
                            onClick={() => setIsConfirmDialogOpen(true)}
                            style={{
                                height: "40px",
                                cursor: "pointer",
                                margin: "0 10px",
                            }}
                        />
                        <img
                            src="https://cdn.iconscout.com/icon/free/png-256/free-edit-mode-pencil-tool-change-30495.png"
                            onClick={() => setIsEdit(true)}
                            style={{ height: "40px", cursor: "pointer" }}
                        />
                    </div>
                    <ConfirmDialog
                        isOpen={isConfirmDialogOpen}
                        title={"delete"}
                        message={"delete article?"}
                        onConfirm={function (): void {
                            handleDeleteArticle(article.entity_uuid);
                        }}
                        onCancel={function (): void {
                            setIsConfirmDialogOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Thumbnail;
