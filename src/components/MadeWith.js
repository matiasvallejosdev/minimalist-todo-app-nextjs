import Image from 'next/image';
import Link from 'next/link';

export default function MadeWith() {
  return (
    <div className="flex items-center justify-center flex-row gap-2 py-2 text-sm md:text-lg dark:text-white">
      <span>Made with</span>
      <span className="font-bold">♥</span>
      <span>by</span>
      <Image src="/emoji.png" alt="Matias Vallejos Emoji" height={30} width={30} />
      <span className="underline">
        <Link
          href=" https://www.linkedin.com/in/matiasvallejos/"
          target="_blank"
          className="text-bold text-primary-600"
        >
          Matias Vallejos
        </Link>
      </span>
    </div>
  );
}
