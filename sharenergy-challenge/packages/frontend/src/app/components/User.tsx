export interface UserProps {
  pictureUrl: string;
  fullName: string;
  email: string;
  username: string;
  age: number;
}

export default function User({
  pictureUrl,
  age,
  fullName,
  email,
  username,
}: UserProps) {
  return (
    <div className="w-full bg-white mx-auto flex items-center gap-8 p-4 rounded-lg leading-relaxed">
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
    </div>
  );
}
