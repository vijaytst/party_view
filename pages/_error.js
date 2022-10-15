import Link from 'next/link'

export default function FourOhFour() {
  return <div style={{display:'flex',justifyContent:"center",marginLeft:"a"}}>
    <h1 className=" text-lg py-6 px-5 text-black ">Something went wrong please check your network and reload the page </h1>
    <Link href="/">
      <a>
        Go back home
      </a>
    </Link>
  </div>
}   