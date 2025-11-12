# 🎓 EduKit Africa

<div align="center">
  <img src="src/assets/hero-image.jpg" alt="EduKit Africa" width="600"/>
  
  **Open Source African Tech Learning Platform**
  
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  
  [Report Bug](https://github.com/lewiii254/EduKit-Africa/issues) · [Request Feature](https://github.com/lewiii254/EduKit-Africa/issues)
</div>

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Usage](#usage)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## 🌍 About the Project

**EduKit Africa** is an open-source platform dedicated to curating and sharing high-quality learning resources in technology fields. Built by African developers for the global tech community, we believe education should be accessible to everyone.

### Our Mission

Empower African tech talent through open-source education by:
- 📚 Curating high-quality learning resources across multiple tech domains
- 🤝 Building a community-driven platform where knowledge is shared freely
- 🌟 Showcasing contributions from African developers and educators
- 🚀 Making tech education accessible to learners worldwide

---

## ✨ Features

### Core Functionality
- **🔐 User Authentication**: Secure email/password authentication with auto-confirm
- **📝 Resource Contribution**: Authenticated users can submit learning resources
- **⭐ Ratings & Reviews**: Rate resources (1-5 stars) and leave comments
- **🔍 Advanced Search & Filtering**: Search by title, tags; filter by category and difficulty
- **🔄 Smart Sorting**: Sort resources by newest, oldest, popularity, or rating
- **📊 Category Organization**: 8 main tech categories with dedicated track pages
- **👤 User Profiles**: Automatic profile creation with username and avatar support
- **📱 Responsive Design**: Mobile-first approach with beautiful UI
- **📖 Bookmarks System**: Save favorite resources for later reference
- **📊 User Dashboard**: Track your contributions, bookmarks, and statistics
- **📄 Pagination**: Browse resources efficiently with 12 items per page
- **💾 Export Bookmarks**: Export your saved resources in JSON, CSV, or Markdown format
- **♿ Accessibility**: Skip navigation links, ARIA labels, and enhanced keyboard navigation
- **👁️ View Tracking**: See how many times resources have been viewed

### Categories Covered
- Computer Science
- Web Development
- Cloud Computing
- Blockchain & Web3
- AI/ML & Data Science
- Mobile Development
- DevOps
- Cybersecurity

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Sonner** - Toast notifications

### Backend (Supabase)
- **PostgreSQL** - Relational database
- **Supabase Auth** - Authentication system
- **Row Level Security (RLS)** - Database security policies
- **Supabase Realtime** - Real-time subscriptions (ready to use)

### Developer Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Lucide React** - Icon library

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** or **bun**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/edukit-africa.git
   cd edukit-africa
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
   VITE_SUPABASE_PROJECT_ID=your_project_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:8080`

5. **Seed the database with sample resources** (optional but recommended):
   - Navigate to `/seed` in your browser
   - Click "Seed Database" to populate with 80+ curated learning resources
   - Or run the seed function programmatically in your code

5. **Build for production**
   ```bash
   npm run build
   ```

---

## 🗄️ Database Schema

### Tables

#### **profiles**
Stores user profile information
```sql
- id: UUID (Primary Key, references auth.users)
- username: TEXT (Unique, Not Null)
- avatar_url: TEXT
- created_at: TIMESTAMPTZ
```

#### **resources**
Stores learning resources submitted by users
```sql
- id: UUID (Primary Key)
- title: TEXT (Not Null)
- description: TEXT (Not Null)
- link: TEXT (Not Null)
- category: TEXT (Not Null)
- difficulty: TEXT (Beginner/Intermediate/Advanced)
- tags: TEXT[] (Array of tags)
- contributor_id: UUID (Foreign Key -> profiles.id)
- view_count: INTEGER (Default 0)
- created_at: TIMESTAMPTZ
```

#### **ratings**
Stores user ratings and reviews for resources
```sql
- id: UUID (Primary Key)
- resource_id: UUID (Foreign Key -> resources.id)
- user_id: UUID (Foreign Key -> profiles.id)
- rating: INTEGER (1-5, Not Null)
- comment: TEXT (Optional)
- created_at: TIMESTAMPTZ
- UNIQUE constraint on (resource_id, user_id)
```

#### **bookmarks**
Stores user bookmarks for resources
```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> profiles.id)
- resource_id: UUID (Foreign Key -> resources.id)
- created_at: TIMESTAMPTZ
- UNIQUE constraint on (user_id, resource_id)
```

#### **resource_views**
Tracks resource views for analytics
```sql
- id: UUID (Primary Key)
- resource_id: UUID (Foreign Key -> resources.id)
- user_id: UUID (Foreign Key -> profiles.id, nullable)
- viewed_at: TIMESTAMPTZ
```

### Row Level Security (RLS) Policies

All tables have RLS enabled with the following policies:
- **SELECT**: Public read access
- **INSERT**: Authenticated users can create their own records
- **UPDATE**: Users can update their own records
- **DELETE**: Users can delete their own records

---

## 💻 Usage

### For Learners
1. Browse resources on the [Tracks page](/tracks)
2. Use search, filters, and sorting to find relevant content
3. Sign up to access advanced features:
   - Rate and review resources
   - Bookmark favorite resources
   - View your personalized dashboard
4. Export your bookmarks in JSON, CSV, or Markdown format

### Using the Dashboard
1. Navigate to [Dashboard](/dashboard) after signing in
2. View your statistics:
   - Total contributions made
   - Total bookmarks saved
   - Ratings given and average rating
3. Manage your contributions and bookmarks
4. Export bookmarks for offline access

### For Contributors
1. [Sign up](/auth) for an account
2. Navigate to [Contribute](/contribute)
3. Fill in resource details:
   - Title (min 5 chars)
   - Description (min 20 chars)
   - Valid URL
   - Category and difficulty level
   - Optional tags
4. Submit and share with the community!

### Rating Resources
1. Sign in to your account
2. Click the star icon on any resource card
3. Select rating (1-5 stars)
4. Optionally add a comment
5. Submit your review

---

## 🤝 Contributing

We love contributions! EduKit Africa is built by the community, for the community.

### How to Contribute

#### 1. **Report Bugs**
- Use GitHub Issues to report bugs
- Include detailed reproduction steps
- Add screenshots if applicable

#### 2. **Suggest Features**
- Open a GitHub Issue with the `enhancement` label
- Describe the feature and its benefits
- Discuss implementation approach

#### 3. **Submit Code**

**Step-by-step guide:**

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/edukit-africa.git
   cd edukit-africa
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Follow the existing code style
   - Write clean, readable code
   - Add comments for complex logic
   - Update documentation if needed

5. **Test your changes**
   ```bash
   npm run dev
   # Test thoroughly in the browser
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```
   
   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Formatting
   - `refactor:` Code restructuring
   - `test:` Adding tests
   - `chore:` Maintenance

7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

8. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template
   - Wait for review

#### 4. **Share Resources**
The easiest way to contribute is by sharing quality learning resources through the platform itself!

### Development Guidelines

#### Code Style
- Use TypeScript for type safety
- Follow existing code patterns
- Use semantic HTML elements
- Prefer functional components with hooks
- Keep components small and focused

#### Component Structure
```typescript
// 1. Imports
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
}

