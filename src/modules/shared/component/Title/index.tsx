import { HTMLAttributes } from "react";
import { ChildrenProps } from "../../types/children";

export default function Title({ children, className, ...props }: Props) {
    return <h1 className={className} {...props}>{children}</h1>
}

type Props = HTMLAttributes<HTMLHeadingElement> & ChildrenProps