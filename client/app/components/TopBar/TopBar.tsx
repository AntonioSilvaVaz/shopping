import './TopBar.css';
import Link from 'next/link';

export default function TopBar() {
  return (
    <nav>
      <div>
        <h3>
          <Link href={'/'}>
            Shopping
          </Link>
        </h3>
      </div>
      <div className='links'>
        <h5><Link href={'/login'}>Login</Link></h5>
        |
        <h5><Link href={'/register'}>Register</Link></h5>
      </div>
    </nav>
  )
}