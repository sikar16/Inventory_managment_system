// Function to read the data from the user's local storage
const getAuth = async () => {
  let userInfo = null;
  const data = localStorage.getItem("userToken");
  if (data != null) {
    userInfo = await JSON.parse(data);
    // console.log(userInfo);
    let userData = {
      userId: "",
      firstName: "",
      userRole: "",
      token: userInfo == null ? null : userInfo.userToken,
    };

    if (userInfo && userInfo.userToken) {
      const decodedToken = await decodeTokenPayload(userInfo.userToken);
      userData.userId = decodedToken.userId;
      userData.firstName = decodedToken.firstName;
      userData.userRole = decodedToken.userRole;

      return userData;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Function to decode the payload from the token
// The purpose of this code is to take a JWT token, extract its payload, decode it from Base64Url encoding, and then convert the decoded payload into a JavaScript object for further use and manipulation
const decodeTokenPayload = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export default getAuth;
