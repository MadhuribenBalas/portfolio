import { Link } from 'react-router-dom'
import PageTitle from '../components/PageTitle'

export default function NotFound() {
  return (
    <>
      <PageTitle title="Page not found" intro="This address does not match any page on the site." />
      <p><Link to="/">Go to the home page</Link> or <Link to="/projects">browse all projects</Link>.</p>
    </>
  )
}
