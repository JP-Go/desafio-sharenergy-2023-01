import Card from './Card';

export interface UserProps {
  fullName: string;
  email: string;
  username: string;
  age: number;
  pictureUrl: string;
}

export default function User({
  username,
  pictureUrl,
  fullName,
  age,
  email,
}: UserProps) {
  return (
    <Card key={username}>
      <img
        src={pictureUrl}
        alt={pictureUrl}
        className="h-24 w-24 rounded-full outline outline-2 outline-indigo-500 "
      />
      <div>
        <p className="font-bold text-xl">{fullName}</p>
        <p>
          <span className="font-medium">Idade: </span>
          {age}
        </p>
        <p>
          <span className="font-medium">E-mail: </span>
          {email}
        </p>
        <p>
          <span className="font-medium">Usuário: </span>
          {username}
        </p>
      </div>
    </Card>
  );
}
