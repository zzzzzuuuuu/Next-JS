<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project-specific agent preferences

When working in this repository, follow these communication and validation rules in addition to the system instructions:

1. In completion messages, start with `제가 해결했습니다!!!!!!!!` and then state what was fixed or changed.
2. Before implementation, convert the user's requested work into a checklist and share progress by checking items off as the work proceeds.
3. After each coding task, add or update the relevant test file and run the available tests for that area. If no test framework exists yet, state that limitation plainly and validate with the existing project checks instead of inventing a new test stack.
4. After each coding task, verify there are no ESLint or Prettier issues. Use the repository's existing lint command (`npm run lint`) and follow the formatting rules defined in `.prettierrc.js`.
