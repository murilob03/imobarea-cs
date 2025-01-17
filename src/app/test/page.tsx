'use client'

import { ImovelCriar } from '@/types/imovel'
import { Endereco } from '@/types/endereco'
import { useState } from 'react'

export default function TestaCriaImovel() {
  const [rodou, setRodou] = useState(false)

  const endereco: Endereco = {
    cep: '12345-678',
    logradouro: 'Rua das Flores',
    numero: '123',
    bairro: 'Centro',
    complemento: 'Casa',
    cidade: 'São Paulo',
    estado: 'SP',
  }

  const novoImovel: ImovelCriar = {
    nome: 'Casa do João',
    areaPrivada: 100,
    numQuartos: 2,
    numVagas: 1,
    tipo: 'Casa',

    endereco: endereco,

    imobiliariaId: 'd59cc414-dba9-4227-9062-6e28101f93ef',
    agenteId: null,
  }

  if (!rodou) {
    fetch('/api/imoveis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoImovel),
    }).then((response) => {
      console.log('response', response)
      setRodou(true)
    })
  }

  return <div>Check console for response</div>
}
