import { useRouteError } from 'react-router-dom'

const RouteErrorBoundary = () => {
  const error = useRouteError()

  const getErrorMessage = (err: unknown): string => {
    if (!err) return 'Unexpected error occurred'
    if (typeof err === 'string') return err
    if (err instanceof Error) return err.message
    if (typeof err === 'object' && err !== null && 'message' in err) {
      const msg = (err as { message?: unknown }).message
      return typeof msg === 'string' ? msg : String(msg)
    }
    return 'Unexpected error occurred'
  }

  return (
    <div className='p-10 text-center'>
      <h1 className='text-2xl font-bold'>Something went wrong 😢</h1>
      <p className='mt-4 text-gray-600'>{getErrorMessage(error)}</p>
    </div>
  )
}

export default RouteErrorBoundary
