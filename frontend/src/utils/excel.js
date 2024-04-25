import * as XLSX from 'xlsx'

export const convertToExcel = (data) => {
  const workbook = XLSX.utils.book_new()

  if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
    const worksheet = XLSX.utils.aoa_to_sheet(data)

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte')

    return workbook
  } else {
    throw new Error('Datos no están en el formato correcto para convertir a Excel')
  }
}

export const downloadExcel = (filename, workbook) => {
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
