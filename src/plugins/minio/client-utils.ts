export const uploadFileMinio = async (url: string, file: File) => {
  const res = await fetch(url, {
    method: 'PUT',
    body: file
  })

  if (!res.ok) {
    throw new Error('Failed to upload file')
  }

  return res
}
