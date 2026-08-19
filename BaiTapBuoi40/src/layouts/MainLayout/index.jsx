import { Header } from '../../components/Layouts/index.jsx'

function MainLayout({children}) {
 
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
export default MainLayout;