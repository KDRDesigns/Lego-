# Examples

This directory contains usage examples for the Lego Design System components.

## Basic Form Example

```tsx
import { Card, Stack, Input, Textarea, Button } from '@kdrdesigns/lego';
import { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic here
  };

  return (
    <Card title="Contact Us" subtitle="We'd love to hear from you">
      <form onSubmit={handleSubmit}>
        <Stack gap={16}>
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            required
          />
          
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            description="We'll never share your email"
            error={errors.email}
            required
          />
          
          <Textarea
            label="Message"
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            error={errors.message}
            required
          />
          
          <Button type="submit" tone="brand" size="lg">
            Send Message
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
```

## Dashboard Example

```tsx
import { Box, Stack, Inline, Card, Badge, Text, Button } from '@kdrdesigns/lego';

function Dashboard() {
  return (
    <Box padding={24}>
      <Stack gap={24}>
        <Text as="h1" size={32} weight={900}>
          Dashboard
        </Text>
        
        <Inline gap={16} wrap={true}>
          <Card tone="brand" style={{ flex: 1, minWidth: 250 }}>
            <Stack gap={8}>
              <Text size={18} weight={800}>Total Users</Text>
              <Text size={36} weight={900}>1,234</Text>
              <Badge tone="success">+12% this week</Badge>
            </Stack>
          </Card>
          
          <Card tone="success" style={{ flex: 1, minWidth: 250 }}>
            <Stack gap={8}>
              <Text size={18} weight={800}>Revenue</Text>
              <Text size={36} weight={900}>$45.2K</Text>
              <Badge tone="brand">+8% this month</Badge>
            </Stack>
          </Card>
          
          <Card tone="warning" style={{ flex: 1, minWidth: 250 }}>
            <Stack gap={8}>
              <Text size={18} weight={800}>Pending</Text>
              <Text size={36} weight={900}>23</Text>
              <Badge tone="neutral">Needs attention</Badge>
            </Stack>
          </Card>
        </Inline>
        
        <Card title="Recent Activity">
          <Stack gap={12}>
            <Inline gap={12}>
              <Badge tone="brand">New</Badge>
              <Text>User John Doe signed up</Text>
            </Inline>
            <Inline gap={12}>
              <Badge tone="success">Sale</Badge>
              <Text>Order #1234 completed</Text>
            </Inline>
            <Inline gap={12}>
              <Badge tone="warning">Alert</Badge>
              <Text>Server usage at 85%</Text>
            </Inline>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
```

## Modal Example

```tsx
import { Button, Modal, Stack, Text, Inline } from '@kdrdesigns/lego';
import { useState } from 'react';

function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    // Delete logic here
    setIsOpen(false);
  };

  return (
    <>
      <Button tone="danger" onClick={() => setIsOpen(true)}>
        Delete Item
      </Button>
      
      <Modal
        open={isOpen}
        title="Confirm Deletion"
        onClose={() => setIsOpen(false)}
        tone="danger"
      >
        <Stack gap={20}>
          <Text>
            Are you sure you want to delete this item? This action cannot be undone.
          </Text>
          
          <Inline gap={12}>
            <Button tone="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button tone="neutral" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </Inline>
        </Stack>
      </Modal>
    </>
  );
}
```

## Toggle Example

```tsx
import { Card, Stack, Toggle } from '@kdrdesigns/lego';
import { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true
  });

  return (
    <Card title="Settings" subtitle="Manage your preferences">
      <Stack gap={16}>
        <Toggle
          label="Enable notifications"
          checked={settings.notifications}
          onChange={(checked) => setSettings({ ...settings, notifications: checked })}
          toneOn="success"
        />
        
        <Toggle
          label="Dark mode"
          checked={settings.darkMode}
          onChange={(checked) => setSettings({ ...settings, darkMode: checked })}
          toneOn="brand"
        />
        
        <Toggle
          label="Auto-save"
          checked={settings.autoSave}
          onChange={(checked) => setSettings({ ...settings, autoSave: checked })}
          toneOn="success"
        />
      </Stack>
    </Card>
  );
}
```

## Icon Button Example

```tsx
import { Inline, IconButton, Text } from '@kdrdesigns/lego';

function Toolbar() {
  return (
    <Inline gap={8}>
      <IconButton label="Edit" tone="brand" onClick={() => console.log('Edit')}>
        ✏️
      </IconButton>
      
      <IconButton label="Share" tone="neutral" onClick={() => console.log('Share')}>
        🔗
      </IconButton>
      
      <IconButton label="Delete" tone="danger" onClick={() => console.log('Delete')}>
        🗑️
      </IconButton>
      
      <IconButton label="Download" tone="success" onClick={() => console.log('Download')}>
        ⬇️
      </IconButton>
    </Inline>
  );
}
```

## Complete App Example

```tsx
import { 
  Box, 
  Stack, 
  Inline, 
  Card, 
  Button, 
  Input, 
  Badge,
  Text,
  Toggle,
  Modal
} from '@kdrdesigns/lego';
import { useState } from 'react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Box 
      padding={32}
      style={{ 
        minHeight: '100vh',
        background: darkMode ? '#1a1a1a' : '#f9fafb'
      }}
    >
      <Stack gap={32}>
        {/* Header */}
        <Inline style={{ justifyContent: 'space-between' }}>
          <Text as="h1" size={28} weight={900}>
            🧱 Lego Design System
          </Text>
          <Toggle
            label="Dark Mode"
            checked={darkMode}
            onChange={setDarkMode}
            toneOn="brand"
          />
        </Inline>

        {/* Stats Cards */}
        <Inline gap={16} wrap={true}>
          <Card tone="brand" style={{ flex: 1 }}>
            <Stack gap={8}>
              <Badge tone="brand">Active</Badge>
              <Text size={24} weight={900}>2,453</Text>
              <Text size={14}>Total Components</Text>
            </Stack>
          </Card>

          <Card tone="success" style={{ flex: 1 }}>
            <Stack gap={8}>
              <Badge tone="success">Live</Badge>
              <Text size={24} weight={900}>98.9%</Text>
              <Text size={14}>Uptime</Text>
            </Stack>
          </Card>
        </Inline>

        {/* Main Content */}
        <Card 
          title="Get Started" 
          subtitle="Build amazing interfaces with Lego blocks"
        >
          <Stack gap={16}>
            <Input
              label="Project Name"
              placeholder="My Awesome Project"
              description="Choose a memorable name"
            />

            <Inline gap={12}>
              <Button tone="brand" onClick={() => setModalOpen(true)}>
                Create Project
              </Button>
              <Button tone="neutral">
                Learn More
              </Button>
            </Inline>
          </Stack>
        </Card>
      </Stack>

      {/* Modal */}
      <Modal
        open={modalOpen}
        title="Success!"
        onClose={() => setModalOpen(false)}
        tone="success"
      >
        <Stack gap={16}>
          <Text>Your project has been created successfully! 🎉</Text>
          <Button tone="brand" onClick={() => setModalOpen(false)}>
            Got it
          </Button>
        </Stack>
      </Modal>
    </Box>
  );
}

export default App;
```
