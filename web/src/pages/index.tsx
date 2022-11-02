import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { api } from '../services/api'

interface HomeProps {
  count: number
}

export default function Home({ count }: HomeProps) {
  return (
    <div>
      <h1>Count: {count}</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get('/pools/count')

  return {
    props: {
      count: data.count,
    },
  }
}
