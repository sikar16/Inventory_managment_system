export const getToken = async () => {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
        const userInfo = await JSON.parse(tokenData);
        return userInfo.token
    }
    else {
        return null;
    }
}

