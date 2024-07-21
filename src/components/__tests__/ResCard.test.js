import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import ResCard from "../ResCard";
import MOCK_DATA from "../mocks/mockResCard.json"
it("should render ResCard component with props data",()=>{
    render(<ResCard resData={MOCK_DATA}/>)

    const name  = screen.getByText("Asha Sweet Center - Since 1951")
    expect(name).toBeInTheDocument();
})