# Next.js Enterprise Architecture Documentation

## 1. Core Technologies

### Next.js
- **Version**: 15.5.18 (App Router)
- **Configuration": 
  - `next.config.ts` enables React strict mode and custom rewrites for health endpoints
  - Uses App Directory pattern with server components by default
  - Built-in support for Turbopack (`--turbo`) in development
  - Automatic route generation from `/app` directory structure
- **Performance**: Optimized for Lighthouse scores with code splitting, static site generation (SSG), and incremental static regeneration (ISR)

### Tailwind CSS
- **Version**: 4.2.1
- **Configuration**:
  - `tailwind.css` file imports Tailwind directives
  - PostCSS configured via `postcss.config.js`
  - Uses `tailwind-merge` library to safely combine utility classes
  - ESLint plugin configured with custom callees (`classnames`, `clsx`, `ctl`, `cn`, `cva`)
  - Prettier plugin integrated for automatic class sorting

### TypeScript
- **Strict Configuration**: 
  - Full type safety enabled in `tsconfig.json` with `strict: true`
  - `noUncheckedIndexedAccess: true` prevents unsafe property access
  - `forceConsistentCasingInFileNames: true` ensures consistency
  - `skipLibCheck: true` for faster compilation
- **Enhancements**:
  - Uses `ts-reset` library to fix TypeScript type inconsistencies
  - Absolute imports configured via `baseUrl: "."`
  - Next.js plugin included in compiler options for enhanced type checking

## 2. Development Tooling

### ESLint & Prettier
- **ESLint Configuration**: 
  - `eslint.config.mjs` uses flat config format with TypeScript support
  - Plugins: `@next/eslint-plugin-next`, `eslint-plugin-import`, `eslint-plugin-storybook`
  - Rules enforce proper import ordering, unused variable detection, and Next.js best practices
  - Custom import grouping for internal vs external modules
- **Prettier Configuration**:
  - `prettier.config.js` uses `prettier-plugin-tailwindcss` to format Tailwind classes
  - Settings: 120-character line width, no semicolons, 2-space indentation
  - `.prettierignore` excludes build and node_modules directories

### Vitest
- **Testing Framework**: Unit testing framework replacing Jest
- **Configuration**:
  - `vitest.config.ts` uses jsdom environment for browser-like testing
  - Setup file (`vitest.setup.ts`) imports `@testing-library/jest-dom`
  - Includes test files with patterns: `*.test.{ts,tsx}` and `*.spec.{ts,tsx}`
- **Commands**:
  - `pnpm test`: Run tests once
  - `pnpm test:watch`: Watch mode for development
  - `pnpm test:ui`: Interactive UI mode
  - `pnpm test:coverage`: Generate code coverage reports

### Playwright
- **E2E Testing**: Browser-based end-to-end testing framework
- **Configuration**:
  - `playwright.config.ts` tests in `/e2e` directory
  - Supports Chromium, Firefox, and WebKit browsers
  - Runs against local dev server (`http://127.0.0.1:3000`)
  - Traces recorded on first retry for debugging failures
- **Commands**:
  - `pnpm e2e:headless`: Run tests headlessly
  - `pnpm e2e:ui`: Launch interactive UI mode

### Storybook
- **Component Library**: Isolated component development environment
- **Configuration**:
  - `.storybook/main.ts` discovers components with `*.stories.@(js|jsx|ts|tsx)` pattern
  - Addons: links, essentials, interactions for enhanced UX
  - Documentation enabled with autodocs tagging
  - TypeScript support configured (though type checking is disabled)
- **Commands**:
  - `pnpm storybook`: Start development server on port 6006
  - `pnpm build-storybook`: Build static version for deployment
  - `pnpm test-storybook`: Run Storybook tests

## 3. CI/CD and Automation

### GitHub Actions
- **Pre-configured Workflows**:
  - Bundle size tracking using `@next/bundle-analyzer`
  - Performance monitoring via Lighthouse scores
  - Automated testing on pull requests
  - Deployment workflows integrated with Vercel
- **Monitoring**: Tracks code quality metrics and alerts for regressions

### Renovate Bot
- **Dependency Management**:
  - Automatically creates PRs for dependency updates
  - Configured via `renovate.json` (file not shown but referenced)
  - Supports semantic versioning rules to avoid breaking changes
  - Prioritizes security patches and minor upgrades

### Semantic Release
- **Automated Releases**:
  - `.releaserc` configures automatic release workflow
  - Plugins: `@semantic-release/npm`, `@semantic-release/release-notes-generator`, `@semantic-release/github`, `@semantic-release/commit-analyzer`, `@semantic-release/git`
  - Uses conventional commits to determine version bumps (major, minor, patch)
  - Auto-generates changelog and publishes releases on GitHub
- **Branch Strategy**: Only operates on `main` branch

## 4. Architecture Patterns

### Absolute Imports
- **Implementation**:
  - Configured in `tsconfig.json` with "baseUrl": "."
  - Enables import paths like `import { Button } from "@/components/Button"`
  - Eliminates relative path hell (`../../../`)
