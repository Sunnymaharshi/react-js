import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import ResMenu from "../ResMenu";
import RES_MENU_DATA from "../mocks/mockResMenu.json"
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import Cart from "../Cart";

global.fetch = jest.fn(()=>Promise.resolve(
        {
            json:()=>Promise.resolve(RES_MENU_DATA)
            
        }
    ))
it("should load restaurant menu component",async ()=>{
    await act(async ()=>render(
    <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
            <ResMenu/>
            <Cart />
        </Provider>
    </BrowserRouter>))
    const accordian = screen.getByText(/Recommended/);
    fireEvent.click(accordian)
    const menu_items = screen.getAllByTestId("menu-items");
    expect(menu_items.length).toBe(11)
    const add_btns = screen.getAllByRole('button',{name:"Add +"})
    expect(add_btns.length).toBe(11)
    fireEvent.click(add_btns[0])
    expect(screen.getByText("Cart (1)")).toBeInTheDocument();
    // since we are rendering cart also, total list items will be increasted after add to cart
    expect(screen.getAllByTestId("menu-items").length).toBe(12)
    fireEvent.click(add_btns[1])
    expect(screen.getByText("Cart (2)")).toBeInTheDocument();
    expect(screen.getAllByTestId("menu-items").length).toBe(13)
    
    fireEvent.click(screen.getByRole('button',{name:"Clear Cart"}))
    expect(screen.getAllByTestId("menu-items").length).toBe(11)   
    expect(screen.getByText("Cart is Empty!!! Please Add Items to Cart")).toBeInTheDocument();

})