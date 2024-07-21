import { render, screen } from "@testing-library/react"
import Contact from "../Contact"
import "@testing-library/jest-dom";

describe("Contact Us component load test cases",()=>{
    test('should load Contact component', () => { 
        render(<Contact/>);
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
     })
    test('should have button in Contact component', () => { 
        render(<Contact/>);
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
     })
    it('should have input in Contact component', () => { 
        render(<Contact/>);
        const input = screen.getByPlaceholderText('name')
        expect(input).toBeInTheDocument()
     })
    it('should have 2 inputs in Contact component', () => { 
        render(<Contact/>);
        const inputs = screen.getAllByRole('textbox')
        expect(inputs.length).toBe(2)
     })
})
