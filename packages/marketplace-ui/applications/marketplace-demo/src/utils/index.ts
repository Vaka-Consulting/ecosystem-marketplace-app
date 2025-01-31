export const handleUnknownError = (error: Error | string) => {
  let newError = new Error('An error occurred while signing the transaction')

  if (typeof error === 'string') {
    newError = new Error(error as unknown as Error['message'])
  } else {
    newError = error as Error
  }

  return newError
}
