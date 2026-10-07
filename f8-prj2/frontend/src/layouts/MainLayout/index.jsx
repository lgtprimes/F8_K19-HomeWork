import { Header, Footer } from '../../components/Layouts/index.jsx'

function MainLayout({children}) {
 
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
export default MainLayout;