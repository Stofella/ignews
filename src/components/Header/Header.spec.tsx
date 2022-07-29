import { render, screen } from '@testing-library/react'
import { Header } from './Index'


jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe('Header component', () => {
  it('renders correctly', () => {
    render(
      <Header/>
    )
  
    expect(screen.getByText('Home')).toBeInTheDocumento()
    expect(screen.getByText('Posts')).toBeInTheDocumento()
  })

  
})


