# Contributing to Lego Design System

Thank you for your interest in contributing to the Lego Design System! 🧱

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm 9+

### Setup

1. Clone the repository:
```bash
git clone https://github.com/KDRDesigns/Lego-.git
cd Lego-
```

2. Install dependencies:
```bash
npm install
```

3. Run type checking:
```bash
npm run typecheck
```

4. Build the project:
```bash
npm run build
```

### Importing from a Local/Desktop Copy

If you already have a local copy of the repository on your desktop or want to connect an existing local repository to GitHub:

1. **Navigate to your local repository**:
```bash
cd /path/to/your/Lego-
```

2. **Check existing remotes**:
```bash
git remote -v
```

3. **Add the remote if it doesn't exist**:
```bash
git remote add origin https://github.com/KDRDesigns/Lego-.git
```

Or if the remote exists but is incorrect:
```bash
git remote set-url origin https://github.com/KDRDesigns/Lego-.git
```

4. **Fetch the latest changes**:
```bash
git fetch origin
```

5. **Set up branch tracking**:
```bash
git branch --set-upstream-to=origin/main main
```

6. **Pull the latest changes** (if needed):
```bash
git pull origin main
```

7. **Install dependencies** (if not already done):
```bash
npm install
```

8. **Verify your setup**:
```bash
npm run typecheck
npm run build
```

## Development Workflow

### Making Changes

1. Create a new branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes in the `src/` directory

3. Type check your changes:
```bash
npm run typecheck
```

4. Build to ensure everything compiles:
```bash
npm run build
```

5. Test your changes (import and use in a test project)

### Development Mode

For faster iteration, use watch mode:
```bash
npm run dev
```

This will rebuild automatically when you save files.

## Code Standards

### TypeScript
- Use strict TypeScript types
- Avoid `any` types when possible
- Export all public types and interfaces
- Document complex types with JSDoc comments

### Components
- Follow existing component patterns
- Use consistent naming conventions
- Include accessibility features (ARIA labels, keyboard support)
- Support the `style` prop for customization
- Use the theme tokens for consistency

### Accessibility
- All components must meet WCAG AA standards
- Include proper ARIA attributes
- Ensure keyboard navigation works
- Test with screen readers when possible
- Provide accessible labels for interactive elements

### Documentation
- Update README.md for new components
- Add examples to EXAMPLES.md
- Include prop documentation with types
- Document breaking changes in CHANGELOG.md

## Component Guidelines

When adding a new component:

1. **Design Consistency**: Follow the Lego blocks aesthetic
   - Chunky borders (3px)
   - Rounded corners (14px radius)
   - Soft shadows
   - High contrast colors

2. **Accessibility First**:
   - Semantic HTML
   - ARIA labels and roles
   - Keyboard navigation
   - Focus indicators

3. **Flexibility**:
   - Support customization via props
   - Allow style overrides
   - Use tone system for colors
   - Make spacing configurable

4. **Type Safety**:
   - Full TypeScript types
   - Proper prop validation
   - Export component types

## Testing

Currently, the project uses manual testing. When adding components:

1. Test in a real React application
2. Test all interactive states (hover, focus, active, disabled)
3. Test keyboard navigation
4. Test with different props and variations
5. Verify TypeScript types work correctly

## Submitting Changes

1. Ensure all checks pass:
   - `npm run typecheck`
   - `npm run build`

2. Update documentation:
   - Add/update component docs in README.md
   - Add examples in EXAMPLES.md
   - Update CHANGELOG.md

3. Create a pull request:
   - Describe your changes clearly
   - Reference any related issues
   - Include screenshots for visual changes

## Design Principles

The Lego Design System follows these core principles:

1. **Playful & Fun**: Components should feel tactile and engaging
2. **Accessible**: Everyone should be able to use our components
3. **Consistent**: Follow established patterns and tokens
4. **Simple**: Easy to learn and use API
5. **Flexible**: Support customization without complexity

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Help others learn and grow

Thank you for contributing! 🎉
