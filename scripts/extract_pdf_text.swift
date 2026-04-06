import Foundation
import PDFKit

func usage() {
    let message = """
    Usage:
      swift extract_pdf_text.swift <input-pdf>
    """
    fputs(message + "\n", stderr)
}

guard CommandLine.arguments.count >= 2 else {
    usage()
    exit(2)
}

let inputPath = CommandLine.arguments[1]
let url = URL(fileURLWithPath: inputPath)

guard let pdf = PDFDocument(url: url) else {
    fputs("Failed to open PDF: \(inputPath)\n", stderr)
    exit(1)
}

for index in 0..<pdf.pageCount {
    guard let page = pdf.page(at: index) else {
        continue
    }
    let header = "===== PAGE \(index + 1) =====\n"
    let text = page.string ?? ""
    print(header + text)
}
