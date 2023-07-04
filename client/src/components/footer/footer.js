import Container from "../container/container";
import Switcher from "../ui/swticher/switcher";

function Footer() {
	return (

		<div className="py-[1.8rem] bg-white">
			<Container>
				<div className="pb-[1.2rem] flex gap-[2.6rem]">
					{/* <Switcher
						label="Загрузка специалистов"
					></Switcher> */}
					<Switcher
						label="Загрузка печати"
					></Switcher>
				</div>
				<div className="flex justify-between pt-[1.2rem] border border-Content/Border border-l-0 border-r-0 border-b-0">
					<span className="block text-Regular(16_18) text-Content/Dark">Маркли, 2023. Управление производством</span>
					<span className="block text-Regular(16_18) text-Content/Dark">Версия 2.0001</span>
				</div>
			</Container>
		</div>
	);
}

export default Footer;