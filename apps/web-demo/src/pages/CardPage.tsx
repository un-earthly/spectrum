import { Card, Button, Badge } from '@spectrum/web';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Heart, Share, MoreHorizontal } from 'lucide-react';

export function CardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Card Component
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Flexible container component for grouping related content.
        </p>
      </div>

      <ComponentShowcase
        title="Variants"
        description="Different visual styles for various use cases"
        code={`<Card variant="elevated" className="p-4">
  <h3>Elevated Card</h3>
  <p>Card with shadow elevation</p>
</Card>

<Card variant="outlined" className="p-4">
  <h3>Outlined Card</h3>
  <p>Card with border outline</p>
</Card>

<Card variant="filled" className="p-4">
  <h3>Filled Card</h3>
  <p>Card with background fill</p>
</Card>

<Card variant="gradient" className="p-4">
  <h3>Gradient Card</h3>
  <p>Card with gradient background</p>
</Card>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card variant="elevated" className="p-4">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Elevated Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Card with shadow elevation</p>
          </Card>

          <Card variant="outlined" className="p-4">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Outlined Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Card with border outline</p>
          </Card>

          <Card variant="filled" className="p-4">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Filled Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Card with background fill</p>
          </Card>

          <Card variant="gradient" className="p-4">
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Gradient Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Card with gradient background</p>
          </Card>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="With Header and Footer"
        description="Cards with structured header and footer sections"
        code={`<Card variant="outlined">
  <Card.Header className="p-4 border-b">
    <div className="flex items-center justify-between">
      <h3>Card Title</h3>
      <Badge variant="subtle" color="primary">New</Badge>
    </div>
  </Card.Header>
  <div className="p-4">
    <p>Card content goes here...</p>
  </div>
  <Card.Footer className="p-4 border-t bg-neutral-50 dark:bg-neutral-800">
    <div className="flex justify-end gap-2">
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button size="sm">Save</Button>
    </div>
  </Card.Footer>
</Card>`}
      >
        <div className="w-full max-w-md">
          <Card variant="outlined">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-neutral-900 dark:text-white">Card Title</h3>
                <Badge variant="subtle" color="primary">New</Badge>
              </div>
            </div>
            <div className="p-4">
              <p className="text-neutral-600 dark:text-neutral-400">
                Card content goes here. This is a sample card with header and footer sections.
              </p>
            </div>
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </div>
            </div>
          </Card>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Interactive Cards"
        description="Cards that respond to user interaction"
        code={`<Card variant="outlined" pressable className="p-4">
  <h3>Pressable Card</h3>
  <p>Click me!</p>
</Card>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card 
            variant="outlined" 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => alert('Card clicked!')}
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Clickable Card</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Click me to see interaction!</p>
          </Card>

          <Card 
            variant="elevated" 
            className="p-4 cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => alert('Another card clicked!')}
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Hover Effect</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Hover to see elevation change</p>
          </Card>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Content Cards"
        description="Real-world examples of card usage"
        code={`<Card variant="elevated" className="overflow-hidden">
  <img src="..." alt="..." className="w-full h-48 object-cover" />
  <div className="p-4">
    <h3>Article Title</h3>
    <p>Article description...</p>
    <div className="flex items-center justify-between mt-4">
      <div className="flex gap-2">
        <Button variant="ghost" size="sm">
          <Heart size={16} />
        </Button>
        <Button variant="ghost" size="sm">
          <Share size={16} />
        </Button>
      </div>
      <Button variant="ghost" size="sm">
        <MoreHorizontal size={16} />
      </Button>
    </div>
  </div>
</Card>`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Card variant="elevated" className="overflow-hidden">
            <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
              <span className="text-white font-semibold">Image Placeholder</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                Getting Started with Spectrum UI
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Learn how to integrate our component library into your React applications.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Heart size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share size={16} />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </div>
          </Card>

          <Card variant="outlined" className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">
                  Project Update
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  2 hours ago
                </p>
              </div>
              <Badge variant="subtle" color="success">Completed</Badge>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              The new component library has been successfully deployed to production.
            </p>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </Card>
        </div>
      </ComponentShowcase>
    </div>
  );
}