import { FC } from "react"

interface Props {
    text:  string
}
export const ErrorComponent: FC<Props> = ({text}) => {
    return <div>{text}</div>
}