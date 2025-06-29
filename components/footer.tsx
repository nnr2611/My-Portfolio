import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="sticky z-40 w-full border-t py-8 md:py-12">
      <div className="container flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Anirudh Chidambaram. All rights reserved.</p>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="https://github.com/RootSlayr" target="_blank" rel="noopener, noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/anirudh-chida/" target="_blank" rel="noopener, noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://www.instagram.com/anirudhan.me?igsh=bjd2azg2eGNyejRs" target="_blank" rel="noopener, noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
