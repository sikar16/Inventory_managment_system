// extractErrorMessage.ts
export default function extractErrorMessage(message?: string): string {
    if (!message) return "An unknown error occurred"; // Handle undefined or empty message

    try {
        // Attempt to parse JSON if the message appears to be a JSON string
        const parsedMessage = JSON.parse(message);
        return parsedMessage.message || "An unknown error occurred";
    } catch {
        // If JSON parsing fails, return the message as is
        return message || "An unknown error occurred";
    }
}
