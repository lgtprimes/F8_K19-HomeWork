import { EmployerHeader, Footer } from "../../components/Layouts";

function EmployerLayout({children}) {

    return (
        <>
            <EmployerHeader />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default EmployerLayout;