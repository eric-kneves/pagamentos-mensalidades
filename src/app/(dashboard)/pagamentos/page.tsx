import Link from 'next/link'
export default function PagamentosPage() {
    return (
      <div className="max-w-4xl mx-auto">
        
        {/* Título e Botão */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Gestão de Pagamentos</h1>
          <Link href="/pagamentos/novo" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Novo Pagamento
          </Link>
        </div>
  
        {/* Tabela de Faturas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Faturas e Mensalidades</h2>
          
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 text-sm text-gray-600">
                <th className="p-4">Descrição</th>
                <th className="p-4">Valor</th>
                <th className="p-4">Vencimento</th>
                <th className="p-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {/* Linha Falsa para testar o visual */}
              <tr className="border-b border-gray-100">
                <td className="p-4">Mensalidade - Plano Base</td>
                <td className="p-4">R$ 49,90</td>
                <td className="p-4">10/10/2026</td>
                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Pendente
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
      </div>
    )
  }