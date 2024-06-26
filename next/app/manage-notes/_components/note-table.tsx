'use client'

import { memo } from 'react'
import { Settings } from 'lucide-react'
import { format } from 'date-fns'
import type { TNote } from '@prisma/client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MdiIcon } from '@/components/mdi-icon'

interface NoteTableProps {
  notes: TNote[]
  onSettingClick: (note: TNote) => void
}

export const NoteTable = memo((props: NoteTableProps) => {
  const { notes, onSettingClick } = props

  const handleClickSetting = (note: TNote) => {
    onSettingClick(note)
  }

  if (notes.length === 0)
    return (
      <section>
        <div className="flex items-center justify-center flex-col">
          <Image
            src="/images/empty-dark.svg"
            alt="Empty"
            width={200}
            height={200}
          />

          <p className="mt-6 text-center text-muted-foreground">
            No notes found, you can go <Link href={'/add-new'}>here</Link> to
            add new note
          </p>
        </div>
      </section>
    )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Create Date</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {notes.map((note) => (
          <TableRow key={note.id}>
            {/* Note Name */}
            <TableCell className="font-medium">
              <div className="flex items-center">
                <MdiIcon icon={note.icon} size="1.5rem" className="mr-2" />
                {note.name}
              </div>
            </TableCell>

            {/* Node Create Date */}
            <TableCell className="text-right">
              {format(note.uploadDate, 'yyyy-MM-dd')}
            </TableCell>

            {/* Hanlders */}
            <TableCell className="text-right w-[50px]">
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => handleClickSetting(note)}>
                <Settings size={20} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
})

NoteTable.displayName = 'NoteTable'
