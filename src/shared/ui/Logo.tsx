import Image from "next/image";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div>
      <Image
        src={"/assets/img/logo.svg"}
        alt={"Logo"}
        className={className}
        width={361}
        height={42}
      />
    </div>
  );
};
