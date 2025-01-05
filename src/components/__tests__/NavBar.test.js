import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../NavBar";
import { CurrentUserProvider } from "../../context/CurrentUserContext";

test("renders NavBar", () => {
    render(
        <Router>
            <NavBar />
        </Router>
    );
    // screen.debug()
    const signinLink = screen.getByRole("link", { name: "Sign in" });
    expect(signinLink).toBeInTheDocument();
});

test("renders Link to the user profile for the logged in user", async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const profileAvatar = await screen.findByText('Profile')
    expect(profileAvatar).toBeInTheDocument();
});

test("renders Sign in and Sign up buttons again on loggout", async () => {
    render(
        <Router>
            <CurrentUserProvider>
                <NavBar />
            </CurrentUserProvider>
        </Router>
    );

    const signOutLink = await screen.findByRole('link', {name: 'Sign out'})
    fireEvent.click(signOutLink)

    const signInLink = await screen.findByRole('link', {name: 'Sign in'})
    const signUpLink = await screen.findByRole('link', {name: 'Sign up'})
    expect(signInLink).toBeInTheDocument()
    expect(signUpLink).toBeInTheDocument()

});