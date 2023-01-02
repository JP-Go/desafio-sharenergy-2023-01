interface UserProps {
  avatarUrl: string;
  fullName: string;
  email: string;
  username: string;
  age: number;
}

export default function User({
  avatarUrl,
  age,
  fullName,
  email,
  username,
}: UserProps) {
  return (
    <div className="w-4/5 bg-white mx-auto flex items-center gap-8 p-4">
      <img
        src="https://randomuser.me/api/portraits/women/96.jpg"
        alt={avatarUrl}
        className="h-24 w-24 rounded-full outline outline-2 outline-indigo-500 "
      />
      <div>
        <p className="font-semibold">{fullName}</p>
        <p>
          <span className="font-semibold">Idade: </span>
          {age}
        </p>
        <p>
          <span className="font-semibold">E-mail: </span>
          {email}
        </p>
        <p>
          <span className="font-semibold">Usuário: </span>
          {username}
        </p>
      </div>
    </div>
  );
}