// 3. Component
export function MyComponent({ title }: MyComponentProps) {
  // 4. State and hooks
  const [count, setCount] = useState(0);
  
  // 5. Event handlers
  const handleClick = () => setCount(count + 1);
  
  // 6. Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Count: {count}</Button>
    </div>
  );
}
```

#### Styling Guidelines
- Use Tailwind CSS utility classes
- Leverage design system tokens from `index.css`
- Use semantic color variables (primary, secondary, muted, etc.)
- Never use direct colors like `text-white` or `bg-black`
- Ensure responsive design with mobile-first approach

#### Database Changes
If your contribution requires database changes:
1. Document the schema changes in your PR
2. Provide migration SQL scripts
3. Update RLS policies if needed
4. Test with different user roles

### What We're Looking For

**High Priority:**
- 🐛 Bug fixes
- 📚 Documentation improvements
- ♿ Accessibility enhancements
- 🌐 Internationalization (i18n)
- ✅ Test coverage

**Feature Ideas:**
- 📌 Bookmarking system
- 👥 User profile pages
- 🔔 Notification system
- 📊 Analytics dashboard
- 🎯 Learning paths/roadmaps
- 💬 Discussion forums
- 🏆 Gamification elements

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive experience for everyone. We pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what's best for the community
- Showing empathy towards community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

```
MIT License

Copyright (c) 2024 EduKit Africa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact

- **GitHub**: [EduKit Africa Repository](https://github.com/lewiii254/EduKit-Africa)
- **Twitter**: [@EdukitAfrica](https://twitter.com/edukitafrica)
- **Email**: contact@edukitafrica.org

---

## 🙏 Acknowledgments

- Powered by [Supabase](https://supabase.com) - Open source Firebase alternative
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Inspired by the vibrant African tech community

---

## 🌟 Star History

If you find this project useful, please consider giving it a star ⭐

---

<div align="center">
  
  **Made with ❤️ in Africa by the Open Source Community**
  
  [⬆ Back to Top](#-edukit-africa)
  
</div>
