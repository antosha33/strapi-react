import Header from "../header/header";
import Footer from "../footer/footer";

function Layout({ children }) {
    return (
        <div className="h-[100vh] flex flex-col">
            <Header></Header>
            {children}
				<Footer></Footer>
        </div>
    );
}

export default Layout;