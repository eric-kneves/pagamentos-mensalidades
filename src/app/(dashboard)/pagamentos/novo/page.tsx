import Link from 'next/link'

export default function NovoPagamentoPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Registar Novo Pagamento</h1>
        <Link href="/pagamentos" className="text-gray-500 hover:text-gray-700 font-medium">
          Voltar
        </Link>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
          <input 
            type="text" 
            placeholder="Ex: Mensalidade - Plano Premium" 
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
            <input 
              type="number" 
              step="0.01" 
              placeholder="0.00" 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data de Vencimento</label>
            <input 
              type="date" 
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="PENDENTE">Pendente</option>
            <option value="PAGO">Pago</option>
          </select>
        </div>

        <button 
          type="button" 
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-4"
        >
          Guardar Pagamento
        </button>
      </form>
    </div>
  )
}