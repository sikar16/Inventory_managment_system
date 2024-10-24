import { Box, Typography } from "@mui/material";
import RectangularButton from "./ui/RectangularButton";

interface WarningProps {
  message: string;
  handleClose: () => void;
  handleAction: () => void;
  isLoading: boolean;
  isSuccess: boolean;
}

const Warning: React.FC<WarningProps> = ({
  message,
  handleClose,
  handleAction,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Warning
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          {message}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Box sx={{ width: "45%" }}>
            <RectangularButton type="error" onClick={handleClose}>
              Close
            </RectangularButton>
          </Box>
          <Box sx={{ width: "45%" }}>
            <RectangularButton type="primary" onClick={handleAction}>
              {"Confirm"}
            </RectangularButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Warning;
