import {
    FloderIcon, FileIcon
  } from "../Icons/Icons"

  export function generateIcon(code: string | undefined) {
    switch (code) {
      case 'folder':
        return <FloderIcon />
      case 'file':
        return <FileIcon />
      default:
        return <FileIcon />
    }
  }