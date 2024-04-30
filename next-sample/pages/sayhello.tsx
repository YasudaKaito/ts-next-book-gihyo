import { useState, useEffect } from 'react'

function SayHello() {
  const [data, setData] = useState({ name: '' })

  useEffect(() => {
    fetch('api/hello')
      .then((res) => res.json())
      .then((profile) => {
        setData(profile)
      })
    // 初回描画時に実行
  }, [])

  return <div>hello {data.name}</div>
}

export default SayHello
