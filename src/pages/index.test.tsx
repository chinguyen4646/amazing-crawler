import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import Home from "../pages/index";

jest.mock("axios");

describe("Home", () => {
  test("Should submit the form and call the API", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    mockedAxios.post.mockResolvedValueOnce({ data: "mock" });

    render(<Home />);

    const input = screen.getByPlaceholderText("e.g. https://www.figfinance.io/");
    const submitButton = screen.getByText("Begin crawl");

    await act(async () => {
      fireEvent.change(input, { target: { value: "https://figfinance.io" } });
      fireEvent.click(submitButton);
    });

    // We only care if the API gets called and not its response here
    expect(mockedAxios.post).toHaveBeenCalledWith("/api/crawl", {
      url: "https://figfinance.io"
    });
  });
});

