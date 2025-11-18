import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 glass mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            © 2024 AuraSwap. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
