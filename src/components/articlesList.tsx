import { FC, Fragment, FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ArticleThumbnail from "./articleThumbnail";
import { Article } from "../models";

type ArticlesProps = {
    isEditable: boolean;
};

const ArticlesList: FC<ArticlesProps> = ({ isEditable }) => {
    const articles = useSelector((state: RootState) => state.data1.currentArticles); // see store.ts

    // put articles in date butckets and sort the buckets
    const articlesDictionary: any = {};

    articles.forEach((articleI: Article) => {
        if (!(articleI.date in articlesDictionary)) {
            articlesDictionary[articleI.date] = [];
        }

        articlesDictionary[articleI.date].push(articleI);
    });

    if(Object.keys(articlesDictionary).length == 0){
        return <Fragment />
    }

    return (
        <Fragment>
            <div>
                <div style={{ fontSize: "40px",textDecoration: 'bold', textAlign: 'start' }}>היסטוריית עשיה:</div>
                {Object.keys(articlesDictionary).map((dateI: string) => {
                    return (
                        <div key={dateI}>
                            <div
                                style={{
                                    textAlign: "start",
                                    fontWeight: "bold",
                                    fontSize: "22px",
                                    marginTop: "20px",
                                }}
                            >
                                {dateI}
                            </div>
                            {articlesDictionary[dateI].map(
                                (articleI: Article) => (
                                    <div key={articleI.entity_uuid}>
                                        <ArticleThumbnail
                                            article={articleI}
                                            isEditable={isEditable}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    );
                })}
            </div>
        </Fragment>
    );
};

export default ArticlesList;
