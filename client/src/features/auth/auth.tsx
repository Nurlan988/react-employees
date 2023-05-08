import { FC } from "react";
import { useCurrentQuery } from "../../app/services/auth"

type authProps = {
  children: JSX.Element
}

export const Auth: FC<authProps> = ({children}) => {
  const { isLoading } = useCurrentQuery();

  if(isLoading){
    return <span>Loading...</span>
  }
  return children
}