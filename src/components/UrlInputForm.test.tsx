import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UrlInputForm from "./UrlInputForm";

describe("UrlInputForm", () => {
  test("Should render input and button in the document", () => {
    const inputRef = { current: null };
    render(<UrlInputForm inputRef={inputRef} onSubmit={() => {}} showForm={true} selectedUrl="https://figfinance.io" crawlerInProgress={false}/>);
    const input = screen.getByPlaceholderText("e.g. https://www.figfinance.io/");
    const button = screen.getByText("Begin crawl");
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("Should allow text input", () => {
    const inputRef = { current: null };
    render(<UrlInputForm inputRef={inputRef} onSubmit={() => {}} showForm={true} selectedUrl="https://figfinance.io" crawlerInProgress={false}/>);
    const input = screen.getByPlaceholderText("e.g. https://www.figfinance.io/") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "https://figfinance.io" } });
    expect(input.value).toBe("https://figfinance.io");
  });

  test("Should not not call onSubmit when input is empty", () => {
    const handleSubmit = jest.fn();
    const inputRef = { current: null };
    render(<UrlInputForm inputRef={inputRef} onSubmit={() => {}} showForm={true} selectedUrl="" crawlerInProgress={false}/>);
    const button = screen.getByText("Begin crawl");
    fireEvent.click(button);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  test("Should call onSubmit with the input value when input is valid", () => {
    const handleSubmit = jest.fn();
    const inputRef = { current: null };
    render(<UrlInputForm inputRef={inputRef} onSubmit={handleSubmit} showForm={true} selectedUrl="https://figfinance.io" crawlerInProgress={false}/>);
    const input = screen.getByPlaceholderText("e.g. https://www.figfinance.io/");
    fireEvent.change(input, { target: { value: "https://figfinance.io" } });
    const button = screen.getByText("Begin crawl");
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalledWith("https://figfinance.io");
  });

  test("Should display error message when input is empty", () => {
    const inputRef = { current: null };
    render(<UrlInputForm inputRef={inputRef} onSubmit={() => {}} showForm={true} selectedUrl="" crawlerInProgress={false}/>);
    const button = screen.getByText("Begin crawl");
    fireEvent.click(button);
    const error = screen.getByText("Input cannot be empty");
    expect(error).toBeInTheDocument();
  });

  test("Should display error message when input is not a valid URL", () => {
    const inputRef = { current: null };
    render(<UrlInputForm inputRef={inputRef} onSubmit={() => {}} showForm={true} selectedUrl="invalid-url" crawlerInProgress={false}/>);
    const input = screen.getByPlaceholderText("e.g. https://www.figfinance.io/");
    fireEvent.change(input, { target: { value: "invalid-url" } });
    const button = screen.getByText("Begin crawl");
    fireEvent.click(button);
    const error = screen.getByText("Input must be a valid URL");
    expect(error).toBeInTheDocument();
  });
});
