import Header from "../header/header";

function Layout({ children }) {
    return (
        <>
            <Header></Header>
            {children}
        </>
    );
}

export default Layout;