import { APIResult } from "../models";
import { setIsLoggedIn } from "../redux/dataSlice";

export const testToken = async (): Promise<APIResult> => {
    const loginHeaders = {
        "Content-Type": "application/json",
    };

    const fullUrl = `http://127.0.0.1:3000/tokenTest`;
    try {
        const res = await fetch(fullUrl, {
            method: "POST",
            credentials: "same-origin", // include cookies
            headers: loginHeaders,
        });
        
        if (!res.ok) {
            console.log(await res.json());
        }

        const resData = await res.json();

        if (resData.status == 200) {
            console.log('tokenTest1 passed')
        }

        return {
            data: {
                status: 200
            },
            error: undefined
        };
    } catch (error) {
        return {
            data: undefined,
            error: error + "",
        };
    }
};

export const testTokenGet = async (): Promise<APIResult> => {
    const loginHeaders = {
        "Content-Type": "application/json",
    };

    const fullUrl = `http://127.0.0.1:3000/signIn2`;
    try {
        const cookies = document.cookie
        const res = await fetch(fullUrl, {
            credentials: 'include',  // include cookies
            headers: {
                'cookies': cookies,
                'Cookie': cookies,
                "Content-Type": "application/json",
            }
            
        });

        //didnt work
        // const res = await axios.get(fullUrl, {
        //     withCredentials: true, // include cookies
        //   })
        //     .then(response => {
        //       // Handle the response
        //       console.log('Response:', response.data);
        //     })
        //     .catch(error => {
        //       // Handle errors
        //       console.error('Error:', error);
        //     });
        
        
        if (!res.ok) {
            console.log(await res.json());
        }

        const resData = await res.json();

        if (res.ok) {
            console.log('tokenTest2 passed')
            console.log(resData)
        }

        return {
            data: {
                status: 200
            },
            error: undefined
        };
    } catch (error) {
        return {
            data: undefined,
            error: error + "",
        };
    }
};



export const login = async (
    dispatch: Function,
    username: string,
    password: string
): Promise<APIResult> => {
    const loginHeaders = {
        "Content-Type": "application/json",
    };

    const fullUrl = `http://127.0.0.1:3000/login`;
    try {
        const res = await fetch(fullUrl, {
            method: "POST",
            headers: loginHeaders,
            body: JSON.stringify({ username, password }),
        });
        
        if (!res.ok) {
            console.log(await res.json());
        }

        const resData = await res.json();

        if (resData.status == 200) {
            dispatch(setIsLoggedIn(true));
        }

        document.cookie = `token3=${resData.token}`;

        return resData;
    } catch (error) {
        return {
            data: undefined,
            error: error + "",
        };
    }
};
