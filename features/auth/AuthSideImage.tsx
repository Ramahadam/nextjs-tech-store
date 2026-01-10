import Image from "next/image";

export function AuthSideImage() {
  return (
    <div className="relative hidden md:block ">
      <Image
        src="/person-using-laptop.jpg"
        alt="A person using laptop"
        className=" h-full w-full object-cover  grayscale-75"
        width={500}
        height={500}
      />
    </div>
  );
}
