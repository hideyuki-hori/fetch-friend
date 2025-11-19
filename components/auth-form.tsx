import { useState } from 'react'
import { signIn, signUp } from '~/lib/auth-client'

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isSignUp) {
        await signUp.email({
          email,
          password,
          name,
        })
      } else {
        await signIn.email({
          email,
          password,
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '認証エラーが発生しました')
    }
  }

  return (
    <div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>
        {isSignUp ? 'アカウント作成' : 'ログイン'}
      </h2>
      
      <form onSubmit={handleSubmit} className='space-y-4'>
        {isSignUp && (
          <div>
            <label htmlFor='name' className='block text-sm font-medium mb-1'>
              名前
            </label>
            <input
              id='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full px-3 py-2 border rounded-md'
              required={isSignUp}
            />
          </div>
        )}
        
        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>
            メールアドレス
          </label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
            required
          />
        </div>
        
        <div>
          <label htmlFor='password' className='block text-sm font-medium mb-1'>
            パスワード
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded-md'
            required
          />
        </div>
        
        {error && (
          <div className='text-red-600 text-sm'>{error}</div>
        )}
        
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'
        >
          {isSignUp ? 'アカウント作成' : 'ログイン'}
        </button>
      </form>
      
      <button
        type='button'
        onClick={() => setIsSignUp(!isSignUp)}
        className='w-full mt-4 text-sm text-blue-600 hover:underline'
      >
        {isSignUp
          ? 'すでにアカウントをお持ちの方はこちら'
          : 'アカウントを作成する'}
      </button>
    </div>
  )
}