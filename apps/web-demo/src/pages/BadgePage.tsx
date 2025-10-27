import { Badge, Button } from '@spectrum/web';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Star, Check, X, AlertTriangle } from 'lucide-react';

export function BadgePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Badge Component
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Small status descriptors for UI elements with multiple variants and colors.
        </p>
      </div>

      <ComponentShowcase
        title="Variants"
        description="Different visual styles for various use cases"
        code={`<Badge variant="solid">Solid</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="subtle">Subtle</Badge>
<Badge variant="gradient">Gradient</Badge>`}
      >
        <Badge variant="solid">Solid</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="subtle">Subtle</Badge>
        <Badge variant="gradient">Gradient</Badge>
      </ComponentShowcase>

      <ComponentShowcase
        title="Colors"
        description="Semantic color variants"
        code={`<Badge color="primary">Primary</Badge>
<Badge color="secondary">Secondary</Badge>
<Badge color="success">Success</Badge>
<Badge color="error">Error</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="neutral">Neutral</Badge>`}
      >
        <Badge color="primary">Primary</Badge>
        <Badge color="secondary">Secondary</Badge>
        <Badge color="success">Success</Badge>
        <Badge color="error">Error</Badge>
        <Badge color="warning">Warning</Badge>
        <Badge color="neutral">Neutral</Badge>
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="Different sizes to fit your design needs"
        code={`<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>`}
      >
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </ComponentShowcase>

      <ComponentShowcase
        title="Shapes"
        description="Different shape variants"
        code={`<Badge shape="rounded">Rounded</Badge>
<Badge shape="pill">Pill</Badge>
<Badge shape="square">Square</Badge>`}
      >
        <Badge shape="rounded">Rounded</Badge>
        <Badge shape="pill">Pill</Badge>
        <Badge shape="square">Square</Badge>
      </ComponentShowcase>

      <ComponentShowcase
        title="With Icons"
        description="Badges with icons for better visual communication"
        code={`<Badge color="success">
  <Check size={12} />
  Verified
</Badge>
<Badge color="warning">
  <AlertTriangle size={12} />
  Warning
</Badge>
<Badge color="error">
  <X size={12} />
  Error
</Badge>
<Badge color="primary">
  <Star size={12} />
  Featured
</Badge>`}
      >
        <Badge color="success">
          <Check size={12} />
          Verified
        </Badge>
        <Badge color="warning">
          <AlertTriangle size={12} />
          Warning
        </Badge>
        <Badge color="error">
          <X size={12} />
          Error
        </Badge>
        <Badge color="primary">
          <Star size={12} />
          Featured
        </Badge>
      </ComponentShowcase>

      <ComponentShowcase
        title="Icon Only"
        description="Badges with only icons"
        code={`<Badge variant="solid" color="success" size="sm">
  <Check size={12} />
</Badge>
<Badge variant="outline" color="warning" size="md">
  <AlertTriangle size={14} />
</Badge>
<Badge variant="subtle" color="primary" size="lg">
  <Star size={16} />
</Badge>`}
      >
        <Badge variant="solid" color="success" size="sm">
          <Check size={12} />
        </Badge>
        <Badge variant="outline" color="warning" size="md">
          <AlertTriangle size={14} />
        </Badge>
        <Badge variant="subtle" color="primary" size="lg">
          <Star size={16} />
        </Badge>
      </ComponentShowcase>

      <ComponentShowcase
        title="Notification Badges"
        description="Badges used for notifications and counts"
        code={`<div className="relative inline-block">
  <Button variant="outline">
    Messages
  </Button>
  <Badge
    variant="solid"
    color="error"
    size="sm"
    className="absolute -top-2 -right-2"
  >
    3
  </Badge>
</div>

<div className="relative inline-block">
  <Button variant="outline">
    Notifications
  </Button>
  <Badge
    variant="solid"
    color="primary"
    size="sm"
    shape="pill"
    className="absolute -top-2 -right-2"
  >
    12
  </Badge>
</div>`}
      >
        <div className="flex gap-6">
          <div className="relative inline-block">
            <Button variant="outline">
              Messages
            </Button>
            <Badge
              variant="solid"
              color="error"
              size="sm"
              className="absolute -top-2 -right-2"
            >
              3
            </Badge>
          </div>

          <div className="relative inline-block">
            <Button variant="outline">
              Notifications
            </Button>
            <Badge
              variant="solid"
              color="primary"
              size="sm"
              shape="pill"
              className="absolute -top-2 -right-2"
            >
              12
            </Badge>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Status Indicators"
        description="Badges used to indicate status or state"
        code={`<div className="space-y-3">
  <div className="flex items-center gap-3">
    <span>Online</span>
    <Badge variant="solid" color="success" size="sm">
      <div className="w-2 h-2 bg-white rounded-full" />
    </Badge>
  </div>
  <div className="flex items-center gap-3">
    <span>Away</span>
    <Badge variant="solid" color="warning" size="sm">
      <div className="w-2 h-2 bg-white rounded-full" />
    </Badge>
  </div>
  <div className="flex items-center gap-3">
    <span>Offline</span>
    <Badge variant="solid" color="neutral" size="sm">
      <div className="w-2 h-2 bg-white rounded-full" />
    </Badge>
  </div>
</div>`}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-neutral-700 dark:text-neutral-300">Online</span>
            <Badge variant="solid" color="success" size="sm" shape="pill">
              <div className="w-2 h-2 bg-white rounded-full" />
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-neutral-700 dark:text-neutral-300">Away</span>
            <Badge variant="solid" color="warning" size="sm" shape="pill">
              <div className="w-2 h-2 bg-white rounded-full" />
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-neutral-700 dark:text-neutral-300">Offline</span>
            <Badge variant="solid" color="neutral" size="sm" shape="pill">
              <div className="w-2 h-2 bg-white rounded-full" />
            </Badge>
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Interactive Badges"
        description="Badges that can be clicked or dismissed"
        code={`<Badge
  variant="outline"
  color="primary"
  className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900"
  onClick={() => alert('Badge clicked!')}
>
  Clickable
</Badge>

<Badge variant="subtle" color="neutral">
  Dismissible
  <button className="ml-1 hover:text-neutral-700 dark:hover:text-neutral-200">
    <X size={12} />
  </button>
</Badge>`}
      >
        <Badge
          variant="outline"
          color="primary"
          className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors"
          onClick={() => alert('Badge clicked!')}
        >
          Clickable
        </Badge>

        <Badge variant="subtle" color="neutral">
          Dismissible
          <button
            className="ml-1 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            onClick={() => alert('Badge dismissed!')}
          >
            <X size={12} />
          </button>
        </Badge>
      </ComponentShowcase>
    </div>
  );
}