import React, { useState, useRef } from "react";
import axios from "axios";
import UrlInputForm from "../components/UrlInputForm";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import CrawlResultsTable from "../components/CrawlResultsTable";
import CrawlResults from "../interfaces/CrawlResultsInterface";

const Home: React.FC = () => {
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [crawlResults, setCrawlResults] = useState<CrawlResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const submitCrawlRequest = async (url: string) => {
    try {
      // Set loading spinner
      setLoading(true);
      
      const response = await axios.post("/api/crawl", { url });

      // Check the response status
      if (response.status !== 200) {
        throw new Error("Failed to fetch data");
      }

      const data = response.data;

      // Set results and selected URL
      setCrawlResults({ results: data });
      setSelectedUrl(url);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleReset = () => {
    // Reset crawl results
    setCrawlResults(null); 
    if (inputRef.current) {
      // Clear URL input field
      inputRef.current.value = ""; 
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding={2}
    >
      <Typography variant="h3" gutterBottom fontWeight={900}>
          Fig Finance Crawler
      </Typography>
      <UrlInputForm
        onSubmit={submitCrawlRequest}
        inputRef={inputRef}
        showForm={!crawlResults}
        selectedUrl={selectedUrl}
        crawlerInProgress={loading}
      />
      <Box mt={5}>
        {loading ? (
          <CircularProgress thickness={6} />
        ) : (
          crawlResults && (
            <>
              <Button variant="contained" onClick={handleReset} color="secondary">
                  Reset crawler
              </Button>
              <CrawlResultsTable crawlResults={crawlResults} />
            </>
          )
        )}
      </Box>
    </Box>
  );
};

export default Home;
