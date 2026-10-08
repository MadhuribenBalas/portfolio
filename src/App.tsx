import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import CaseStudies from './pages/CaseStudies'
import CaseStudyPage from './pages/CaseStudyPage'
import Certifications from './pages/Certifications'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="case-studies/:slug" element={<CaseStudyPage />} />
        <Route path="certifications" element={<Certifications />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
