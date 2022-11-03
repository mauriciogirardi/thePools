import { GetServerSideProps } from 'next'
import { toast } from 'react-toastify'
import { api } from '../services/api'
import bannerImg from '../assets/app-nlw-copa-preview.png'
import usersAvatarImg from '../assets/users-avatar-example.png'
import iconCheck from '../assets/icon-check.svg'
import logoImg from '../assets/logo.svg'
import Image from 'next/image'
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number
  guessCount: number
  userCount: number
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [namePool, setNamePool] = useState('')

  const createPool = async (evt: FormEvent) => {
    evt.preventDefault()
    try {
      const { data } = await api.post('/pools', { title: namePool })

      const { code, title } = data

      await navigator.clipboard.writeText(code)

      toast(
        `Seu bolão ${title} foi criado com sucesso, o código ${code} foi copiado para a área de transferência!`,
        {
          type: 'success',
          role: 'alert',
          position: 'top-right',
          closeOnClick: true,
          hideProgressBar: false,
        }
      )

      setNamePool('')
    } catch (err) {
      console.error(err)
      toast('Falha ao criar o bolão, tente novamente!', {
        type: 'error',
        role: 'alert',
        position: 'top-right',
        closeOnClick: true,
        hideProgressBar: false,
      })
    }
  }

  return (
    <div className="max-w-[1124px] gap-28 mx-auto px-2 grid grid-cols-2 items-center justify-center h-screen">
      <main>
        <Image alt="nlw copa" src={logoImg} />
        <h1 className="mt-14 text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image alt="" src={usersAvatarImg} />
          <strong className="text-gray-100 text-xl">
            <span className="text-green-500 ">+{userCount} </span>
            pessoas já estão usando
          </strong>
        </div>

        <form className="mt-10 flex items-center gap-1" onSubmit={createPool}>
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 text-sm border border-gray-600"
            placeholder="Qual nome do seu bolão?"
            value={namePool}
            onChange={(e) => setNamePool(e.target.value)}
            required
          />
          <button
            className=" bg-yellow-500 rounded  px-6 py-4 text-gray-900 font-bold text-sm hover:bg-yellow-400"
            type="submit"
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className="text-gray-300 mt-4 text-sm w-96 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image alt="" src={iconCheck} />
              <div className="flex flex-col">
                <span className="font-bold text-xl">+{poolCount}</span>
                <span className="text-sm">Bolões criados</span>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-gray-600" />
            <div className="flex items-center gap-2">
              <Image alt="" src={iconCheck} />
              <div className="flex flex-col">
                <span className="font-bold text-xl">+{guessCount}</span>
                <span className="text-sm">Palpites enviados</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Image
        alt="Dois celulares exibindo uma prévia da aplicação mobile"
        src={bannerImg}
        quality={100}
      />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get('/pools/count'),
      api.get('/guesses/count'),
      api.get('/users/count'),
    ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  }
}
