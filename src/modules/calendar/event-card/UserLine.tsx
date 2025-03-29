interface Props {
  user: {
    name: string,
    user_id: string | null
  }
}

export default function UserLine({user: {name, user_id}}: Props) {
  return (
    <div className="text-sm">{name} <span className="opacity-80">({user_id})</span></div>
  )
}