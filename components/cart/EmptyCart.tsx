import Link from "next/link";
import { Button } from "../ui/button";

export const EmptyCart: React.FunctionComponent = () => {
  return (
    <div className="space-y-8 text-center">
      <p>You have not add any item to the cart</p>
      <Button className="bg-secondary-custom">
        <Link href="/">Continue shoping </Link>
      </Button>
    </div>
  );
};
