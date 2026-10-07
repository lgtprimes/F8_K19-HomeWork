import { MainLayout } from './layouts/index.jsx'
// import { SlideShow } from './components/index.jsx' 
import { HeroSection, ListJobsSection } from './components/index.jsx'


function App() {

  return (
    <MainLayout>
      <HeroSection />
      <ListJobsSection />
    </MainLayout>
  )
}

export default App
