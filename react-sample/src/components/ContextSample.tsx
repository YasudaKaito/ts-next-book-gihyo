import React from 'react'

const titleContext = React.createContext('')

const Title = () => {
  return (
    <titleContext.Consumer>{(title) => <h1>{title}</h1>}</titleContext.Consumer>
  )
}

const Header = () => {
  return (
    <div>
      {/* Header から Title へは何も渡さない */}
      <Title />
    </div>
  )
}

// Page からContextに値を渡す
const Page = () => {
  const title = 'React Book'

  // Provider以下のコンポーネントから値を参照できる
  return (
    <titleContext.Provider value={title}>
      <Header />
    </titleContext.Provider>
  )
}

export default Page
