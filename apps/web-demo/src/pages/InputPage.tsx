import { useState } from 'react';
import { Input } from '@spectrum/web';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Search, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export function InputPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
          Input Component
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          Flexible input component with multiple variants, validation states, and icon support.
        </p>
      </div>

      <ComponentShowcase
        title="Variants"
        description="Different visual styles for various use cases"
        code={`<Input variant="outlined" placeholder="Outlined input" />
<Input variant="filled" placeholder="Filled input" />
<Input variant="underlined" placeholder="Underlined input" />`}
      >
        <div className="w-full space-y-4 max-w-md">
          <Input variant="outlined" placeholder="Outlined input" />
          <Input variant="filled" placeholder="Filled input" />
          <Input variant="underlined" placeholder="Underlined input" />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Sizes"
        description="Different sizes to fit your design needs"
        code={`<Input size="sm" placeholder="Small input" />
<Input size="md" placeholder="Medium input" />
<Input size="lg" placeholder="Large input" />`}
      >
        <div className="w-full space-y-4 max-w-md">
          <Input size="sm" placeholder="Small input" />
          <Input size="md" placeholder="Medium input" />
          <Input size="lg" placeholder="Large input" />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="With Icons"
        description="Inputs with leading or trailing icons"
        code={`<Input
  leftIcon={<Search size={20} />}
  placeholder="Search..."
/>
<Input
  leftIcon={<Mail size={20} />}
  placeholder="Email address"
  type="email"
/>
<Input
  leftIcon={<Lock size={20} />}
  rightIcon={
    <button onClick={() => setShowPassword(!showPassword)}>
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  }
  type={showPassword ? "text" : "password"}
  placeholder="Password"
/>`}
      >
        <div className="w-full space-y-4 max-w-md">
          <Input
            leftIcon={<Search size={20} />}
            placeholder="Search..."
          />
          <Input
            leftIcon={<Mail size={20} />}
            placeholder="Email address"
            type="email"
          />
          <Input
            leftIcon={<Lock size={20} />}
            rightIcon={
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="With Labels and Helper Text"
        description="Inputs with labels, helper text, and descriptions"
        code={`<Input
  label="Email Address"
  placeholder="Enter your email"
  helperText="We'll never share your email with anyone else."
/>
<Input
  label="Password"
  type="password"
  placeholder="Enter your password"
  helperText="Must be at least 8 characters long."
  required
/>`}
      >
        <div className="w-full space-y-6 max-w-md">
          <Input
            label="Email Address"
            placeholder="Enter your email"
            helperText="We'll never share your email with anyone else."
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            helperText="Must be at least 8 characters long."
            required
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Validation States"
        description="Different validation states with error messages"
        code={`<Input
  label="Valid Input"
  value="valid@example.com"
  state="valid"
  helperText="Email format is correct."
/>
<Input
  label="Invalid Input"
  value="invalid-email"
  state="invalid"
  errorText="Please enter a valid email address."
/>
<Input
  label="Warning Input"
  value="test@example.com"
  state="warning"
  helperText="This email domain might not receive emails."
/>`}
      >
        <div className="w-full space-y-6 max-w-md">
          <Input
            label="Valid Input"
            value="valid@example.com"
            state="valid"
            helperText="Email format is correct."
            readOnly
          />
          <Input
            label="Invalid Input"
            value="invalid-email"
            state="invalid"
            errorText="Please enter a valid email address."
            readOnly
          />
          <Input
            label="Warning Input"
            value="test@example.com"
            state="warning"
            helperText="This email domain might not receive emails."
            readOnly
          />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="States"
        description="Different input states"
        code={`<Input placeholder="Disabled input" disabled />
<Input placeholder="Read-only input" readOnly value="Read-only value" />
<Input placeholder="Required input" required />`}
      >
        <div className="w-full space-y-4 max-w-md">
          <Input placeholder="Disabled input" disabled />
          <Input placeholder="Read-only input" readOnly value="Read-only value" />
          <Input placeholder="Required input" required />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        title="Form Example"
        description="Real-world form example with validation"
        code={`const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

<form className="space-y-4">
  <Input
    label="Email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    leftIcon={<Mail size={20} />}
    placeholder="Enter your email"
    required
  />
  <Input
    label="Password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    leftIcon={<Lock size={20} />}
    placeholder="Enter your password"
    required
  />
</form>`}
      >
        <div className="w-full max-w-md">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={20} />}
              placeholder="Enter your email"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={20} />}
              placeholder="Enter your password"
              required
            />
            <div className="pt-2">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </ComponentShowcase>
    </div>
  );
}