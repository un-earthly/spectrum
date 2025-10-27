import { Button } from '@spectrum/web';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Download, Heart, Settings, Plus } from 'lucide-react';

export function ButtonPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Button Component
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Versatile button component with multiple variants, sizes, and states.
        </p>
      </div>

      <ComponentShowcase
        title="Variants"
        description="Different visual styles for various use cases"
        code={`<Button variant="solid">Solid</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="gradient">Gradient</Button>`}
      >
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="gradient">Gradient</Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="Different sizes to fit your design needs"
        code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="Colors"
        description="Semantic color variants"
        code={`<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="success">Success</Button>
<Button color="error">Error</Button>
<Button color="warning">Warning</Button>`}
      >
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="error">Error</Button>
        <Button color="warning">Warning</Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="With Icons"
        description="Buttons with leading or trailing icons"
        code={`<Button>
  <Download size={16} />
  Download
</Button>
<Button variant="outline">
  <Heart size={16} />
  Like
</Button>
<Button variant="ghost">
  Settings
  <Settings size={16} />
</Button>`}
      >
        <Button>
          <Download size={16} />
          Download
        </Button>
        <Button variant="outline">
          <Heart size={16} />
          Like
        </Button>
        <Button variant="ghost">
          Settings
          <Settings size={16} />
        </Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="States"
        description="Different button states"
        code={`<Button disabled>Disabled</Button>
<Button loading>Loading</Button>`}
      >
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="Icon Only"
        description="Buttons with only icons"
        code={`<Button variant="solid" size="sm">
  <Plus size={16} />
</Button>
<Button variant="outline" size="md">
  <Settings size={20} />
</Button>
<Button variant="ghost" size="lg">
  <Heart size={24} />
</Button>`}
      >
        <Button variant="solid" size="sm">
          <Plus size={16} />
        </Button>
        <Button variant="outline" size="md">
          <Settings size={20} />
        </Button>
        <Button variant="ghost" size="lg">
          <Heart size={24} />
        </Button>
      </ComponentShowcase>

      <ComponentShowcase
        title="Full Width"
        description="Button that takes full width of its container"
        code={`<Button fullWidth>Full Width Button</Button>
<Button variant="outline" fullWidth>Full Width Outline</Button>`}
      >
        <div className="w-full space-y-3">
          <Button fullWidth>Full Width Button</Button>
          <Button variant="outline" fullWidth>Full Width Outline</Button>
        </div>
      </ComponentShowcase>
    </div>
  );
}