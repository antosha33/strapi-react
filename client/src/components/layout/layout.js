import Header from "../header/header";
import Footer from "../footer/footer";

function Layout({ children }) {
	return (
		<div className=" flex flex-col min-h-[100vh]">
			<Header></Header>
			{children}
			<Footer></Footer>
		</div>
	);
}

export default Layout;