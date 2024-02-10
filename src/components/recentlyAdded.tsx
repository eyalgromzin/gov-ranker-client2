import { Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ArticleThumbnail from "./articleThumbnail";
import { Article } from "../models";

type articlesProps = {
    articles: Article[];
};

const RecentlyAdded: FunctionComponent<articlesProps> = ({ articles }) => {
    // put articles in date butckets and sort the buckets

    return (
        <div style={{textAlign: 'right'}}>
            <div style={{fontSize: '25px'}}>הוסף לאחרונה:</div>
            <div style={{textAlign: 'start'}}>
                {articles.map((articleI: Article) => (
                    <div key={articleI.entity_uuid}>{articleI.title}</div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyAdded;
