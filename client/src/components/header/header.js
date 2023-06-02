import Container from "../container/container";
import UsersPanel from "../usersPanel/usersPanel";


function Header() {
    return (
        <Container>
            <div className="pt-[36px] pb-[18px] flex justify-between ">
                <span className="block">
                    <img src="/Logo.png" alt="" />
                </span>

                <UsersPanel></UsersPanel>
            </div>
        </Container>

    );
}

export default Header;