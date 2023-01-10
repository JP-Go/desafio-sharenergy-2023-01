import { useNavigate } from 'react-router-dom';
import { ButtonClickEvent } from '../pages/clients';
import { formatCpfString, formatPhoneString } from '../utils/formatters';

interface ClientTableRowProps {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  editClientHandle: (e: ButtonClickEvent, id: string) => void;
  deleteClientHandle: (e: ButtonClickEvent, id: string) => void;
}

export default function ClientTableRow({
  id,
  name,
  email,
  cpf,
  phone,
  editClientHandle,
  deleteClientHandle,
}: ClientTableRowProps) {
  const navigate = useNavigate();
  return (
    <tr
      onClick={() =>
        navigate(`/clients/${id}`, { replace: true, state: { id } })
      }
      className="group cursor-pointer text-center bg-white border font-normal transition-all duration-300"
    >
      <td className="py-2 group-hover:underline">{name}</td>
      <td className="py-2 group-hover:underline">{formatPhoneString(phone)}</td>
      <td className="py-2 group-hover:underline">{email}</td>
      <td className="py-2 group-hover:underline">{formatCpfString(cpf)}</td>
      <td className="py-4 flex gap-2">
        <button
          type="button"
          className="ml-auto bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg"
          onClick={(e) => editClientHandle(e, id)}
        >
          Editar
        </button>
        <button
          type="button"
          className="ml-auto bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
          onClick={(e) => {
            deleteClientHandle(e, id);
          }}
        >
          Apagar
        </button>
      </td>
    </tr>
  );
}