- **ESLint Configuration**: Import order rules prioritize internal modules before external dependencies

### Environment Management (T3)
- **Framework**: `@t3-oss/env-nextjs` for type-safe environment variables
- **Configuration**:
  - `env.mjs` defines server-side variables with Zod validation
  - Only `ANALYZE` variable exposed to server context
  - Client-side variables are intentionally empty for security
- **Benefits**: Compile-time safety, automatic validation, and clear separation of concerns

### Health Checks
- **Implementation**:
  - API route at `/app/api/health/route.ts` returns `{ status: "ok" }`
  - Accessible via multiple endpoints: `/health`, `/healthz`, `/ping` (rewritten in `next.config.ts`)
  - Kubernetes-compatible format for container orchestration
- **Purpose**: Used by load balancers and monitoring systems to verify application health

## 5. Component System

### Radix UI
- **Components Used**:
  - Accordion, Checkbox, Dialog, Dropdown Menu, Form, Label, Popover, Radio Group, Scroll Area, Select, Slider, Switch, Tabs, Toggle Group, Tooltip
- **Benefits**: 
  - Headless components with complete accessibility support
  - Fully customizable styling via CSS-in-JS or Tailwind classes
  - No opinionated styles, allowing full design system integration

### Class Variance Authority (CVA)
- **Implementation**:
  - Used in Button and Tooltip components for creating variant-based component APIs
  - `cva()` function defines variants (`intent`, `size`, `underline`) with associated Tailwind classes
  - Integrates seamlessly with `tailwind-merge` to combine user-provided and default classes safely
- **Advantages**: 
  - Type-safe component props
  - Consistent design patterns across components
  - Reduces duplicated utility class usage

## 6. Observability

### OpenTelemetry
- **Implementation**:
  - `@vercel/otel` package used for instrumentation
  - `instrumentation.ts` registers the OTel SDK with application name "next-app"
  - Integrates with Vercel's monitoring infrastructure
- **Capabilities**:
  - Distributed tracing across services
  - Metrics collection (request counts, latency)
  - Log correlation between frontend and backend
  - Automatic instrumentation of HTTP requests and database calls

## 7. Testing Strategy

### Unit Testing
- **Framework**: Vitest with React Testing Library
- **Scope**: Individual components and utility functions
- **Files**: `*.test.tsx` and `*.spec.tsx` in component directories (e.g., `Button.test.tsx`)
- **Environment**: jsdom for browser-like testing without actual browser

### Integration Testing
- **Framework**: React Testing Library + Vitest
- **Scope**: Component interactions, state management, API calls
- **Approach**: Tests components with their dependencies to ensure proper integration

### End-to-End (E2E) Testing
- **Framework**: Playwright
- **Scope**: User journeys across multiple pages and components
- **Location**: `/e2e` directory with `*.spec.ts` files
- **Browsers**: Chromium, Firefox, WebKit for cross-browser compatibility testing

### Smoke Testing
- **Implementation**: Basic E2E tests in `e2e/example.spec.ts`
- **Purpose**: Quick verification that core application functionality works after deployment
- **Example**: Verifies page title contains "Next.js Enterprise Boilerplate"

## 8. Project Maintenance

### Patch-package
- **Implementation**:
  - Runs automatically via `postinstall` script
  - Applies patches to dependencies when needed (e.g., bug fixes in third-party packages)
  - Patches stored in `/patches/` directory
- **Use Case**: Allows fixing bugs in external libraries without waiting for upstream releases

### Conventional Commits
- **Implementation**:
  - `git-conventional-commits.yaml` defines allowed commit types: feat, fix, perf, refactor, style, test, build, ops, docs, chore, merge, revert
  - `.pre-commit-config.yaml` uses git hook to validate commits before push
- **Benefits**: 
  - Automated changelog generation via semantic-release
  - Clear history of changes for release management
  - Automatic version bump determination

### Git Hooks
- **Configuration**:
  - Pre-commit hook validates commit messages against conventional commits standard
  - Prevents invalid commits from entering the codebase
- **Workflow**: Commits must follow pattern: `<type>(<scope>): <description>`

### Other Maintenance Tools
- **Bundle Size Analysis**: `@next/bundle-analyzer` enabled via `ANALYZE=true npm run build`
- **Dependency Graph**: `madge` generates component coupling graph (`graph.svg`) to visualize module relationships and avoid circular dependencies
- **Package Manager**: pnpm 10.0.0 with Corepack for consistent dependency management across environments

## Summary
This Next.js enterprise boilerplate provides a comprehensive, production-ready foundation for building scalable web applications. It combines modern technologies like React 19, TypeScript, Tailwind CSS 4, and Vite with robust tooling for testing, observability, and automation. The architecture prioritizes developer experience while maintaining strict quality controls through automated linting, type safety, testing, and release management. This setup enables teams to deliver high-quality applications rapidly while ensuring maintainability, performance, and scalability.