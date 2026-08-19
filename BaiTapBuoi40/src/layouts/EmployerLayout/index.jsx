import { EmployerHeader } from "../../components/Layouts";

function EmployerLayout({children}) {

    return (
        <>
            <EmployerHeader />
            <main>
                {children}
            </main>
        </>
    )
}

export default EmployerLayout;