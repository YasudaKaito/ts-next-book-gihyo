import type { ApiContext, User } from 'types'
import { fetcher } from 'utils'

export type GetUserParams = {
  /** ユーザID */
  id: number
}

const getUser = async (
  context: ApiContext,
  {id} : GetUserParams
): Promise<User> => {
  /**
   * サンプル
  "id": 1,
  "username": "taketo",
  "displayName": "Taketo Yoshida",
  "email": "taketo@example.com",
  "profileImageUrl": "/users/1.png",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
  }
  */
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
}

export default getUser
