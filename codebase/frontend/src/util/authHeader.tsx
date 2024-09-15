// Function to read the data from the user's local storage
interface userDataType {
  id: number,
  firstName: string,
  role: string,
  token: string | null,
}

const getAuth = async () => {
  // console.log(localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  if (token != null) {
    const userInfo = await JSON.parse(token);
    const userData: userDataType = {
      id: 0,
      firstName: "",
      role: "",
      token: userInfo == null ? null : userInfo.token,
    };
    if (userInfo && userInfo.token) {
      const decodedToken = await decodeTokenPayload(userInfo.token);
      userData.id = decodedToken.id;
      userData.firstName = decodedToken.firstName;
      userData.role = decodedToken.role;
      // console.log(userData)
      return userData;
    } else {
      return {
        id: 0,
        firstName: "",
        role: "",
        token: null,
      };
    }
  }
  else {
    return {
      id: 0,
      firstName: "",
      role: "",
      token: null
    };
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
