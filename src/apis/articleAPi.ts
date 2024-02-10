import { useDispatch } from "react-redux";
import {
    addArticle,
    removeArticle,
    setArticles,
    setCurrentArticles,
    setRecentlyAddedArticles,
} from "../redux/dataSlice";
import { APIResult, Article, EntityType } from "../models";

export const getAllArticles = (dispatch: any) => {
    fetch("http://127.0.0.1:3000/article/getAllArticles")
        .then((res) => res.json())
        .then((res) => {
            dispatch(setArticles(res.data));
        });
};

export const getAndShowGovernmentArticles = (
    dispatch: Function,
    governmentUUID: string,
    onGotArticles: Function
) => {
    fetch(`http://127.0.0.1:3000/article/getGovernmentArticles?governmentUUID=${governmentUUID}`)
        .then((res) => res.json())
        .then((res) => {
            dispatch(setCurrentArticles(res.data));
            onGotArticles(res.data)
        });
};

export const getAndShowPartyArticles = (
    dispatch: Function,
    partyUUID: string,
    onGotArticles: Function
) => {
    fetch(`http://127.0.0.1:3000/article/getPartyArticles?partyUUID=${partyUUID}`)
        .then((res) => res.json())
        .then((res) => {
            dispatch(setCurrentArticles(res.data));
            onGotArticles(res.data)
        });
};

export const getAndShowPartyMemberArticles = (
    dispatch: Function,
    partyMemberUUID: string,
    onGotArticles: Function
) => {
    fetch(`http://127.0.0.1:3000/article/getPartyMemberArticles?partyMemberUUID=${partyMemberUUID}`)
        .then((res) => res.json())
        .then((res) => {
            if(!res.success){
                console.error('failed to get partyMemberArticles')
            }
            dispatch(setCurrentArticles(res.data));
            onGotArticles(res.data)
        });
};

export const getRecentlyAddedArticles = (
    dispatch: any,
    numOfArticles: number
) => {
    const url = `http://127.0.0.1:3000/article/getRecentlyAdded?numOfArticles=${numOfArticles}`;
    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            dispatch(setRecentlyAddedArticles(res.data));
        });
};

export const createArticle = async (
    dispatch: any,
    url: string,
    date: string,
    description: string,
    imageUrl: string,
    rating: number,
    title: string,
    partyMemberUUID: string
) => {
    const data = { title, url, date, description, imageUrl, rating };

    try {
        const addedArticle = await addArticleToDb(data, dispatch);

        await createEntityToArticleInDB(
            partyMemberUUID,
            addedArticle.entity_uuid,
            EntityType.partyMember,
            dispatch
        );

        console.log(
            "added entity to article ",
            partyMemberUUID,
            addedArticle.entity_uuid
        );
    } catch (error) {
        return {
            data: undefined,
            error: error + "",
        };
    }
};

export const updateArticle = async (
    articleUUID: string,
    dispatch: any,
    url: string,
    date: string,
    description: string,
    imageUrl: string,
    rating: number,
    title: string
) => {
    const data = { url, date, description, imageUrl, rating };

    try {
        const updatedArticle = await updateArticleInDb(
            articleUUID,
            title,
            url,
            date,
            description,
            imageUrl,
            rating,
            dispatch
        );

        console.log(
            "updated article in db: ",
            articleUUID,
            url,
            imageUrl,
            date,
            description,
            rating,
            title
        );
    } catch (error) {
        return {
            data: undefined,
            error: error + "",
        };
    }
};

async function updateArticleInDb(
    uuid: string,
    title: string,
    url: string,
    date: string,
    description: string,
    imageUrl: string,
    rating: number,
    dispatch: any
): Promise<Article> {
    const customHeaders = {
        "Content-Type": "application/json",
    };
    const res = await fetch(`http://127.0.0.1:3000/article/updateArticle`, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify({
            uuid,
            title,
            url,
            date,
            description,
            imageUrl,
            rating,
        }),
    });
    if (!res.ok) {
        console.log(await res.json());
    }

    const resData = await res.json();
    dispatch(addArticle(resData.res));

    return resData.res;
}

export const crawlYnet = async () => {
    const customHeaders = {
        "Content-Type": "application/json",
    };
    const res = await fetch(`http://127.0.0.1:3000/article/crawlYnet`, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify({
            website: 'https://www.ynet.co.il/home/0,7340,L-8,00.html',
            maxDepth: 4,
        }),
    });

    const resData = await res.json();
    console.log(resData.res)

    return resData.res;
}

async function addArticleToDb(
    data: {
        url: string;
        date: string;
        description: string;
        imageUrl: string;
        rating: number;
        title: string;
    },
    dispatch: any
): Promise<Article> {
    const customHeaders = {
        "Content-Type": "application/json",
    };
    const res = await fetch(`http://127.0.0.1:3000/article/createArticle`, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        console.log(await res.json());
    }

    const resData = await res.json();
    dispatch(addArticle(resData.res));

    return resData.res;
}

async function createEntityToArticleInDB(
    entityUUID: string,
    articleUUID: string,
    entityTypeId: number,
    dispatch: any
) {
    const customHeaders = {
        "Content-Type": "application/json",
    };

    const data = { entityUUID, articleUUID, entityTypeId };
    const res = await fetch(
        `http://127.0.0.1:3000/article/createEntityArticle`,
        {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        }
    );
    if (!res.ok) {
        console.log(await res.json());
    }

    const resData = await res.json();
    dispatch(addArticle(resData.res));

    return resData.res;
}

export const deleteArticle = async (
    dispatch: Function,
    articleUUID: string
): Promise<APIResult> => {
    const customHeaders = {
        "Content-Type": "application/json",
    };

    const fullUrl = `http://127.0.0.1:3000/article/deleteArticle`;
    try {
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify({ articleUUID }),
        });
        if (!res.ok) {
            console.log(await res.json());
        }

        const resData = await res.json();

        dispatch(removeArticle(articleUUID));

        return resData.res;
    } catch (error) {
        return {
            data: undefined,
            error: error + "",
        };
    }
};
