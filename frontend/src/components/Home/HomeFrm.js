
import PersonalHome from "./PersonalHome"
import OrgHome from "./OrgHome";
import AdminHome from "./AdminHome";

function Home({ user }) {
    if (user.role === 'P')
        return <PersonalHome />
    else if (user.role === 'O') return <OrgHome />
    else return <AdminHome />
}

export default Home;