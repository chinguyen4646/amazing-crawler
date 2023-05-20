import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Tooltip } from "@mui/material";
import { styled } from "@mui/system";
import { truncateText } from "../helpers/textHelpers";
import CrawlResults from "../interfaces/CrawlResultsInterface";

interface CrawlResultsTableProps {
  crawlResults: CrawlResults;
}

const StyledTableContainer = styled(TableContainer)`
  border-radius: 1rem;
  margin-top: 1rem;
  max-width: 1300px;
  
  @media (max-width: 1400px) {
    max-width: 1200px;
  }

  @media (max-width: 1200px) {
    max-width: 1000px;
  }

  @media (max-width: 1000px) {
    max-width: 800px;
  }

  @media (max-width: 800px) {
    max-width: 600px;
  }

  @media (max-width: 600px) {
    max-width: 400px;
  }

  @media (max-width: 400px) {
    max-width: 350px;
  }
`;

const StyledTableHead = styled(TableHead)`
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledTableCell = styled(TableCell)`
  text-align: center;
  &.MuiTableCell-head {
    font-weight: bold;
    color: #ffffff;
  }
`;

const StyledTableBody = styled(TableBody)`
  background-color: #fae6ec;
`;

const StyledTableRow = styled(TableRow)`
  border-bottom: solid;
`;

const TooltipTypography = styled(Typography)`
  cursor: pointer;
`;

const CrawlResultsTable: React.FC<CrawlResultsTableProps> = ({ crawlResults }) => {
  const { results } = crawlResults;

  return (
    <StyledTableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <StyledTableCell>Page Title</StyledTableCell>
            <StyledTableCell>URL</StyledTableCell>
            <StyledTableCell>Heading Tags</StyledTableCell>
            <StyledTableCell>Links</StyledTableCell>
            <StyledTableCell>Static Assets</StyledTableCell>
            <StyledTableCell>Text Content</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {results.map((result, index) => (
            <StyledTableRow key={index}>
              <TableCell>
                <Tooltip title={result.pageTitle}>
                  <TooltipTypography fontWeight="bold" variant="body2">
                    {truncateText(result.pageTitle, 25) || "n/a"}
                  </TooltipTypography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={result.url}>
                  <TooltipTypography fontWeight="bold" variant="body2">
                    {truncateText(result.url, 25) || "n/a"}
                  </TooltipTypography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={result.headingTags.join(", ")}>
                  <TooltipTypography variant="body2">
                    {truncateText(result.headingTags.join(", "), 25) || "n/a"}
                  </TooltipTypography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={result.links}>
                  <TooltipTypography variant="body2">
                    {truncateText(result.links.join(" "), 25) || "n/a"}
                  </TooltipTypography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={result.staticAssets}>
                  <TooltipTypography variant="body2">
                    {truncateText(result.staticAssets.join(", "), 25) || "n/a"}
                  </TooltipTypography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={result.textContent}>
                  <TooltipTypography variant="body2">
                    {truncateText(result.textContent, 10) || "n/a"}
                  </TooltipTypography>
                </Tooltip>
              </TableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default CrawlResultsTable;