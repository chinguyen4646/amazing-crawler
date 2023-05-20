import React, { useState } from "react";
import { Button, TextField, Container, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { isValidDomain, getBaseDomain } from "../helpers/urlHelpers";
import { styled } from "@mui/system";

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  showForm: boolean;
  selectedUrl: string;
  crawlerInProgress: boolean;
}

const TruncatedTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
`;

const StyledInputAdornment = styled(InputAdornment)`
  cursor: pointer;
`;

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onSubmit, inputRef, showForm, selectedUrl, crawlerInProgress }) => {
  const [error, setError] = useState("");

  // Helper functions
  const submitForm = () => {
    const inputElement = inputRef.current;

    if (!inputElement || !inputElement.value.trim()) {
      setError("Input cannot be empty");
      return;
    }

    try {

      if (!isValidDomain(inputElement.value)) {
        setError("Input must be a valid URL");
        return;
      }
      
      const baseUrl = getBaseDomain(inputElement.value);

      setError("");
      onSubmit(baseUrl);
    } catch (error) {
      setError("Input must be a valid URL");
    }
  };

  // Action functions
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitForm();
  };

  const handleIconClick = submitForm;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {showForm ? (
        <form noValidate onSubmit={handleFormSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="url"
            label="Input URL here"
            placeholder="e.g. https://www.figfinance.io/"
            name="url"
            autoFocus
            inputRef={inputRef}
            error={!!error}
            helperText={error}
            onKeyPress={handleKeyPress} 
            InputProps={{
              startAdornment: (
                <StyledInputAdornment position="start" onClick={handleIconClick}>
                  <SearchIcon />
                </StyledInputAdornment>
              ),
              sx: { borderRadius: "1rem" },
            }}
          />
          <Button type="submit" fullWidth variant="contained" color="secondary">
            {crawlerInProgress ?  "Crawling..." : "Begin crawl"}
          </Button>
        </form>
      ) : (
        <TruncatedTypography fontWeight="bold" border="solid" borderRadius="1rem"  variant="h6">{selectedUrl}</TruncatedTypography>
      )}
    </Container>
  );
};

export default UrlInputForm;
