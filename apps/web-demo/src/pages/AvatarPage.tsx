import { Avatar, Badge } from '@spectrum/web';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { User, Camera } from 'lucide-react';

export function AvatarPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Avatar Component
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Display user profile pictures, initials, or fallback icons with various shapes and sizes.
        </p>
      </div>

      <ComponentShowcase
        title="Variants"
        description="Different shape variants"
        code={`<Avatar variant="circular" fallback="JD" />
<Avatar variant="rounded" fallback="AB" />
<Avatar variant="square" fallback="XY" />`}
      >
        <Avatar variant="circular" fallback="JD" />
        <Avatar variant="rounded" fallback="AB" />
        <Avatar variant="square" fallback="XY" />
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="Different sizes to fit your design needs"
        code={`<Avatar size="sm" fallback="S" />
<Avatar size="md" fallback="M" />
<Avatar size="lg" fallback="L" />
<Avatar size="xl" fallback="XL" />`}
      >
        <Avatar size="sm" fallback="S" />
        <Avatar size="md" fallback="M" />
        <Avatar size="lg" fallback="L" />
        <Avatar size="xl" fallback="XL" />
      </ComponentShowcase>

      <ComponentShowcase
        title="With Images"
        description="Avatars with profile images"
        code={`<Avatar
  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  alt="John Doe"
  fallback="JD"
/>
<Avatar
  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  alt="Jane Smith"
  fallback="JS"
/>
<Avatar
  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  alt="Mike Johnson"
  fallback="MJ"
/>`}
      >
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="John Doe"
          fallback="JD"
        />
        <Avatar
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          alt="Jane Smith"
          fallback="JS"
        />
        <Avatar
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          alt="Mike Johnson"
          fallback="MJ"
        />
      </ComponentShowcase>

      <ComponentShowcase
        title="Fallback Options"
        description="Different fallback options when image is not available"
        code={`<Avatar fallback="JD" />
<Avatar fallback={<User size={20} />} />
<Avatar /> {/* No fallback - shows default icon */}`}
      >
        <Avatar fallback="JD" />
        <Avatar fallback={<User size={20} />} />
        <Avatar />
      </ComponentShowcase>

      <ComponentShowcase
        title="With Status Indicators"
        description="Avatars with status badges"
        code={`<div className="relative">
  <Avatar
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    alt="Online User"
    fallback="OU"
  />
  <Badge
    variant="solid"
    color="success"
    size="sm"
    shape="pill"
    className="absolute -bottom-1 -right-1 border-2 border-white dark:border-neutral-800"
  >
    <div className="w-2 h-2 bg-white rounded-full" />
  </Badge>
</div>

<div className="relative">
  <Avatar
    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    alt="Away User"
    fallback="AU"
  />
  <Badge
    variant="solid"
    color="warning"
    size="sm"
    shape="pill"
    className="absolute -bottom-1 -right-1 border-2 border-white dark:border-neutral-800"
  >
    <div className="w-2 h-2 bg-white rounded-full" />
  </Badge>
</div>`}
      >
        <div className="relative">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Online User"
            fallback="OU"
          />
          <Badge
            variant="solid"
            color="success"
            size="sm"
            shape="pill"
            className="absolute -bottom-1 -right-1 border-2 border-white dark:border-neutral-800"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </Badge>
        </div>

        <div className="relative">
          <Avatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Away User"
            fallback="AU"
          />
          <Badge
            variant="solid"
            color="warning"
            size="sm"
            shape="pill"
            className="absolute -bottom-1 -right-1 border-2 border-white dark:border-neutral-800"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </Badge>
        </div>

        <div className="relative">
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Offline User"
            fallback="OF"
          />
          <Badge
            variant="solid"
            color="neutral"
            size="sm"
            shape="pill"
            className="absolute -bottom-1 -right-1 border-2 border-white dark:border-neutral-800"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </Badge>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Avatar Groups"
        description="Multiple avatars grouped together"
        code={`<div className="flex -space-x-2">
  <Avatar
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    alt="User 1"
    fallback="U1"
    className="border-2 border-white dark:border-neutral-800"
  />
  <Avatar
    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    alt="User 2"
    fallback="U2"
    className="border-2 border-white dark:border-neutral-800"
  />
  <Avatar
    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    alt="User 3"
    fallback="U3"
    className="border-2 border-white dark:border-neutral-800"
  />
  <Avatar
    fallback="+2"
    className="border-2 border-white dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
  />
</div>`}
      >
        <div className="flex -space-x-2">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="User 1"
            fallback="U1"
            className="border-2 border-white dark:border-neutral-800"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="User 2"
            fallback="U2"
            className="border-2 border-white dark:border-neutral-800"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="User 3"
            fallback="U3"
            className="border-2 border-white dark:border-neutral-800"
          />
          <Avatar
            fallback="+2"
            className="border-2 border-white dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Interactive Avatars"
        description="Avatars with hover effects and click handlers"
        code={`<Avatar
  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  alt="Clickable Avatar"
  fallback="CA"
  className="cursor-pointer hover:opacity-80 transition-opacity"
  onClick={() => alert('Avatar clicked!')}
/>

<div className="relative group cursor-pointer">
  <Avatar
    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    alt="Editable Avatar"
    fallback="EA"
    className="group-hover:opacity-80 transition-opacity"
  />
  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-full">
    <Camera size={20} className="text-white" />
  </div>
</div>`}
      >
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Clickable Avatar"
          fallback="CA"
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => alert('Avatar clicked!')}
        />

        <div className="relative group cursor-pointer">
          <Avatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Editable Avatar"
            fallback="EA"
            className="group-hover:opacity-80 transition-opacity"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 rounded-full">
            <Camera size={20} className="text-white" />
          </div>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Gradient Borders"
        description="Avatars with gradient border effects"
        code={`<div className="p-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
  <Avatar
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    alt="Gradient Border"
    fallback="GB"
    className="border-2 border-white dark:border-neutral-800"
  />
</div>

<div className="p-1 bg-gradient-to-r from-success-500 to-warning-500 rounded-full">
  <Avatar
    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    alt="Gradient Border 2"
    fallback="G2"
    className="border-2 border-white dark:border-neutral-800"
  />
</div>`}
      >
        <div className="p-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Gradient Border"
            fallback="GB"
            className="border-2 border-white dark:border-neutral-800"
          />
        </div>

        <div className="p-1 bg-gradient-to-r from-success-500 to-warning-500 rounded-full">
          <Avatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Gradient Border 2"
            fallback="G2"
            className="border-2 border-white dark:border-neutral-800"
          />
        </div>
      </ComponentShowcase>
    </div>
  );
}