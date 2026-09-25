export default function PerfilPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">O Meu Perfil</h1>
        <p className="text-gray-500 mt-2">Gira as suas informações pessoais e preferências de conta.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cabeçalho do Perfil (Foto e Nome) */}
        <div className="bg-blue-50 px-8 py-6 flex items-center gap-6 border-b border-blue-100">
          <div className="h-24 w-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
            EH
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Erick Henrique</h2>
            <p className="text-blue-600 font-medium">Estudante de Análise e Desenvolvimento</p>
            <p className="text-gray-500 text-sm mt-1">Membro desde Agosto de 2026</p>
          </div>
        </div>

        {/* Formulário de Dados */}
        <div className="p-8">
          <form className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Informações Pessoais</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  defaultValue="Erick Henrique Rodrigues Neves"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                <input 
                  type="date" 
                  defaultValue="1999-08-17"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700" 
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue="erick@exemplo.com"
                  disabled
                  className="w-full border border-gray-200 p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" 
                />
                <p className="text-xs text-gray-400 mt-1">O email não pode ser alterado por motivos de segurança.</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mt-8 mb-4">Endereço</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Morada</label>
                <input 
                  type="text" 
                  placeholder="Rua, Número, Bairro"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                <input 
                  type="text" 
                  defaultValue="Curitiba"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado / Região</label>
                <input 
                  type="text" 
                  defaultValue="Paraná"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700" 
                />
              </div>
            </div>

            <div className="pt-6 mt-6 border-t flex justify-end">
              <button 
                type="button" 
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Guardar Alterações
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}