# Contributing to Spectrum

Thank you for your interest in contributing to Spectrum! This guide will help you get started.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages.

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Scopes

- **core**: Changes to @spectrum/core package
- **web**: Changes to @spectrum/web package
- **native**: Changes to @spectrum/native package
- **demo**: Changes to demo applications
- **storybook**: Changes to Storybook configuration
- **build**: Changes to build configuration
- **deps**: Dependency updates
- **theme**: Theme system changes
- **components**: Component implementations
- **utils**: Utility functions

### Examples

```bash
feat(core): add theme provider with dark mode support
fix(web): resolve button hover state in Safari
docs(storybook): add component usage examples
style(native): format code according to prettier rules
refactor(core): simplify variant resolution logic
test(components): add comprehensive button component tests
```

### Using Commitizen

We recommend using Commitizen for guided commit messages:

```bash
npm run commit
```

This will prompt you through the commit message format.

### Commit Message Rules

- Use the imperative mood in the subject line
- Do not end the subject line with a period
- Capitalize the subject line
- Limit the subject line to 50 characters
- Separate subject from body with a blank line
- Use the body to explain what and why vs. how

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature-name`
3. Make your changes
4. Write tests for your changes
5. Ensure all tests pass: `npm test`
6. Commit your changes using conventional commits
7. Push to your fork and submit a pull request

## Code Style

- We use ESLint and Prettier for code formatting
- Run `npm run lint` to check for issues
- Code is automatically formatted on commit

## Testing

- Write tests for new features and bug fixes
- Ensure all tests pass before submitting PR
- Aim for good test coverage

## Questions?

Feel free to open an issue for any questions or concerns.