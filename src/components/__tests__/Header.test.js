import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../Header"
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";

it("should render header component with login button", ()=>{
    // since we're testing header in isolation, we need to provide the appStore 
    render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
        </BrowserRouter>
    );

    const loginBtn = screen.getByRole('button',{name:"Login"})
    expect(loginBtn).toBeInTheDocument()

})
it("should render header component with cart (0)", ()=>{
    // since we're testing header in isolation, we need to provide the appStore 
    render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
        </BrowserRouter>
    );

    const cart = screen.getByText('Cart (0)')
    expect(cart).toBeInTheDocument()

})
it("should change Login to Logout on click", ()=>{
    // since we're testing header in isolation, we need to provide the appStore 
    render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
        </BrowserRouter>
    );

    const loginBtn = screen.getByRole('button',{name:"Login"})
    fireEvent.click(loginBtn)
    const logoutBtn = screen.getByRole('button',{name:"Logout"})
    expect(logoutBtn).toBeInTheDocument()

})