import { NextResponse } from 'next/server'
import { noteHandler } from '@/lib/db-handler'
import { deleteTempDir, uploadFile } from '@/lib/file-handler'

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const type = formData.get('type')
    const files = formData.getAll('files') as File[]

    if (await noteHandler.isExist(name)) throw new Error('Note already exists')

    for (const file of files) await uploadFile(file)
    // await deleteTempDir()

    const { id } = await noteHandler.create({ name })

    return NextResponse.json('success')
  } catch (err) {
    console.log('[Examor POST] Error: ', err)
    return new NextResponse(err as string, { status: 500 })
  }
}
