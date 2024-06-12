import { Button } from "./ui/button";

export const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  return (
    <>
      {variant === "primary" ? (
        <Button className="plaidlink-primary">Connect bank</Button>
      ) : variant === "ghost" ? (
        <Button>Connect bank</Button>
      ) : (
        <Button>Connect bank</Button>
      )}
    </>
  );
};
