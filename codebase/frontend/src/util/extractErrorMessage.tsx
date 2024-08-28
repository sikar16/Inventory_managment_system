function extractErrorMessage(errorString: string) {
    // Split the string to get the JSON part
    const jsonString = errorString.split(' - ')[1];
    // Parse the JSON string
    const errorArray = JSON.parse(jsonString);
    // Access and return the message
    return errorArray[0].message;
}
export default extractErrorMessage