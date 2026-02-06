# @kdrdesigns/lego 🧱

A playful React component library inspired by Lego blocks. Features a chunky, tactile design with high contrast, rounded corners, and delightful interactions.

## ✨ Features

- **🎨 Playful Design**: Chunky borders, rounded corners, and soft shadows
- **♿ Accessible**: WCAG AA compliant with semantic HTML and ARIA support
- **⚡ TypeScript**: Full type safety and IntelliSense support
- **🎯 Simple API**: Intuitive component props and composition
- **🧩 Modular**: Import only what you need
- **📱 Responsive**: Works great on all device sizes

## 📦 Installation

```bash
npm install @kdrdesigns/lego
```

```bash
yarn add @kdrdesigns/lego
```

```bash
pnpm add @kdrdesigns/lego
```

## 🚀 Quick Start

```tsx
import { Button, Card, Input, Stack } from '@kdrdesigns/lego';

function App() {
  return (
    <Card title="Welcome" tone="brand">
      <Stack gap={12}>
        <Input label="Email" type="email" required />
        <Button tone="success">Sign Up</Button>
      </Stack>
    </Card>
  );
}
```

## 📚 Components

### Layout Components

#### `Box`
A versatile container component with Lego styling.

```tsx
<Box tone="neutral" padding={16}>
  Content here
</Box>
```

**Props:**
- `tone`: `"neutral" | "brand" | "success" | "warning" | "danger"` - Color theme
- `padding`: `number` - Internal padding
- `as`: HTML element type (default: `"div"`)

#### `Stack`
Vertical layout with consistent spacing.

```tsx
<Stack gap={12} align="center">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

**Props:**
- `gap`: `number` - Space between items
- `align`: CSS `alignItems` value

#### `Inline`
Horizontal layout with wrapping support.

```tsx
<Inline gap={10} wrap={true}>
  <Badge tone="brand">New</Badge>
  <Badge tone="success">Popular</Badge>
</Inline>
```

**Props:**
- `gap`: `number` - Space between items
- `align`: CSS `alignItems` value
- `wrap`: `boolean` - Enable wrapping

### Typography

#### `Text`
Flexible text component with customizable styling.

```tsx
<Text as="h1" size={24} weight={900}>
  Hello World
</Text>
```

**Props:**
- `as`: HTML element type (default: `"p"`)
- `size`: `number` - Font size in pixels
- `weight`: `number` - Font weight

### Interactive Components

#### `Button`
Primary action button with press animation.

```tsx
<Button tone="brand" size="md" onClick={handleClick}>
  Click Me
</Button>
```

**Props:**
- `tone`: Color theme
- `size`: `"sm" | "md" | "lg"`
- `disabled`: Boolean

#### `IconButton`
Accessible icon-only button.

```tsx
<IconButton label="Delete item" tone="danger" onClick={handleDelete}>
  🗑️
</IconButton>
```

**Props:**
- `label`: `string` (required for accessibility)
- `tone`: Color theme
- `size`: `number` - Width and height
- `disabled`: Boolean

### Form Components

#### `Input`
Text input with label, description, and error support.

```tsx
<Input
  label="Username"
  description="Choose a unique username"
  error={errors.username}
  required
  onChange={handleChange}
/>
```

**Props:**
- `label`: `string` (required)
- `description`: `string` - Help text
- `error`: `string` - Error message
- `required`: Boolean
- `tone`: Color theme

#### `Textarea`
Multi-line text input.

```tsx
<Textarea
  label="Comments"
  rows={6}
  description="Share your thoughts"
/>
```

**Props:**
- `label`: `string` (required)
- `rows`: `number` - Initial height
- `description`: `string` - Help text
- `error`: `string` - Error message
- `required`: Boolean

#### `Toggle`
Accessible switch component.

```tsx
<Toggle
  label="Enable notifications"
  checked={enabled}
  onChange={setEnabled}
  toneOn="success"
/>
```

**Props:**
- `label`: `string` (required)
- `checked`: Boolean
- `onChange`: Callback function
- `toneOn`: Color when checked
- `toneOff`: Color when unchecked
- `disabled`: Boolean

### Content Components

#### `Card`
Content container with optional header.

```tsx
<Card 
  title="User Profile" 
  subtitle="Manage your account"
  tone="neutral"
>
  <Stack gap={12}>
    {/* Card content */}
  </Stack>
</Card>
```

**Props:**
- `title`: `string` - Card header
- `subtitle`: `string` - Secondary text
- `tone`: Color theme

#### `Badge`
Small status or label indicator.

```tsx
<Badge tone="success">Active</Badge>
<Badge tone="warning">Pending</Badge>
```

**Props:**
- `tone`: Color theme

#### `Modal`
Accessible dialog overlay.

```tsx
<Modal 
  open={isOpen} 
  title="Confirm Action"
  onClose={() => setIsOpen(false)}
>
  <Stack gap={16}>
    <Text>Are you sure you want to continue?</Text>
    <Inline gap={12}>
      <Button tone="danger" onClick={handleConfirm}>Confirm</Button>
      <Button tone="neutral" onClick={() => setIsOpen(false)}>Cancel</Button>
    </Inline>
  </Stack>
</Modal>
```

**Props:**
- `open`: Boolean - Visibility state
- `title`: `string` (required)
- `onClose`: Callback function
- `tone`: Color theme

### Compositions

#### `SkillsDashboard`
A ready-made dashboard composition built from the primitives (`Card`, `Stack`, `Inline`, `Input`, `Toggle`, `Modal`, etc.) following the `BUILD SKILL.md` typography and spacing guidelines.

```tsx
import { SkillsDashboard } from '@kdrdesigns/lego';

export function App() {
  return <SkillsDashboard />;
}
```

## 🎨 Design Tokens

### Color Tones
- **neutral**: Light gray background
- **brand**: Blue for primary actions
- **success**: Green for positive feedback
- **warning**: Yellow for cautions
- **danger**: Red for destructive actions

### Theme Values
```tsx
{
  radius: 14,           // Border radius
  border: 3,            // Border width
  shadow: "0 6px 0 rgba(0,0,0,0.20)",
  focusRing: "0 0 0 4px rgba(59,130,246,0.45)",
  font: "system-ui, sans-serif"
}
```

## ♿ Accessibility

All components follow WCAG AA guidelines:

- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus indicators (visible rings)
- ✅ Color contrast ratios >4.5:1
- ✅ Screen reader friendly
- ✅ Error announcements with `role="alert"`

## 🏗️ Design Principles

The Lego Design System follows these core principles:

1. **Chunky & Tactile**: Bold borders and shadows create depth
2. **Playful Interactions**: Press animations and transitions
3. **High Contrast**: Strong visual hierarchy
4. **Consistent Spacing**: Based on 4.8mm stud units
5. **Accessibility First**: Built for everyone

## 📖 Design Standards

### Component Specifications
- **Standard size**: 8mm x 9.6mm modules
- **Stud dimensions**: 4.8mm diameter
- **Minimum wall thickness**: 1.2mm

### Typography Hierarchy
- **H1**: 24pt, Bold
- **H2**: 18pt, Regular
- **Body**: 14pt, Regular

### Spacing Scale
All spacing is based on multiples of the stud dimension (4.8mm).

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

## 📄 License

MIT © KDRDesigns

## 🔗 Links

- [GitHub Repository](https://github.com/KDRDesigns/Lego-)
- [Report Issues](https://github.com/KDRDesigns/Lego-/issues)
- [Design Standards](./BUILD%20SKILL.md)
- [Accessibility Checklist](./DESIGN_AUDIT_SKILL.md)

---

Made with ❤️ by KDRDesigns
