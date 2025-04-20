# Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and shadcn/ui components. This portfolio features:

- Documentation-style layout with a sidebar navigation
- Dark/light theme support
- Interactive skill visualizations using D3.js and Recharts
- GitHub repository integration
- Publications section
- Contact form
- Like widget for visitor engagement

## Features

- **Modern UI**: Clean, documentation-style interface with responsive design
- **Interactive Charts**: Visualize skills with various chart types
- **GitHub Integration**: Display your latest repositories
- **Dark/Light Mode**: Toggle between dark and light themes
- **Responsive Design**: Looks great on all devices
- **Static Export**: Optimized for GitHub Pages deployment

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To build the site for GitHub Pages:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

The static site will be generated in the `out` directory.

## Deployment

### GitHub Pages

This portfolio is optimized for GitHub Pages deployment. You can use the included GitHub Actions workflow to automatically deploy your site when you push to the main branch.

1. In your GitHub repository, go to Settings > Pages
2. Set the source to "GitHub Actions"
3. Push to the main branch to trigger the deployment

## Customization

To customize the portfolio for your own use:

1. Update the personal data in `lib/data.ts`
2. Replace the resume PDF in `public/resume.pdf`
3. Modify the theme colors in `app/globals.css`
4. Add your own projects and publications

## License

This project is licensed under the MIT License - see the LICENSE file for details.
