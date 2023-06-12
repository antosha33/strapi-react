import Authorization from "../components/authorization/authorization";

function Auth() {
	return (
		<div className="bg-[#ECDB88] flex min-h-[100vh] items-center relative">
			<div className="absolute left-0 top-0 bottom-0 right-[50%]">
				<img className="w-[100%] h-[100%] object-cover object-right" src="http://localhost:1337/uploads/auth_bg_91f66c0c36.png" alt="" />
			</div>
			<div className="w-[95%] m-auto">
				<div className="max-w-[50%] ml-auto ">
					<div className="bg-white max-w-[76rem]">
						<Authorization></Authorization>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Auth;