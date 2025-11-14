
# Contributing to EduKit Africa

First off, thank you for considering contributing to EduKit Africa! 🎉 It's people like you that make EduKit Africa such a great platform for learning.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please read the full text in [README.md](README.md#code-of-conduct).

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Set up the development environment** following the [README](README.md#installation)
4. **Create a branch** for your changes
5. **Make your changes**
6. **Test thoroughly**
7. **Submit a pull request**

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Browser and OS** information
- **Console errors** if any

**Example Bug Report:**
```markdown
**Title:** Rating dialog not closing after submission

**Description:** When I submit a rating, the dialog stays open instead of closing automatically.

**Steps to Reproduce:**
1. Sign in to account
2. Click star icon on any resource
3. Select rating and submit
4. Dialog remains open

**Expected:** Dialog should close after successful submission
**Actual:** Dialog stays open

**Browser:** Chrome 120.0
**OS:** Windows 11
```

### 💡 Suggesting Features

Feature suggestions are welcome! Please provide:

- **Clear use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives considered** - Other approaches you thought about
- **Impact** - Who will benefit from this?

### 📝 Contributing Code

#### Good First Issues

Look for issues labeled `good-first-issue` - these are perfect for newcomers!

#### What to Work On

**High Priority:**
- Bug fixes
- Documentation improvements
- Accessibility enhancements
- Performance optimizations
- Test coverage

**Feature Development:**
- User profile pages
- Bookmarking system
- Advanced search
- Learning paths
- Social features

### 📚 Contributing Resources

The easiest way to contribute is by sharing quality learning resources:

1. Sign up on the platform
2. Navigate to [Contribute](/contribute)
3. Fill in resource details
4. Submit!

**Quality Guidelines for Resources:**
- Must be freely accessible or have a free tier
- Content should be up-to-date
- Clear learning objectives
- Appropriate for the selected difficulty level
- Well-structured and comprehensive

---

## Development Workflow

### 1. Set Up Your Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/edukit-africa.git
cd edukit-africa

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

**Branch Naming Convention:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

### 3. Make Your Changes

Follow the [Style Guidelines](#style-guidelines) below.

### 4. Test Your Changes

```bash
# Run type checking
npm run typecheck

# Test in browser
npm run dev
# Navigate to http://localhost:8080
```

**Testing Checklist:**
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile devices
- [ ] Works in different browsers
- [ ] No TypeScript errors
- [ ] Authentication states handled correctly
- [ ] Loading states work properly
- [ ] Error states handled gracefully

### 5. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing feature"
```

See [Commit Messages](#commit-messages) for guidelines.

### 6. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

---

## Style Guidelines

### TypeScript/React

#### Component Structure

```typescript
// 1. Imports - external libraries first, then internal
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

// 2. Types and interfaces
interface ResourceCardProps {
  resource: Resource;
  onUpdate?: () => void;
}

// 3. Component definition
export function ResourceCard({ resource, onUpdate }: ResourceCardProps) {
  // 4. Hooks
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, []);
  
  // 6. Event handlers
  const handleClick = async () => {
    setLoading(true);
    // Handler logic
    setLoading(false);
  };
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

#### Best Practices

**DO:**
- ✅ Use functional components with hooks
- ✅ Use TypeScript for type safety
- ✅ Keep components small and focused
- ✅ Extract reusable logic into custom hooks
- ✅ Use proper error handling
- ✅ Add loading states for async operations
- ✅ Use semantic HTML elements

**DON'T:**
- ❌ Use `any` type (use `unknown` if needed)
- ❌ Create large monolithic components
- ❌ Forget error handling
- ❌ Use inline styles
- ❌ Ignore accessibility
- ❌ Hardcode values that should be configurable

### CSS/Styling

#### Tailwind CSS Guidelines

**DO:**
```tsx
// ✅ Use design system tokens
<Button variant="primary">Submit</Button>
<div className="bg-background text-foreground">

// ✅ Use semantic color classes
<div className="text-muted-foreground">

// ✅ Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

**DON'T:**
```tsx
// ❌ Direct color values
<div className="text-white bg-black">

// ❌ Fixed pixel values for breakpoints
<div style={{ width: '768px' }}>

// ❌ Inline styles
<div style={{ color: 'red' }}>
```

#### Design System

Always use tokens from `src/index.css`:
- `--background`, `--foreground`
- `--primary`, `--primary-foreground`
- `--secondary`, `--secondary-foreground`
- `--muted`, `--muted-foreground`
- `--accent`, `--accent-foreground`
- `--border`, `--input`, `--ring`

### File Organization

```
src/
├── components/
│   ├── ui/              # shadcn components
│   ├── Navigation.tsx   # Shared components
│   └── ResourceCard.tsx
├── contexts/            # React contexts
│   └── AuthContext.tsx
├── pages/              # Route pages
│   ├── Index.tsx
│   └── Auth.tsx
├── hooks/              # Custom hooks
│   └── use-mobile.tsx
├── lib/                # Utilities
│   └── utils.ts
└── integrations/       # External integrations
    └── supabase/
```

### Database Guidelines

When contributing database changes:

#### 1. Create Migration SQL

```sql
-- Add new column
ALTER TABLE resources 
ADD COLUMN view_count INTEGER DEFAULT 0;

-- Create index
CREATE INDEX idx_resources_view_count 
ON resources(view_count DESC);

-- Update RLS policy if needed
CREATE POLICY "Users can view published resources"
ON resources FOR SELECT
USING (published = true OR auth.uid() = contributor_id);
```

#### 2. Document in PR

Include:
- Schema changes
- Migration script
- Rollback instructions
- Impact on existing data

#### 3. Security First

- Always enable RLS on new tables
- Create appropriate policies
- Never expose sensitive data
- Test with different user roles

---

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Code style (formatting, no logic change)
- `refactor:` Code restructuring
- `perf:` Performance improvement
- `test:` Adding tests
- `chore:` Maintenance tasks

### Examples

**Simple commit:**
```
feat: add bookmark functionality
```

**With scope:**
```
fix(auth): resolve token refresh issue
```

**With body:**
```
feat: implement user profiles

Add user profile pages showing:
- User information
- Contributed resources
- Activity statistics

Closes #123
```

**Breaking change:**
```
feat!: change resource schema

BREAKING CHANGE: Resources now require category_id instead of category name.
Migration script provided in migrations/002_category_refactor.sql
```

### Commit Message Guidelines

**DO:**
- ✅ Use imperative mood ("add" not "added")
- ✅ Keep subject line under 50 characters
- ✅ Capitalize subject line
- ✅ No period at the end of subject
- ✅ Reference issues/PRs in body

**DON'T:**
- ❌ Vague messages like "fix stuff"
- ❌ Multiple unrelated changes in one commit
- ❌ Mixing feature and formatting changes

---

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on mobile and desktop
- [ ] TypeScript types are correct
- [ ] No linting errors

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Tested thoroughly
- [ ] Documentation updated
```

### Review Process

1. **Automated Checks** - Must pass before review
2. **Code Review** - At least one maintainer approval
3. **Testing** - Manual testing by reviewers
4. **Merge** - Squash and merge to main

### After Merge

- Your contribution will be included in the next release
- You'll be added to the contributors list
- Thank you for making EduKit Africa better! 🎉

---

## Questions?

- Open an issue with the `question` label
- Reach out on [Twitter](https://x.com/LewiiiTheG)
- Email: ngondimarklewis@gmail.com

---

## Recognition

All contributors will be recognized in:
- GitHub contributors page
- Release notes
- Project website (coming soon)

---

**Thank you for contributing to EduKit Africa! Together, we're making tech education accessible to everyone.** ❤️
