import { act, fireEvent, render, screen } from "@testing-library/react"
import Body from "../Body"
import "@testing-library/jest-dom";
import RES_LIST from "../mocks/mockResList.json"
import { BrowserRouter } from "react-router-dom";
// since test run on jsdom which doesn't have fetch api 
// we will create a mock fetch function
global.fetch = jest.fn(()=>{

    return Promise.resolve(
        {
            json:()=>{
                return Promise.resolve(RES_LIST);
            }
        }
    )
})
it("should search Res List for Asha in  body",async ()=>{
    await act(async ()=>render(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>));
    const res_cardsBefore = screen.getAllByTestId("rescard")
    expect(res_cardsBefore.length).toBe(20)
    const searchBtn  = screen.getByRole("button",{name:"Search"})
    const searchInput  = screen.getByTestId('searchInput')

    fireEvent.change(searchInput,{target:{value:"Asha"}})
    fireEvent.click(searchBtn);
    const res_cardsAfter = screen.getAllByTestId("rescard")
    expect(res_cardsAfter.length).toBe(1)

})
it("should filter Top rated restaurents in body",async ()=>{
    await act(async ()=>render(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>));
    
    const top_rated_btn  = screen.getByRole("button",{name:"Top Rated Restaurants"})
    fireEvent.click(top_rated_btn);
    const res_cards = screen.getAllByTestId("rescard")
    expect(res_cards.length).toBe(7)

})