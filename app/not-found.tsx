import Link from 'next/link';
import Image from 'next/image';

export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center mt-[70px] text-center'>
      <div className='flex items-center justify-center gap-x-[30px]'>
        <h1 className='text-[30px] md:text-[80px] font-bold'>4</h1>
        <Image
          src='/logo/LogoJama.png'
          alt='404 Error'
          width={100}
          height={100}
        />
        <h1 className='text-[30px] md:text-[80px] font-bold'>4</h1>
      </div>
      <h2 className='text-4xl font-bold mb-4 mt-4'>Page Not Found</h2>
      <p className='text-gray-600 mb-6'>
        We're sorry, but the requested page could not be found.
      </p>
      <Link href="/">
        <p className='text-blue-500 underline hover:text-blue-700'>
          Return Home
        </p>
      </Link>
    </div>
  );
}
