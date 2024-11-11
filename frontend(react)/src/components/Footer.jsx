import { Facebook, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800">
      <div className="container mx-auto py-8">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-red-500 transition-colors">
            <Facebook className="h-6 w-6"/>
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            <Instagram className="h-6 w-6"/>
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            <Mail className="h-6 w-6"/>
          </a>
        </div>
        <div className="text-center py-4 bg-gray-50">
          @ 2024 Copyright: SOSDoc.com
        </div>
      </div>
    </footer>
  )
}