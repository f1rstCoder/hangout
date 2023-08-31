import { useEffect, useState } from 'react'
import { getAxios } from '../lib/DefineAxiosGet';

const useFetchUserData = id => {
  const [data, setData] = useState('')

  useEffect(() => {
    if (!id) return
    getAxios(`http://localhost:3030/users/${id}`)
      .then(res => {
        if (res.length === 0) {
          return
        } else {
          setData(res)
        }
      })
      .catch(err => console.error(err))
  }, [id])

  return { data }
}

export default useFetchUserData;
