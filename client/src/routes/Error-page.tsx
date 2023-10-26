import React from 'react'
import { useRouteError } from 'react-router-dom'
import { ErrorResponse } from '@remix-run/router/utils.ts'

const ErrorPage: React.FC = () => {
  const error = useRouteError() as ErrorResponse

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div id="error-page" className="flex flex-col gap-3 border shadow:lg m-5 p-5 items-center justify-center">
        <h1 className="font-bold underline text-xl">Oops!</h1>
        <p>An unexpected error has occurred.</p>
        <p>This is a developer view only. Replace it in future!</p>
        <p>
          <i>
            {error.status} {error.statusText} + {error?.error?.message}
          </i>
        </p>
      </div>
    </div>
  )
}

export default ErrorPage
